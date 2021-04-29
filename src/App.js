import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NewUser from './components/auth/NewUser';
import LoginMenu from './components/auth/LoginMenu';
import './App.css';

function App() {
  return (
    <div>
      <Container fluid>
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
      </Container>
    </div>
  );
}

export default App;
