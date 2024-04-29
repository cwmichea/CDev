import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
// Card component to display each project
const Card = ({ project }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <img src={project.image} alt={project.title} />
      </ImageContainer>
      <h3>{project.title}</h3>
      {/* <a href={project.link}>View Project</a> */}
      <Link to={project.link}>Go to Simon Game</Link>
      <NavLink to={project.link}>Go to Simon Game</NavLink>
    </CardContainer>
  );
};

// Styled components for Card
const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 19px;
  margin: 16px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);


  h3 {
    margin-top: 12px;
    font-size: 18px;
  }

  a {
    display: block;
    margin-top: 12px;
    color: #007bff;
    text-decoration: none;
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export default Card;
