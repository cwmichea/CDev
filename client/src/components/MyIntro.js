import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import MyImage from './MyImage';
import KnowMoreButton from './KnowMoreButton';
import IntroText from './IntroText';

export default function MyIntro() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [show, setShow] = useState(window.innerWidth > 320);
    const limitWidth = 480;

    useEffect( () => {
      setWindowHeight(window.innerHeight);
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setShow(window.innerWidth > limitWidth);
      }
      window.addEventListener('resize', handleResize);
  
    },[])
  return (
    <Div height={windowHeight}  >
      <KnowMoreButton/>
      {show && <MyImage/>}
      <IntroText/>
    </Div>
  )
}

const Div = styled.div`
@media screen and (max-width: 480px){ // replace by dynamic value
  width : 80vw;
  position: absolute;
  border: blue solid 10px;
  top: 90px;
}
 height: ${props => props.height}px;
 width : 50vw;
 border: red solid 10px;
 position: absolute;
 left: 5%;
 pointer-events: none;
 top: 0%
//  background: linear-gradient(to bottom, #676767 60%, black);
//  border: red 1px solid;
//  box-sizing: 



`