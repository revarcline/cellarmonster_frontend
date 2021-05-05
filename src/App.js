import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import StickyBox from 'react-sticky-box';
import LoginMenu from './components/auth/LoginMenu';
import NewUser from './components/auth/NewUser';
import BottleList from './components/bottles/BottleList';
import TopNav from './components/TopNav';
import TestProtected from './components/TestProtected';
import withAuth from './components/auth/withAuth';
import './App.css';

function App({ loggedIn }) {
  return (
    <div className="App">
      <Router>
        <TopNav />
        <Container>
          <Row>
            {loggedIn ? (
              <Col xs="3">
                <StickyBox>
                  <div>Order List</div>
                </StickyBox>
              </Col>
            ) : null}
            <Col>
              <Switch>
                <Route exact path="/" component={LoginMenu} />
                <Route path="/protected-route" component={withAuth(TestProtected)} />
                <Route path="/users/new" component={withAuth(NewUser)} />
                {/* <Route path="/orders" component={withAuth(OrderList)} /> */}
                <Route path="/bottles" component={withAuth(BottleList)} />
                <Route
                  path="/bottle/:query"
                  component={(withAuth(BottleList), { by: 'bottles' })}
                />
                <Route
                  path="/producer/:query"
                  component={withAuth(BottleList, { by: 'producers' })}
                />
                <Route
                  path="/country/:query"
                  component={(withAuth(BottleList), { by: 'countries' })}
                />
                <Route
                  path="/varietal/:query"
                  component={withAuth(BottleList, { by: 'varietals' })}
                />
                <Route path="/search/:query" component={withAuth(BottleList, { by: 'search' })} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

const mapStateToProps = ({ auth: { loggedIn } }) => {
  return { loggedIn };
};
export default connect(mapStateToProps)(App);
