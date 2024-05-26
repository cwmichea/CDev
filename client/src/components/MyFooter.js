import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'; // Import Font Awesome icons from React Icons
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../GlobalStyles';
import clogo from '../images/clogo.png';

const MyFooter = () => {
  
  return (
    <NavContainer>
      <img src={clogo} alt='C logo' height='52px'/>
      <NavList>
        <NavItem><a target='_blank' href="https://twitter.com/donconeju"><FaTwitter /></a></NavItem>
        <NavItem><a  target='_blank' href="https://github.com/cwmichea"><FaGithub /></a></NavItem>
        <NavItem><a target='_blank'  href="https://linkedin.com/in/cmichea"><FaLinkedin /></a></NavItem>
      </NavList>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background-color: ${theme.palette.dark};
  font-family: ${theme.fonts.secondary};
  color: ${theme.palette.primary};
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width:  100%;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  font-family: ${theme.fonts.primary};
  margin-top: 35px;

  padding: 0px;

  & li:last-child {
    margin-right: 0px
  }
`;

const NavItem = styled.li`
  margin-right: 35px;
  font-size: 25px;
  svg {
    color: white;
    color: ${theme.palette.yellow}
  }
`;


export default MyFooter;
