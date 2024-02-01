import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import myStrings from '../myIntroduction.json';//part2
import {theme} from '../GlobalStyles';

const CanvasA = () => {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState({
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 },
  });
  const [initialPointA, setInitialPointA] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);//part2

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        // If the newIndex is equal to the length of the array, reset it to 0
        const resetIndex = newIndex === myStrings.description.length ? 0 : newIndex;

        return resetIndex;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const shapes = [];
    const numShapes = 35;
    const shapeRadius = 9;
    const circleRadius = 4;
    const numLines = 2;
    const repulsionRadius = 77;
    const lineColor = "white";
    const lightLineColor = "lightgrey";
    const starColor = "yellow";
    const bgColor = "black";

    const drawCircle = (x, y, radius, color) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    };

    const drawLine = (x1, y1, x2, y2, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();
    };

    const drawStar = (x, y, radius, color, rotationAngle, glowFactor) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotationAngle);
      const scaledRadius = radius + glowFactor * Math.sin(Date.now() / 1000);
      ctx.scale(scaledRadius, scaledRadius);

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const x_i = Math.cos(angle);
        const y_i = Math.sin(angle);
        ctx.lineTo(x_i, y_i);
        const innerAngle = angle + Math.PI / 5;
        const x_inner = 0.5 * Math.cos(innerAngle);
        const y_inner = 0.5 * Math.sin(innerAngle);
        ctx.lineTo(x_inner, y_inner);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore();
    };

    const distance = (x1, y1, x2, y2) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const animate = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        if (shape.isStar) {
          drawStar(
            shape.x,
            shape.y,
            shapeRadius,
            starColor,
            shape.rotationAngle,
            shape.glowFactor
          );
          shape.glowFactor = 2.2 * Math.sin(Date.now() / 1000);
        } else {
          drawCircle(shape.x, shape.y, circleRadius, "white");
        }
      });

      for (let i = 0; i < numLines; i++) {
        const startShape = shapes[Math.floor(Math.random() * shapes.length)];
        const endShape = shapes[Math.floor(Math.random() * shapes.length)];

        const dist = distance(
          startShape.x,
          startShape.y,
          endShape.x,
          endShape.y
        );

        if (dist < repulsionRadius) {
          drawLine(
            startShape.x,
            startShape.y,
            endShape.x,
            endShape.y,
            lightLineColor
          );
        }
      }

      for (let i = 0; i < shapes.length - 4; i++) {
        for (let j = i + 1; j < shapes.length - 4; j++) {
          const dist = distance(
            shapes[i].x,
            shapes[i].y,
            shapes[j].x,
            shapes[j].y
          );

          if (dist < repulsionRadius) {
            drawLine(
              shapes[i].x,
              shapes[i].y,
              shapes[j].x,
              shapes[j].y,
              lineColor
            );
          }
        }
      }

      requestAnimationFrame(animate);
    };
    //number of circles based on numShapes proportion 3/4
    for (let i = 0; i < (3 * numShapes) / 4; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        isStar: false,
      });
    }
    //number of circles based on numShapes proportion 1/4
    for (let i = 0; i < numShapes / 4; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        isStar: true,
      });
    }

    animate();

    return () => {};
  }, []); // Empty dependency array ensures useEffect runs once

  const handleCanvasClick = () => {
    const newPointA = generateRandomPosition();
    const newPointB = { ...newPointA };
    setInitialPointA(newPointA);
    animateCircles(newPointA, newPointB);
  };

  const animateCircles = (newPointA, newPointB) => {
    const startTime = Date.now();
    const duration = 400;

    const animate = () => {
      const currentTime = Date.now();
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const currentPointA = {
          x:
            coordinates.pointA.x +
            (newPointA.x - coordinates.pointA.x) * progress,
          y:
            coordinates.pointA.y +
            (newPointA.y - coordinates.pointA.y) * progress,
        };

        const currentPointB = {
          x:
            coordinates.pointB.x +
            (newPointB.x - coordinates.pointB.x) * progress,
          y:
            coordinates.pointB.y +
            (newPointB.y - coordinates.pointB.y) * progress,
        };

        drawShootingStar(currentPointA, currentPointB, newPointA, newPointB);

        setCoordinates({
          pointA: currentPointA,
          pointB: currentPointB,
        });

        animationRef.current = requestAnimationFrame(animate);
      } else {
        drawShootingStar(newPointA, newPointB, newPointA, newPointB);
        setCoordinates({
          pointA: newPointA,
          pointB: newPointB,
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const generateRandomPosition = () => {
    const canvas = canvasRef.current;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    if (x <= canvas.width / 4) {
      x += canvas.width / 4;
    }
    if (y >= canvas.height / 5) {
      y -= canvas.height / 5;
    }
    return { x, y };
  };

  const drawShootingStar = (pointA, pointB, newPointA, newPointB) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(initialPointA.x, initialPointA.y);
    ctx.lineTo(pointA.x, pointA.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(initialPointA.x + 1, initialPointA.y + 1);
    ctx.lineTo(pointA.x + 4, pointA.y + 4);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(initialPointA.x - 1, initialPointA.y - 1);
    ctx.lineTo(pointA.x - 4, pointA.y - 4);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 1;
    ctx.stroke();
    //circle
    // ctx.beginPath();
    // ctx.arc(pointA.x, pointA.y, 8, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();

    // ctx.beginPath();
    // ctx.arc(pointB.x, pointB.y, 7, 0, 2 * Math.PI);
    // ctx.fillStyle = "yellow";
    // ctx.fill();
    //star
    ctx.save();
    ctx.translate(pointB.x, pointB.y);
    const scaledRadius = 12 + 2 * Math.sin(Date.now() / 1000);
    ctx.scale(scaledRadius, scaledRadius);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const x_i = Math.cos(angle);
      const y_i = Math.sin(angle);
      ctx.lineTo(x_i, y_i);
      const innerAngle = angle + Math.PI / 5;
      const x_inner = 0.5 * Math.cos(innerAngle);
      const y_inner = 0.5 * Math.sin(innerAngle);
      ctx.lineTo(x_inner, y_inner);
    }
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();
    //endstart

    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pointB.x, pointB.y);
    ctx.lineTo(newPointA.x, newPointA.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  return (<Mydiv style={{ position: "relative" }}>
    <Mycanvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ background: "transparent" }}
      width={window.innerWidth}
      height={window.innerHeight}
    ></Mycanvas>      
    {/* part2 */}
    <Myh1 >
    Hey there, I'm Chris
  </Myh1>
  <Myp>{myStrings.description[currentIndex]}</Myp>
  </Mydiv>
  );
};


const Mydiv = styled.div`
  position: relative;
`;

const Mycanvas = styled.canvas`
  background: transparent;
`;

const Myh1 = styled.h1`
  position: absolute;
  color: white;
  top: 15%;
  left: 5%;
  margin: 0;
  z-index: 1;
  pointer-events: none; // Make the h1 element transparent for user interactions
  font-family: ${theme.fonts.primary};
  `;

const Myp = styled.p`
  position: absolute;
  color: white;
  top: 22%;
  left: 5%;
  margin: 0;
  z-index: 1;
  pointer-events: none; // Make the h1 element transparent for user interactions
  color: white;
  font-family: ${theme.fonts.primary};
`;
export default CanvasA;
