import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import StickyBox from 'react-sticky-box';
import LoginMenu from './components/auth/LoginMenu';
import NewUser from './components/auth/NewUser';
import BottleList from './components/bottles/BottleList';
import TopNav from './components/TopNav';
import withAuth from './components/auth/withAuth';
import './App.css';

function App({ loggedIn }) {
  return (
    <div className="App">
      <Router>
        <TopNav />
        <Container>
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={LoginMenu} />
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
            {loggedIn ? (
              <Col xs="3">
                <StickyBox offsetTop={60} offsetBottom={20}>
                  <Container className="pt-3">
                    <h1>orders</h1>
                    <h1>will</h1>
                    <h1>go</h1>
                    <h1>here</h1>
                  </Container>
                </StickyBox>
              </Col>
            ) : null}
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
