import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../GlobalStyles";
import bunny from "../images/bunny1(3).png";

const CanvasA = ({
  color,
  color2,
  fullMoon,
  isInteractive,
  moonPos = { x: 150, y: 100 }
  , height = 1044
}) => {
  /// Myp subtitles part2
  const [canvasSize, setCanvasSize] = useState(true);
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
    console.log("from CanvasA, height", height, 
                  typeof(height), 
                  "window.innerHeight ",window.innerHeight,
                "canvasRef.current.height ", canvasRef.current.height);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const shapes = [];
    const numShapes = canvas.width / 15 || 1;
    const starRadius = 9; //stars
    const circleRadius = 4; //cicles
    const repulsionRadius = 77; //limit to draw the line
    const lineColor = "lightgrey";
    const starColor = theme.palette.yellow;

    const drawMoon = (x, y, outerRadius, innerRadius, moonColor) => {
      ctx.beginPath();
      ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = moonColor;
      ctx.fill();
      // Draw a completely black circle over the main moon shape
      if (!fullMoon) {
        ctx.beginPath();
        ctx.arc(
          x - (outerRadius - innerRadius) - 5,
          y - 7,
          outerRadius,
          0,
          Math.PI * 2
        );
        // ctx.fillStyle = bColor ? bColor : "black";//shadow over moon
        ctx.fillStyle = color; //shadow over moon
        ctx.fill();
      }
    };

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

    const animate = () => {
      //paint this every mili seconds
      //draw background
      if (color === color2) {
        ctx.fillStyle = color;
      } else {
        // Create gradient
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, color); // Start color
        gradient.addColorStop(1, color2); // End color
        // Draw gradient
        ctx.fillStyle = gradient;
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // draw the stars and circles
      shapes.forEach((shape) => {
        if (shape.isStar) {
          drawStar(shape.x, shape.y, starRadius, starColor, shape.glowFactor);
          shape.glowFactor = 2.2 * Math.sin(Date.now() / 1000);
        } else {
          if (shape.isMoon) {
            // Drawing the moon
            drawMoon(canvas.width - moonPos.x, moonPos.y, 40, 35, "white"); //
          } else {
            drawCircle(shape.x, shape.y, circleRadius, "white");
          }
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
    }; //end of animate
    // const animationFrame = requestAnimationFrame(animate);

    //just one moon
    shapes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      isMoon: true,
    });

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

    // return () => cancelAnimationFrame(animationFrame);
    return () => {};
  }, [canvasSize, canvasRef ]); // Empty dependency array ensures useEffect runs once

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

  const drawShootingStar = (pointA, pointB) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ///trail of star
    ctx.beginPath();
    ctx.moveTo(initialPointA.x + 1, initialPointA.y + 1);
    ctx.lineTo(pointA.x + 4, pointA.y + 4);
    // ctx.strokeStyle = "yellow";
    ctx.strokeStyle = theme.palette.yellow;
    ctx.lineWidth = 1;
    ctx.stroke();
    ///trail of star
    ctx.beginPath();
    ctx.moveTo(initialPointA.x - 1, initialPointA.y - 1);
    ctx.lineTo(pointA.x - 4, pointA.y - 4);
    // ctx.strokeStyle = "yellow";
    ctx.strokeStyle = theme.palette.yellow;
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
    // ctx.fillStyle = "yellow";
    ctx.fillStyle = theme.palette.yellow;
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
  ///from onClick
  const handleCanvasClick = () => {
    const newPointA = generateRandomPosition();
    const newPointB = { ...newPointA };
    setInitialPointA(newPointA);
    if (isInteractive) {
      animateCircles(newPointA, newPointB);
    } else {
      console.log("point A ", newPointA, "point B ", newPointB);
    }
  };

  // Dynamically update canvas width on window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        setCanvasSize((canvasSize) => !canvasSize);
        // setHeightPlus(height + 600);
        // canvasRef.current.height = (window.innerHeight > heightPlus) 
        // ? window.innerHeight 
        // : heightPlus
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Mydiv 
    // height={window.innerHeight > 1034 ? window.innerHeight : height}
    myheight={height}
    style={{ position: "relative" }}>
      <Mycanvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        width={window.innerWidth}
        height={window.innerHeight > 1034 ? window.innerHeight : height}
      ></Mycanvas>
      <Myimg src={bunny} alt="C logo" height="152px" />

    </Mydiv>
  );
};

const Mydiv = styled.div`
  position: relative;
  // height: 1034px;
  height: ${props => props.myheight}px;
  background-color: black;
  // border: 1px red solid;
  margin-bottom: 0px;
`;

const Mycanvas = styled.canvas`
  background: transparent;
  height: calc(100%);
  width: calc(100% - 0px);
`;

const Myimg = styled.img`
  position: absolute;
  // border: 2px red solid;
  bottom: 0px;
  right: 0px;
`;

export default CanvasA;
