import React, { useState, useEffect } from "react";
import styled from "styled-components";

import html from "../images/languages/html.png";
import css from "../images/languages/css.png";
import js from "../images/languages/js.png";

import node from "../images/languages/node.png";
import react from "../images/languages/react.png";
import express from "../images/languages/express.png";

import git from "../images/languages/git.png";
import mongo from "../images/languages/mongo.png";
import postgressql from  "../images/languages/postgressql.png";

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
            <div><p>html</p> <section><img src={html} rel="html" /> </section> </div>
            <div><p>node</p> <section><img src={node} rel="node" /></section></div>
            <div><p>git</p>  <section><img src={git} rel="git" /></section> </div>
          </Col>
          <Col>
            <div><p>css</p><section><img src={css} rel="css" /></section></div>
            <div><p>postgreSql</p><section><img src={postgressql} rel="postgressql" /></section></div>
            <div><p>react</p><section><img src={react} rel="react" /></section></div>
          </Col>
          <Col>
            <div><p>js</p><section><img src={js} rel="js" /></section></div> 
            <div><p>mongo</p><section><img src={mongo} rel="mongo" /></section> </div>
            <div><p>express</p><section><img src={express} rel="express" /></section> </div>
          </Col>
        </LanguagesContainer>
        <TextContainer>
          <p>Hi, I'm Chris! <br/> <br/>
          ⚛ I'm a dedicated full stack developer, wholeheartedly embracing the philosophy of life-long learning. My expertise lies in JavaScript, with a special fondness for React, and I thrive on the dynamic world of web development.  <br/> <br/>
            💻 The blend of creativity, logic, and technology in web development keeps me engaged and enthusiastic to explore. It's a domain where there's always something new to uncover, maintaining my enjoyment for learning. <br/> <br/>
            📚 I'm kinda bookworm-type of person so when I’m not in front of the pc, you'll find me with my nose buried in a book, trying to expand my knowledge (It's become a bit of a hobby—or perhaps an obsession xD), but I do also enjoy staying active through jogging or gym sessions from time to time. 🏋️‍♀️
            {/* , finding a balanced lifestyle crucial for both mental and physical well-being. */}
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
    // align-items: center;
    // justify-content: center;
    div{
      border: yellow 1px solid;
      // width: 33%;
      height: 32%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      align-items: center;// x
      // justify-content: center;
      // justify-content: space-between;
      // justify-content: center;
      // align-content: space-between;
      width: 90%;
      overflow: hidden;
      object-fit: contain; 
      section {
        border: red 4px solid;
        width: 100%
        // height: 100%;
        // object-fit: cover; 
        // max-height: 150px;
      }
    }
    img{
      width: 100%;
      // height: auto;
      object-fit: contain; 
      // object-fit: contain;
      // height: auto;
      max-height: 170px;
      border: blue 1px solid;
    }
    p{
      margin-top: 2px;
      margin-bottom: 10px;
      // font-size: 30px;
    }
    // max-width: 140px;
`
const LanguagesContainer = styled.div`
  // padding: 0; /* Remove padding */
  // margin: 0; /* Remove margin */
  // list-style: none;
  @media screen and (max-width: 820px){//from 804px
    width: 85%;
    margin: 0 auto;
  }
  height: auto;
  width: 49%;
  border: 1px red solid;
  boz-sizing: border-box;
  display: flex;

`;
const TextContainer = styled.div`
@media screen and (max-width: 820px){
  width: 85%;
  margin: 0 auto;
}
  border: 1px blue solid;
  height: auto;
  width: 50%;
  p {
    margin: 0;
    padding: 0;
    }
`;
const Container = styled.div`
@media screen and (max-width: 820px){
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
  // height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #676767 60%, black);
  padding-top: 4%;
  padding-bottom: 4%;
  //  border: red 1px solid;
  //  box-sizing:
`;
