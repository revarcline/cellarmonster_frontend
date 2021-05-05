import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logout from './auth/Logout';
import Search from './Search';

const TopNav = ({ authChecked, loggedIn, currentUser }) => {
  return (
    <Navbar variant="dark" bg="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand>cellarmonster</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Item>
              <LinkContainer to="/users/new">
                <Nav.Link>New User</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/bottles">
                <Nav.Link>All Bottles</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <Search />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {loggedIn ? (
            <>
              <Nav.Item>
                <LinkContainer to="/orders">
                  <Nav.Link>{currentUser.name}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Logout />
            </>
          ) : (
            <>
              <LinkContainer exact to="/">
                <Nav.Link>Log In</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
  return { authChecked, loggedIn, currentUser };
};

export default connect(mapStateToProps)(TopNav);
