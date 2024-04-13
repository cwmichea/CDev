import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {theme} from '../GlobalStyles';
import bunny from '../images/bunny1(3).png';

const CanvasB = () => {
/// Myp subtitles part2
  const [canvasSize, setCanvasSize] = useState(true);

/// MyCanvas 
  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const shapes = [];
    const numShapes = 35;
    const shapeRadius = 9; //stars
    const circleRadius = 4; //cicles
    const repulsionRadius = 77;//limit to draw the line
    const lineColor = "lightgrey";
    const starColor = theme.palette.yellow;
    const bgColor = "hsl(261, 100%, 8%)";

    const drawMoon = (x, y, outerRadius,  moonColor) => {
      ctx.beginPath();
      ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = moonColor;
      ctx.fill();
      // Draw a full yt circle 4 the moon shape
      ctx.beginPath();
      ctx.fillStyle = "white";

      ctx.fill();
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
          if (shape.isMoon) {
            // Drawing the moon
             drawMoon(canvas.width - 150, 100, 40, "white"); // 
          }else{
          drawCircle(shape.x, shape.y, circleRadius, "white");}
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

     return () => {};
  }, [canvasSize]); // Empty dependency array ensures useEffect runs once


  // Dynamically update canvas width on window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        setCanvasSize(canvasSize => !canvasSize);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (<Mydiv style={{ position: "relative" }}>
    <Mycanvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></Mycanvas>      
    <Myimg src={bunny} alt='C logo' height='152px'/>

  {/* <Myp>{myStrings.description[currentIndex]}</Myp> */}
  </Mydiv>
  );
};

const Mydiv = styled.div`
  position: relative;
  height: calc(100vh - 69px);
  background-color: black;
  // border: 1px red solid;
  margin-bottom: 0px;
`;

const Mycanvas = styled.canvas`
  background: transparent;
  height: calc(100% );
  width: calc(100% - 0px);
`;

const Myimg = styled.img`
  position: absolute;
  // border: 2px red solid;
  bottom: 0px;
  right: 0px;
`


export default CanvasB;
