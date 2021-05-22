import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import StickyBox from 'react-sticky-box';
import LoginMenu from './components/auth/LoginMenu';
import OrderList from './components/orders/OrderList';
import UserForm from './components/auth/UserForm';
import UserShow from './components/auth/UserShow';
import BottleList from './components/bottles/BottleList';
import NewBottle from './components/bottles/NewBottle';
import EditBottle from './components/bottles/EditBottle';
import TopNav from './components/TopNav';
import withAuth from './components/auth/withAuth';
import './App.css';

const App = (props) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <div className="App">
      <Router>
        <TopNav />
        <Container>
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={LoginMenu} />
                <Route path="/users/new" component={withAuth(UserForm)} />
                <Route path="/users/:id" component={withAuth(UserShow)} />
                {/* <Route path="/orders" component={withAuth(OrderList)} /> */}
                <Route path="/bottles" component={withAuth(BottleList)} />
                <Route path="/bottle/new" exact component={withAuth(NewBottle)} />
                <Route path="/bottle/edit/:query" component={withAuth(EditBottle)} />
                <Route path="/:by/:term" component={withAuth(BottleList)} />
                {/*
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
              */}
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
};

export default App;
