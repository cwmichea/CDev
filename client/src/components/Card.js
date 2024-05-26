import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'; // Import Font Awesome icons from React Icons
import {theme} from '../GlobalStyles';

// Card component to display each project
const Card = ({ project }) => {
  return (
    <CardContainer>
      <Title>{project.title}</Title>

      <ImageContainer>
      <ColorContainer>
        <img src={project.image} alt={project.title} />
      </ColorContainer>
      </ImageContainer>


      <LinkContainer>
        <Link to={project.link}>Go to {project.title} Game </Link>
        <a target='_blank'  href="https://github.com/cwmichea"><FaGithub /></a>
      </LinkContainer>
      
    </CardContainer>
  );
};
// Styled components for Card
const Title = styled.h3`
  position: absolute;
  margin: 0px auto ;
  color: white;
  z-index: 7;
  font-family: ${theme.fonts.alternative2};
`
const CardContainer = styled.div`
  // border: 1px solid #ccc;
  background-color: #ccc;
  border-radius: 10px;
  padding: 19px;
  padding-bottom: 12px;
  margin: 16px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  // border: 2px red solid;
  @media screen and (max-width: 559px){
    height: 150px;
    padding-top: 15px;
    padding-bottom: 52px;
  }
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  gap: 10px;
  a {
    display: block;
    margin-top: 22px;
    color: #007bff;
    color: #007bff;
    text-decoration: none;
    color: hsl(261, 100%, 8%);
    font-family: ${theme.fonts.alternative};
    font-size: 18px;
    &:hover {
      opacity: .5;
      // font-size: 19px;

    }
  }
  // border: 2px red solid;
  
`;
const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: scale(1.2);

    img{
      // width: 110%;
      height: 110%;
    }
  }
  @media screen and (max-width: 559px){
    height: 150px;
  }
`;
const ColorContainer = styled.div`
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
  opacity: 0.8;
  z-index: 5;

  &:hover {
    opacity: 0.4;
        
    img{
      // transform: scale(1.5);
      // width: 110%
      // height: 120%
    }
  }
`;



export default Card;
