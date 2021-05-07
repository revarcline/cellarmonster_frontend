import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getAttributes } from '../actions/attributes';
import Logout from './auth/Logout';
import Search from './Search';

const TopNav = (props) => {
  useEffect(() => {
    props.getAttributes;
  });

  const renderBottlesDropdown = () => {
    console.log(props);
    return (
      <NavDropdown title="Bottles">
        <NavDropdown.Item>
          <LinkContainer to="/bottles">
            <Nav.Link>All Bottles</Nav.Link>
          </LinkContainer>
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  return (
    <Navbar variant="dark" bg="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand>cellarmonster</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            {props.loggedIn ? (
              <>
                <Nav.Item>
                  <LinkContainer to="/users/new">
                    <Nav.Link>New User</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                {renderBottlesDropdown()}
                <Nav.Item>
                  <LinkContainer to="/bottle/new">
                    <Nav.Link>New Bottle</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <Search />
                </Nav.Item>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {props.loggedIn ? (
            <>
              <Nav.Item>
                <LinkContainer to="/orders">
                  <Nav.Link>{props.currentUser.name}</Nav.Link>
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

const mapStateToProps = (state) => {
  return {
    authChecked: state.auth.authChecked,
    loggedIn: state.auth.loggedIn,
    currentUser: state.auth.loggedIn,
    varietals: state.attributes.varietals,
    countries: state.attributes.countries,
    bins: state.attributes.bins,
    producers: state.attributes.producers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttributes: dispatch(getAttributes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
