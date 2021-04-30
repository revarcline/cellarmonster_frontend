import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TestProtected = (props) => {
  return (
    <Container className="pt-3">
      <Row>
        <Col>
          <h1>Protected? Who knows</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default TestProtected;
