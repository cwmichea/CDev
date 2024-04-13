import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {theme} from '../GlobalStyles';
import myStrings from '../myIntroduction.json';// Myp subtitles convert it into db, part2


const myString = myStrings.description;
const myEmoji = myStrings.emoji;

const IntroText = () => {
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  useEffect(() => {

    const interval = setInterval(() => {
      if (charIndex < myString[stringIndex].length) {
          setCurrentText(prevText => prevText + myString[stringIndex][charIndex]);//print the previous cycle
          setCharIndex(prevIndex => prevIndex + 1);//increase char 4next cycle, because react has a delay
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStringIndex(prevIndex => (prevIndex + 1) % myString.length);
          setCharIndex(0);
          setCurrentText('');
        }, 4444);//pause between each string completed
      }
    }, 120);//pause between each char

    return () => clearInterval(interval);
  }, [charIndex, stringIndex]);

  return (<>
    <Myh1 >
    Hey there, I'm Chris
    </Myh1>
    <Styledp>
      <p>{currentText}</p>
    </Styledp>
    </>
  );
};
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const Myh1 = styled.h1`
  position: absolute;
  color: white;
  top: 15%;
  left: 7%;
  margin: 0;
  z-index: 1;
  pointer-events: none; // Make the h1 element transparent for user interactions
  font-family: ${theme.fonts.alternative};
  font-size: 35px;
  animation: ${slideDown} 1s ease forwards;
  `;

const Styledp = styled.p`
  font-size: 18px;
//   border: 1px red solid;
  position: absolute;
  top: 22%;
  left: 7%;
  color: white;
  font-family: ${theme.fonts.primary};
`;

export default IntroText;
// useEffect(() => {
    
//   const timer = setInterval(() => {
//     setCurrentIndex((prevIndex) => {
//       const newIndex = prevIndex + 1;

//       // If the newIndex is equal to the length of the array, reset it to 0
//       const resetIndex = newIndex === myStrings.description.length ? 0 : newIndex;

//       return resetIndex;
//     });
//   }, 7000);

//   return () => clearInterval(timer);
// }, []);