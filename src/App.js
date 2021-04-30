import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewUser from './components/auth/NewUser';
import LoginMenu from './components/auth/LoginMenu';
import Logout from './components/auth/Logout';
import Topnav from './components/Topnav.js';
import './App.css';

function App() {
  return (
    <div>
      <Container fluid>
        <Router>
          <Topnav />
        </Router>
        <Row>
          <Col>
            <NewUser />
          </Col>
          <Col>
            <Card>
              <LoginMenu />
            </Card>
          </Col>
        </Row>
        <Row>
          <Logout />
        </Row>
      </Container>
    </div>
  );
}

export default App;
