// import { useState } from 'react';
import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

export default function GraySection() {

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect( () => {
    setWindowHeight(window.innerHeight);
    // window.addEventListener('resize', handleResize);

  },[])

  return (
    <Div height={windowHeight}>
      {/* <p>{windowHeight}</p> */}
    </Div>
  )
}

const Div = styled.div`
 height: ${props => props.height}px;
 background: linear-gradient(to bottom, #676767 60%, black);
//  border: red 1px solid;
//  box-sizing: 
`