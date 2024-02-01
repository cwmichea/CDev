// MyNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {theme} from '../GlobalStyles';

const MyNav = () => {
  return (
    <NavContainer>
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
  padding: 10px;
  font-family: ${theme.fonts.secondary};
  color: ${theme.palette.primary};
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;

  &.active {
    color: yellow;  // Change the style for the active NavLink
  }
`;
export default MyNav;
