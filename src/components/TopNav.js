import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getAttributes } from '../actions/attributes';
import Logout from './auth/Logout';
import Search from './Search';
import './TopNav.css';

const TopNav = (props) => {
  const dispatch = useDispatch();
  const { attributes, auth } = useSelector((state) => state);
  const handleGetAttributes = async () => await dispatch(getAttributes());

  useEffect(() => {
    handleGetAttributes();
  }, []);

  const renderBottlesDropdown = () => {
    const categories = {
      countries: [...attributes.countries],
      varietals: [...attributes.varietals],
      producers: [...attributes.producers],
    };
    return (
      <>
        <Nav.Item>
          <LinkContainer to="/bottles">
            <Nav.Link>All Bottles</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        {Object.keys(categories).map((category) => {
          return (
            <Nav.Item key={category}>
              <NavDropdown drop="right" title={category.replace(/^\w/, (c) => c.toUpperCase())}>
                {categories[category].map((item) => {
                  return (
                    <Nav.Item key={item.attributes.id}>
                      <NavDropdown.Item>
                        <LinkContainer to={`/${category}/${item.attributes.id}`}>
                          <Nav.Link>{item.attributes.name}</Nav.Link>
                        </LinkContainer>
                      </NavDropdown.Item>
                    </Nav.Item>
                  );
                })}
              </NavDropdown>
            </Nav.Item>
          );
        })}
        <Nav.Item>
          <LinkContainer to="/bottle/new">
            <Nav.Link>New Bottle</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </>
    );
  };

  const renderUsersDropdown = () => {
    return (
      <NavDropdown title="Users">
        <NavDropdown.Item>
          <LinkContainer to="/users/new">
            <Nav.Link>New User</Nav.Link>
          </LinkContainer>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <LinkContainer to="/users">
            <Nav.Link>All Users</Nav.Link>
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
            {auth.loggedIn ? (
              <>
                {renderBottlesDropdown()}
                <Nav.Item>
                  <Search />
                </Nav.Item>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {auth.loggedIn && auth.currentUser.role === 'admin' ? <>{renderUsersDropdown()}</> : null}
          {auth.loggedIn ? (
            <>
              <Nav.Item>
                <LinkContainer to="/orders">
                  <Nav.Link>{auth.currentUser.name}</Nav.Link>
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

//const mapStateToProps = (state) => {
//return {
//authChecked: state.auth.authChecked,
//loggedIn: state.auth.loggedIn,
//currentUser: state.auth.currentUser,
//attributes: {
//varietals: state.attributes.varietals,
//countries: state.attributes.countries,
//producers: state.attributes.producers,
//},
//users: state.usersList.data,
//};
//};

//const mapDispatchToProps = (dispatch) => {
//return {
//getAttributes: dispatch(getAttributes()),
//};
//};

export default TopNav;
