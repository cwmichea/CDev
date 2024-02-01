import React, { useRef, useEffect } from "react";

const CanvasC = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const shapes = []; // array of objects: circles and stars
    const numShapes = 35; // total circles + stars
    const shapeRadius = 9; //star radius
    const circleRadius = 4; //circle radius

    const numLines = 1; // a very milisecond line formed between points
    const repulsionRadius = 50; //min distance to draw/trace a line

    const lineColor = "white"; // lines
    const lightLineColor = "lightgrey"; // circle
    const starColor = "yellow"; // star
    const bgColor = "black"; //bg

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
      ctx.save(); // Save the current transformation state

      // Apply rotation and scaling transformations
      ctx.translate(x, y);
      ctx.rotate(rotationAngle); // Apply rotation
      const scaledRadius = radius + glowFactor * Math.sin(Date.now() / 1000); // Apply glow effect
      ctx.scale(scaledRadius, scaledRadius);

      // Draw the star
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const x_i = Math.cos(angle);
        const y_i = Math.sin(angle);
        ctx.lineTo(x_i, y_i);
        const innerAngle = angle + Math.PI / 5;
        const x_inner = 0.5 * Math.cos(innerAngle); // Inner points are adjusted for better visual effect
        const y_inner = 0.5 * Math.sin(innerAngle);
        ctx.lineTo(x_inner, y_inner);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      ctx.restore(); // Restore the transformation state
    };

    const updateMousePosition = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const distance = (x1, y1, x2, y2) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw moving shapes
      shapes.forEach((shape) => {
        // shape.x += (Math.random() - 0.5) * 2;
        // shape.y += (Math.random() - 0.5) * 2;

        if (shape.isStar) { // animate stars!!!!!
          
          drawStar(
            shape.x,
            shape.y,
            shapeRadius,
            starColor,
            shape.rotationAngle,
            shape.glowFactor
          );
        // Add glow to stars
          shape.glowFactor = 2.2 * Math.sin(Date.now() / 1000); // Adjust the factor for glowing effect
        } else {
          drawCircle(shape.x, shape.y, circleRadius, "white");
        }
      });

      // Draw lines
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

      // Connect shapes based on distance
      for (let i = 0; i < shapes.length - 11; i++) {
        for (let j = i + 1; j < shapes.length - 10; j++) {
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
    // end of animate

    // Initialize shapes (circles and stars)
    for (let i = 0; i < (3 * numShapes) / 4; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        isStar: false,
      });
    }

    for (let i = 0; i < numShapes / 4; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        isStar: true,
      });
    }

    // Add mousemove event listener
    window.addEventListener("mousemove", updateMousePosition);

    // Start animation
    animate();

    // Cleanup event listener
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

export default CanvasC;
