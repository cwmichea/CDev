// Home.js
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import CanvasA from './CanvasA';
import styled, { keyframes } from 'styled-components';
import Weather from './Weather';
import GraySection from './GraySection';
import MyIntro from './MyIntro';
import About from './About';

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
      <CanvasA color={"black"} 
               color2={"black"} 
               fullMoon={false} 
               isInteractive={true} 
               moonPos={{x: 150, y: 100}}
               />
      <MyIntro/>
      <GraySection/>
      <About/>
    </Adiv>
  );
};

const Adiv  = styled.div`
  //  border: 1px blue solid;
   margin-bottom: 0px
`;


export default Home;

