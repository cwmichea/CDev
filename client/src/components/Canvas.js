import React, { useState, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState({
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 },
  });
  const [initialPointA, setInitialPointA] = useState({ x: 0, y: 0 });

  const animationRef = useRef(null);

  const handleCanvasClick = () => {
    const newPointA = generateRandomPosition();
    const newPointB = { ...newPointA }; // B starts at the same position as A

    // Store the initial position of pointA
    setInitialPointA(newPointA);

    // Start the animation
    animateCircles(newPointA, newPointB);
  };

  const animateCircles = (newPointA, newPointB) => {
    const startTime = Date.now();
    const duration = 700; // Animation duration in milliseconds

    const animate = () => {
      const currentTime = Date.now();
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        // Calculate the current positions of pointA and pointB based on the progress
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

        // Draw the shooting star with the current positions
        drawShootingStar(currentPointA, currentPointB, newPointA, newPointB);

        // Update the coordinates in the state
        setCoordinates({
          pointA: currentPointA,
          pointB: currentPointB,
        });

        // Continue the animation
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation completed, reset the coordinates and clear the canvas
        clearCanvas();
        setCoordinates({
          pointA: newPointA,
          pointB: newPointB,
        });
      }
    };

    // Start the animation
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

    // Clear the canvas
    clearCanvas();
    // Draw black line from initial position to current position (pointA)
    ctx.beginPath();
    ctx.moveTo(initialPointA.x, initialPointA.y);
    ctx.lineTo(pointA.x, pointA.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Draw yellow line from initial position to current position (pointA)
    ctx.beginPath();
    ctx.moveTo(initialPointA.x + 1, initialPointA.y + 1);
    ctx.lineTo(pointA.x + 4, pointA.y + 4);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Draw blue line from initial position to current position (pointA)
    ctx.beginPath();
    ctx.moveTo(initialPointA.x - 1, initialPointA.y - 1);
    ctx.lineTo(pointA.x - 4, pointA.y - 4);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Draw circles at pointA and pointB (invisible)
    ctx.beginPath();
    ctx.arc(pointA.x, pointA.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    // Draw yellow circle at pointB (the one that we can see)
    ctx.beginPath();
    ctx.arc(pointB.x, pointB.y, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    // Draw thicker line between pointA and pointB
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3; // Adjust line width as needed
    ctx.stroke();
    // Draw red line from current position to final position (newPointA)
    ctx.beginPath();
    ctx.moveTo(pointB.x, pointB.y);
    ctx.lineTo(newPointA.x, newPointA.y);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ background: "black" }}
      width={400} // Adjust canvas dimensions as needed
      height={400}
    ></canvas>
  );
};

export default Canvas;

// import React, { useEffect, useRef } from 'react';
// import styled from 'styled-components';

// const Canvas = () => {
//   const canvasRef = useRef(null);
//   const handleMouseMoveRef = useRef(null);
//   // let ctx;

//   useEffect(() => {
//     // Get the 2D context of the canvas
//     let ctx = canvasRef.current.getContext('2d');

//     const handleMouseMove = (e) => {
//       // Do something with the mouse coordinates
//       const x = e.clientX - canvasRef.current.offsetLeft;
//       const y = e.clientY - canvasRef.current.offsetTop;

//       // Example: Draw a circle at the mouse position
//       ctx.beginPath();
//       ctx.arc(x, y, 10, 0, 2 * Math.PI);
//       ctx.fill();
//     };

//     // Add event listeners
//     canvasRef.current.addEventListener('mousemove', handleMouseMove);

//     // Clean up event listeners on component unmount
//     return () => {
//       // canvasRef.current.removeEventListener('mousemove', handleMouseMove);
//             // Remove the event listener only if canvasRef.current is defined
//             if (canvasRef.current) {
//               canvasRef.current.removeEventListener('mousemove', handleMouseMoveRef.current);
//             }
//     };
//   }, []); // No dependency needed for this example

//   return (
//     <>
//     <canvas
//       ref={canvasRef}
//       width={800}  // Set your desired width
//       height={600} // Set your desired height
//       style={{ border: '1px solid black' }} // Example inline styling
//     />
//         <StyledDiv>
//       This is a styled component!
//     </StyledDiv>
//     </>
//   );
// };

// export default Canvas;

// const StyledDiv = styled.div`
//   background-color: red;
//   border: 2px solid black;
//   color: blue;
//   font-size: 18px;
// `;