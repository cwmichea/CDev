// Home.js
import React from 'react';
import CanvasA from './CanvasA';
import IntroText from './IntroText';
import styled, { keyframes } from 'styled-components';

const Home = () => {
  return (
    <Adiv>
      <CanvasA/>
      <IntroText/>
    </Adiv>
  );
};

const Adiv  = styled.div`
  //  border: 1px blue solid;
   margin-bottom: 0px
`
export default Home;
