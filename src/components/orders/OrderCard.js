import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderCard = (props) => {
  return (
    <div>
      <Card>
        <Card.Header>
          {props.producer} - {props.bottle.name}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <p>SKU: {props.bottle.sku}</p>
              <p>Bin(s): {props.bins}</p>
            </Col>
            <Col>
              <p>Quantity: {props.quantity}</p>
              <p>For: {props.user.name}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>{props.created}</Card.Footer>
      </Card>
      <br />
    </div>
  );
};

export default OrderCard;
