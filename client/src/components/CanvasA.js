import React, { useState, useRef, useEffect } from "react";
import myStrings from '../myIntroduction.json';// Myp subtitles convert it into db, part2
import styled from "styled-components";
import {theme} from '../GlobalStyles';

const CanvasA = () => {
/// Myp subtitles part2
  const [currentIndex, setCurrentIndex] = useState(0);
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
/// MyCanvas 
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState({
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 },
  });
  // Animation
  const [initialPointA, setInitialPointA] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const shapes = [];
    const numShapes = 35;
    const shapeRadius = 9; //stars
    const circleRadius = 4; //cicles
    const repulsionRadius = 77;//limit to draw the line
    const lineColor = "lightgrey";
    // const lightLineColor = "lightgrey";
    // const numLines = 2;
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

    const drawStar = (x, y, radius, color, glowFactor) => {
      ctx.save();
      ctx.translate(x, y);
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

    const animate = () => {//paint this every mili seconds
    //draw background  
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw the stars and circles
      shapes.forEach((shape) => {
        if (shape.isStar) {
          drawStar(
            shape.x,
            shape.y,
            shapeRadius,
            starColor,
            shape.glowFactor
          );
          shape.glowFactor = 2.2 * Math.sin(Date.now() / 1000);
        } else {
          drawCircle(shape.x, shape.y, circleRadius, "white");
        }
      });

      //static lines for constellations
      for (let i = 0; i < shapes.length - 3; i++) {
        for (let j = i + 1; j < shapes.length - 3; j++) {
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
    };//end of animate

    //number of circles based on numShapes proportion 3/4
    for (let i = 0; i < (3 * numShapes) / 4; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        isStar: false,
      });
    }
    //number of stars based on numShapes proportion 1/4
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
/// for shooting star animation when user clicks
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
  /// 
  
  const drawShootingStar = (pointA, pointB) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  ///trail of star
    ctx.beginPath();
    ctx.moveTo(initialPointA.x + 1, initialPointA.y + 1);
    ctx.lineTo(pointA.x + 4, pointA.y + 4);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 1;
    ctx.stroke();
  ///trail of star
    ctx.beginPath();
    ctx.moveTo(initialPointA.x - 1, initialPointA.y - 1);
    ctx.lineTo(pointA.x - 4, pointA.y - 4);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 1;
    ctx.stroke();
  ///star
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
    ctx.restore();
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

        drawShootingStar(currentPointA, currentPointB);

        setCoordinates({
          pointA: currentPointA,
          pointB: currentPointB,
        });

        animationRef.current = requestAnimationFrame(animate);
      } else {
        drawShootingStar(newPointA, newPointB);
        setCoordinates({
          pointA: newPointA,
          pointB: newPointB,
        });
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };
  ///
  const handleCanvasClick = () => {
    const newPointA = generateRandomPosition();
    const newPointB = { ...newPointA };
    setInitialPointA(newPointA);
    animateCircles(newPointA, newPointB);
  };


  return (<Mydiv style={{ position: "relative" }}>
    <Mycanvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      // style={{ background: "transparent" }}
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
  left: 7%;
  margin: 0;
  z-index: 1;
  pointer-events: none; // Make the h1 element transparent for user interactions
  font-family: ${theme.fonts.primary};
  font-family: ${theme.fonts.alternative};
  font-size: 35px;
  `;

const Myp = styled.p`
  position: absolute;
  color: white;
  top: 22%;
  left: 7%;
  margin: 0;
  z-index: 1;
  pointer-events: none; // Make the h1 element transparent for user interactions
  color: white;
  font-family: ${theme.fonts.primary};
  font-size: large;
`;
export default CanvasA;
