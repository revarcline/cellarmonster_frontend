import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../features/orders/orderSlice';
import { deleteBottle } from '../../features/bottles/bottleSlice';
import { Card, Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BottleCard = (props) => {
  const dispatch = useDispatch();

  const [orderQty, setOrderQty] = useState(0);
  const [inventory, setInventory] = useState(props.inventory);
  const [totalSold, setTotalSold] = useState(props.total_sold);
  const [deleted, setDeleted] = useState(false);

  const {
    auth: { currentUser },
    bottles: { bottleDelete },
  } = useSelector((state) => state);

  const dispatchNewOrder = async (order) => await dispatch(postOrder(order));
  const dispatchDeleteBottle = async (bottle) => await dispatch(deleteBottle(bottle));

  const varietalLinks = () => {
    return props.varietals.map((varietal) => {
      return (
        <span key={`varietal-${varietal.id}`}>
          <Link to={`/varietals/${varietal.id}`}>{varietal.name}</Link>{' '}
        </span>
      );
    });
  };

  const binLinks = () => {
    return props.bins.map((bin) => {
      return (
        <span key={`bin-${bin.id}`}>
          <Link to={`/bins/${bin.id}`}>{bin.name}</Link>{' '}
        </span>
      );
    });
  };

  const formattedPrice = () => `\$${parseFloat(props.price).toFixed(2)}`;

  const numChange = (event) => setOrderQty(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const order = { quantity: orderQty, bottle_id: props.id, user_id: `${currentUser.id}` };
    dispatchNewOrder(order).then(() => {
      setTotalSold(parseInt(totalSold) + parseInt(orderQty));
      setInventory(parseInt(inventory) - parseInt(orderQty));
    });
  };

  const handleDelete = () => {
    // replace element with "bottle deleted" message
    dispatchDeleteBottle(props.id).then(() => {
      setDeleted(true);
    });
  };

  if (!deleted) {
    return (
      <Container fluid classname="pt-3">
        <Card>
          <Card.Header>
            <Row>
              <Col md="8">
                <Card.Title>
                  <Link to={`/producers/${props.producer.id}`}>{props.producer.name}</Link>
                  {' - '}
                  <i>{props.name}</i>
                </Card.Title>
                <Card.Subtitle>
                  <div>
                    {props.appellation ? `${props.appellation} - ` : null}
                    {props.region ? `${props.region} - ` : null}
                    <Link to={`/countries/${props.country.id}`}>{props.country.name}</Link>
                  </div>
                  <div>{varietalLinks()}</div>
                </Card.Subtitle>
              </Col>
              {currentUser.role !== 'runner' ? (
                <Col>
                  <Form onSubmit={handleSubmit}>
                    <Form.Control type="number" value={orderQty} onChange={numChange} />
                    <Button type="submit">Order</Button>
                  </Form>
                </Col>
              ) : null}
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <div>Inventory: {inventory}</div>
                <div>Price: {formattedPrice()}</div>
                <div>SKU: {props.sku}</div>
                <div>
                  {props.bins.length > 1 ? 'Bins: ' : 'Bin: '}
                  {binLinks()}
                </div>
                <div>Total Sold: {totalSold}</div>
              </Col>
              <Col>
                <div>{props.sparkling ? 'Sparkling' : 'Still'}</div>
                <div>Color: {props.color}</div>
                <div>Vintage: {props.vintage}</div>
                <div>Format: {props.format}</div>
                {currentUser.role === 'admin' ? (
                  <div>
                    <Link to={`/bottle/edit/${props.id}`}>Edit</Link>
                    {' · '}
                    <a href="#" onClick={() => handleDelete()}>
                      Delete
                    </a>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <p>{props.notes}</p>
            </Row>
          </Card.Footer>
        </Card>
        <br />
      </Container>
    );
  } else if (bottleDelete.status === 'pending') {
    return (
      <div>
        <h1>Deleting...</h1>
        return <Spinner animation="border" role="status" />;
      </div>
    );
  } else if (bottleDelete.status === 'finished') {
    return <h1>Bottle Deleted Successfully</h1>;
  }
};

export default BottleCard;
