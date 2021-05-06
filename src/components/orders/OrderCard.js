import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderCard = (props) => {
  const binLinks = (bins) => {
    return bins.map((bin) => {
      return (
        <span key={`bin-${bin.id}`}>
          <Link to={`/bin/${bin.id}`}>{bin.name}</Link>{' '}
        </span>
      );
    });
  };

  return (
    <Container fluid className="pt-3">
      <Card>
        <Card.Header>
          <h3>
            {props.bottle.name} - {props.bottle.sku}
          </h3>
        </Card.Header>
        <Card.Body>
          <h3></h3>
        </Card.Body>
      </Card>
    </Container>
  );
};
