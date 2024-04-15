// Home.js
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import CanvasA from './CanvasA';
import styled, { keyframes } from 'styled-components';
import Weather from './Weather';
import GraySection from './GraySection';
import MyIntro from './MyIntro';

const Home = () => {

  const location = useLocation();

  useEffect(() => {
    // Split the pathname by "/"
    const pathSegments = location.pathname.split('/');
    // Get the last segment
    const lastSegment = pathSegments[pathSegments.length - 1];
    console.log(lastSegment);
    // Check if the last segment is "about"
    if (lastSegment === 'about') {
      // Scroll down by 100vh from the top when Home component mounts and the last segment is "about"
      window.scrollTo(0, window.innerHeight);
    }
  }, [location]);
  return (
    <Adiv>
      {/* <Weather/> */}
      <StarContainer>
      <Triangle />
      <Triangle2 />
      <Circle />
    </StarContainer>
      <CanvasA color={"blue"} fullMoon={true}/>
      <CanvasA color={"black"} fullMoon={false}/>
      <MyIntro/>
      <GraySection/>

    </Adiv>
  );
};

const Adiv  = styled.div`
  //  border: 1px blue solid;
   margin-bottom: 0px
`;

const StarContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

// Triangle to form one side of the star
const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 80px solid yellow;
  position: absolute;
  top: 10px;
  left: 25px;
`;

// Another triangle rotated to form the other side of the star
const Triangle2 = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 80px solid yellow;
  position: absolute;
  top: 50px;
  left: 25px;
  transform: rotate(180deg);
`;

// Central circle for the star
const Circle = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;
  border-radius: 50%;
  position: absolute;
  top: 25px;
  left: 25px;
`;

export default Home;

