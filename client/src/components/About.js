import React from 'react';
import styled from 'styled-components';
import { theme } from '../GlobalStyles';
import MyImage from './MyImage';

const About = () => {
  return (
    <Div>
      <MyImage />
      <Adiv>
        <CvLink href='/Chris24.pdf' download="CvChris.pdf">Cv</CvLink>
        <p>Learn more about me <br/> get a copy of my cv </p>
      </Adiv>
    </Div>
  );
};

const Div = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // height: 77px;
  font-family: ${theme.fonts.alternative};
  font-size: 25px;
  p{ margin:0; color: white; text-align:leftt;}
  h1{ margin:0;}
  padding: 30px 40px 45px;
  @media screen and (max-width: 460px){
    flex-direction: column;
    p{
      margin: 35px;
    }
    a{
      margin-right: 0px;
      }
  }
  `
const Adiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const CvLink = styled.a`
  padding: 12px 35px;
  border: none;
  margin-bottom: 8vw;
  font-size: 18px;
  text-decoration: none;
  background-color: ${theme.palette.color2Light};
  font-family: ${theme.fonts.alternative};
  border-radius: 7px;
  color:white;
  &:hover{
    background-color: ${theme.palette.color1};
    color: black;
  }
`
export default About;
