// MyNav.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../GlobalStyles';
import clogo from '../images/clogo.png';
import { FaBars } from 'react-icons/fa';

const MyNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth <= 444);
    };

    handleResize(); // Call once to set initial state

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <NavContainer>
      <Logo src={clogo} alt='C logo' />
      {isNarrow 
      ? <><BurgerIcon onClick={toggleMenu} />
        <NavList isOpen={isOpen}>
        <NavItem>
          <NavLinkStyled to="/" activeClassName="active" onClick={toggleMenu}>
            Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" activeClassName="active" onClick={toggleMenu}>
            About
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/projects" activeClassName="active" onClick={toggleMenu}>
            Projects
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/contact" activeClassName="active" onClick={toggleMenu}>
            Contact
          </NavLinkStyled>
        </NavItem>
      </NavList></>

      : <NavList>
        <NavItem>
          <NavLinkStyled to="/" activeClassName="active" onClick={toggleMenu}>
            Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" activeClassName="active" onClick={toggleMenu}>
            About
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/projects" activeClassName="active" onClick={toggleMenu}>
            Projects
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/contact" activeClassName="active" onClick={toggleMenu}>
            Contact
          </NavLinkStyled>
        </NavItem>
      </NavList>
      }
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background-color: ${theme.palette.dark};
  font-family: ${theme.fonts.secondary};
  color: ${theme.palette.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  min-height: 70px;
  @media screen and (max-width: 444px) {
    // flex-direction: column;
    // align-items: stretch;
    position: relative;
  }
  svg{
    height: 90%;
    box-sizing: border-box;
  }
`;

const Logo = styled.img`
  height: 60px;
  width: 58px;
  // max-width: 100%;
  // height: auto;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  font-family: ${theme.fonts.primary};

  @media screen and (max-width: 444px) {
    flex-direction: column;
    justify-content: space-between;
    // align-items: space-between;
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 74px; /* Adjust as per your need */
    right: 0px;
    // background: ${theme.palette.dark};
    width: 50%;
    height: auto;
    padding: 10px;
    // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
    padding-top: 0;
    text-align: center;
  }
`;

const NavItem = styled.li`
  margin: 0;
  padding: 5px;
  background-color: ${theme.palette.dark};
  
  &:hover {
    background-color: ${theme.palette.color1};
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px;
  display: block;
  &.active {
    color: ${theme.palette.yellow};
  }

  @media screen and (max-width: 444px) {
    padding: 8px 0;
  }
`;

const BurgerIcon = styled(FaBars)`
  display: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media screen and (max-width: 444px) {
    display: block;
    position: absolute;
    top: 10px;
    right: 20px;
  }
`;

export default MyNav;
