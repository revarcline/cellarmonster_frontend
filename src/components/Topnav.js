import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logout from './auth/Logout';

const Topnav = ({ authChecked, loggedIn, currentUser }) => {
  return (
    <Navbar variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Brand>cellarmonster</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Item>
              <LinkContainer exact to="/">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer exact to="/protected-route">
                <Nav.Link>Protected</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer exact to="/protected-route">
                <Nav.Link>Protected</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
          <Logout />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
  return { authChecked, loggedIn, currentUser };
};

export default connect(mapStateToProps)(Topnav);
