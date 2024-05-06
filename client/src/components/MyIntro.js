import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import MyImage from './MyImage';
import KnowMoreButton from './KnowMoreButton';
import IntroText from './IntroText';
import aStar from '../images/welcomestar.svg'
//array
import aSvg from '../images/chile.svg'
import aWelcome from '../images/awelcome.svg'

const imgArray = [aSvg, aWelcome]

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
      {show ? <MyImage/>
            : <><img src={aStar} alt="star" width='260px' style={{
              position: "absolute", top:"28%", zIndex:"0"
              }}/>              
              <img src={aStar} alt="star" width='55px' style={{zIndex:"10" , position: "absolute", top:"50%", left:"75%"}}/>
              <img src={aStar} alt="star" width='70px' style={{zIndex:"10" , position: "absolute", top:"60%", left:"55%"}}/>
              </>
              }
      <IntroText/>
      {/* <img src={aSvg}  alt="Chile" width='300px'/> */}

      {/* <img src={aStar} alt="Chile" width='20px' /> */}
      {/* // style={{position:"absolute", top:}} */}
      {/* <img src={aWelcome} alt="Chile" /> */}
    </Div>
  )
}

const Div = styled.div`
  @media screen and (max-width: 480px){ // replace by dynamic value
    width : 80vw;
    position: absolute;
    // border: blue solid 10px;
    top: 90px;
  }
 height: ${props => props.height}px;
 width : 50vw;
//  border: red solid 10px;
 position: absolute;
 left: 5%;
 pointer-events: none;
 top: 0%
//  background: linear-gradient(to bottom, #676767 60%, black);
//  border: red 1px solid;
//  box-sizing: 
`