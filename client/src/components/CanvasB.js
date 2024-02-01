import React, { useRef, useEffect } from 'react';

const CanvasB = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const circles = [];
    const numCircles = 50;
    const circleRadius = 3;
    const lineColor = 'darkgrey';
    const lightLineColor = 'lightgrey';
    const bgColor = 'black';
    const repulsionRadius = 50;

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

      // Draw circles
      circles.forEach((circle) => {
        drawCircle(circle.x, circle.y, circleRadius, 'white');
      });

      // Draw lines
      for (let i = 0; i < circles.length - 1; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const dist = distance(
            circles[i].x,
            circles[i].y,
            circles[j].x,
            circles[j].y
          );

          if (dist < repulsionRadius) {
            drawLine(
              circles[i].x,
              circles[i].y,
              circles[j].x,
              circles[j].y,
              lightLineColor
            );
          }
        }
      }

      // Connect circles based on distance
      for (let i = 0; i < circles.length - 1; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const dist = distance(
            circles[i].x,
            circles[i].y,
            circles[j].x,
            circles[j].y
          );

          if (dist < repulsionRadius) {
            drawLine(
              circles[i].x,
              circles[i].y,
              circles[j].x,
              circles[j].y,
              lineColor
            );
          }
        }
      }

      // Draw repulsion circles around the mouse
      for (let i = 0; i < 3; i++) {
        const delay = i * 20;
        const repulsionX = mouseRef.current.x - delay;
        const repulsionY = mouseRef.current.y - delay;
        drawCircle(repulsionX, repulsionY, repulsionRadius - delay, 'yellow');
      }

      requestAnimationFrame(animate);
    };

    // Initialize circles
    for (let i = 0; i < numCircles; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      });
    }

    // Add mousemove event listener
    window.addEventListener('mousemove', updateMousePosition);

    // Start animation
    animate();

    // Cleanup event listener
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CanvasB;
