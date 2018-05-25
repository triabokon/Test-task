import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class HeaderNavigation extends React.Component {
  render() {
    let brand = <a href='#'>Project Name</a>;
    return (
      <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>TV and Fridge</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                TV
              </NavItem>
              <NavItem eventKey={2} href="#">
                Fridges
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}