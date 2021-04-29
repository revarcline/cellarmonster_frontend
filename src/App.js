import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NewUser from './components/auth/NewUser.js';
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
              <h1>Two columns!</h1>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
