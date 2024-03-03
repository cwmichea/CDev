// MyNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../GlobalStyles';
import clogo from '../images/clogo.png';

const MyNav = () => {
  
  return (
    <NavContainer>
      <img src={clogo} alt='C logo' height='55px'/>
      <NavList>
        <NavItem>
          <NavLinkStyled to="/" activeClassName="active">
            Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/about" activeClassName="active">
            About
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/contact" activeClassName="active">
            Contact
          </NavLinkStyled>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background-color: #333;
  font-family: ${theme.fonts.secondary};
  color: ${theme.palette.primary};
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100vw;

  img{
    margin-left: 7%;
  }
  ul{
    margin-right: 7%;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  font-family: ${theme.fonts.primary};

  & li {
    padding-right: 22px; /* Remove right padding for the last item */
  }
  & li:last-child {
    padding-right: 0px; /* Remove right padding for the last item */
  }
`;

const NavItem = styled.li`
  margin: 0;
  // margin-right: 15px;
  // padding: 0;
  // padding-right: 22px;

`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;

  &.active {
    color: yellow;  // Change the style for the active NavLink
    font-size: x-large;
  }
`;
export default MyNav;
