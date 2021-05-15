import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import StickyBox from 'react-sticky-box';
import LoginMenu from './components/auth/LoginMenu';
import OrderList from './components/orders/OrderList';
import UserForm from './components/auth/UserForm';
import UserShow from './components/auth/UserShow';
import BottleList from './components/bottles/BottleList';
import BottleForm from './components/bottles/BottleForm';
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
                <Route
                  path="/users/new"
                  component={withAuth(UserForm, { mode: 'new', editUser: {} })}
                />
                <Route path="/users/:id" component={withAuth(UserShow)} />
                {/* <Route path="/orders" component={withAuth(OrderList)} /> */}
                <Route path="/bottles" component={withAuth(BottleList)} />
                <Route path="/bottle/new" exact component={withAuth(BottleForm, { mode: 'new' })} />
                <Route
                  path="/bottle/edit/:query"
                  component={withAuth(BottleForm, { mode: 'edit' })}
                />
                <Route path="/bottle/:query" component={withAuth(BottleList, { by: 'bottles' })} />
                <Route
                  path="/producers/:query"
                  component={withAuth(BottleList, { by: 'producers' })}
                />
                <Route path="/bins/:query" component={withAuth(BottleList, { by: 'bins' })} />
                <Route
                  path="/countries/:query"
                  component={withAuth(BottleList, { by: 'countries' })}
                />
                <Route
                  path="/varietals/:query"
                  component={withAuth(BottleList, { by: 'varietals' })}
                />
                <Route path="/search/:query" component={withAuth(BottleList, { by: 'search' })} />
              </Switch>
            </Col>
            {loggedIn ? (
              <Col xs="3">
                <StickyBox offsetTop={60} style={{ overflow: 'scroll', height: '93.5vh' }}>
                  <Container className="pt-3">
                    <OrderList />
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
