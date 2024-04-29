import React, { useState, useEffect } from "react";
import styled from "styled-components";
import html from "../images/languages/html.png";
import css from "../images/languages/css.png";
import js from "../images/languages/js.png";
import { theme } from "../GlobalStyles";
export default function GraySection() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    // window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Div height={windowHeight}>
      {/* <p>{windowHeight}</p> */}
      <Container>
        <LanguagesContainer>
          <Col>
            <div><img src={html} rel="html" /><p>html</p></div>
            <div><img src={html} rel="html" /><p>html</p></div>
          </Col>
          <Col>
            <div><img src={css} rel="css" /><p>css</p></div>
            <div><img src={css} rel="css" /><p>css</p></div>
          </Col>
          <Col>
            <div><img src={js} rel="css" /><p>js</p></div>
            <div><img src={js} rel="css" /><p>js</p></div>
          </Col>
        </LanguagesContainer>
        <TextContainer>
          <p>Hi, I'm Chris! <br/> <br/>
          ⚛ Fully committed to the philosophy of life-long learning, I’m a full stack developer with a deep passion for JavaScript, specially React, and web development.  <br/> <br/>
            💻 The unique combination of creativity, logic, technology and never running out of new things to discover, drives my excitement and passion for web development.  <br/> <br/>
            📚 When I’m not at my computer, I like to spend my time reading, jogging, in the gym keeping fit and spending time studying.<br/>
             (I'm kinda bookworm-type of person).  
          </p>
        </TextContainer>
      </Container>
    </Div>
  );
}
const Col = styled.div`
    border: red 1px solid;
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    div{
      border: red 1px solid;
      // width: 33%;
      height: 32%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      align-items: center;
      // justify-content: center;
      justify-content: space-between;
    }
    img{
      width: 90%;
      height: calc(width);
    }
`
const LanguagesContainer = styled.div`
  // padding: 0; /* Remove padding */
  // margin: 0; /* Remove margin */
  // list-style: none;
  @media screen and (max-width: 480px){
    width: 85%;
    margin: 0 auto;
  }
  height: 90%;
  width: 50%;
  border: 1px red solid;
  boz-sizing: border-box;
  display: flex;

`;
const TextContainer = styled.div`
@media screen and (max-width: 480px){
  width: 85%;
  margin: 0 auto;
}
  border: 1px blue solid;
  height: 90%;
  width: 45%;
`;
const Container = styled.div`
@media screen and (max-width: 480px){
  flex-direction: column;
  justify-content: space-between;
  border: 1px green solid;
}
  height: 90%;
  width: 85%;
  border: 1px red solid;
  boz-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-family: ${theme.fonts.alternative};
  font-size: 25px;
  color: white;
`;
const Div = styled.div`
  height: ${(props) => props.height}px;
  background: linear-gradient(to bottom, #676767 60%, black);
  padding-top: 4%;
  //  border: red 1px solid;
  //  box-sizing:
`;
