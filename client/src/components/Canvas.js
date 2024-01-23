import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = () => {
  const canvasRef = useRef(null);
  let ctx;

  useEffect(() => {
    // Get the 2D context of the canvas
    ctx = canvasRef.current.getContext('2d');

    const handleMouseMove = (e) => {
      // Do something with the mouse coordinates
      const x = e.clientX - canvasRef.current.offsetLeft;
      const y = e.clientY - canvasRef.current.offsetTop;

      // Example: Draw a circle at the mouse position
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    };

    // Add event listeners
    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Clean up event listeners on component unmount
    return () => {
      canvasRef.current.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // No dependency needed for this example

  return (
    <>
    <canvas
      ref={canvasRef}
      width={800}  // Set your desired width
      height={600} // Set your desired height
      style={{ border: '1px solid black' }} // Example inline styling
    />
        <StyledDiv>
      This is a styled component!
    </StyledDiv>
    </>
  );
};

export default Canvas;

const StyledDiv = styled.div`
  background-color: red;
  border: 2px solid black;
  color: blue;
  font-size: 18px;
`;