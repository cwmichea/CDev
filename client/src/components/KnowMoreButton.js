import React from 'react';
import styled from 'styled-components';
import {theme} from '../GlobalStyles';

// Styled components for the button
const Button = styled.button`
  position: absolute;
  z-index: 2;
  top:71%;
  left:10%;
  // background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 22px;
  cursor: pointer;
  pointer-events: auto;
  border-radius: 7px;
  font-family: ${theme.fonts.alternative};
  font-size: 20px;
  background-color: ${theme.palette.color1};
  &:hover{
    background-color: ${theme.palette.yellow};
  }
`;

// Define the position to scroll to
const scrollToPosition = () => {
  const yOffset = window.innerHeight; // You can adjust this value to scroll more or less
  window.scrollTo({ top: yOffset, behavior: 'smooth' });
};

// Functional component for the Know More button
const KnowMoreButton = () => {
  // Handle click event to trigger scrolling
  const handleClick = () => {
    scrollToPosition();
  };

  return (
    <Button onClick={handleClick}>
      Know More
    </Button>
  );
};

export default KnowMoreButton;
