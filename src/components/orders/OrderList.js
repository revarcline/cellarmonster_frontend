import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders, getUserOrders } from '../../actions/orders';
import { Row, Col, Spinner } from 'react-bootstrap';
import OrderCard from './OrderCard';

const OrderList = (props) => {
  const dispatch = useDispatch();
  const {
    orders: { orders, orderLoading },
    auth: { currentUser },
  } = useSelector((state) => state);

  const handleGetAllOrders = () => dispatch(getAllOrders());
  const handleGetUserOrders = (id) => dispatch(getUserOrders(id));

  useEffect(() => {
    if (currentUser.role === 'server') {
      handleGetUserOrders(currentUser.id);
    } else {
      handleGetAllOrders();
    }
  });

  const generateCards = () => {
    return orders.map(({ id, attributes }) => {
      return (
        <OrderCard
          key={id}
          user={attributes.user}
          bottle={attributes.bottle}
          producer={attributes.bottle_producer}
          quantity={attributes.quantity}
          bins={attributes.bins}
          created={attributes.created}
        />
      );
    });
  };

  const handleLoading = () => {
    if (orderLoading === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (orderLoading === 'finished') {
      return generateCards();
    }
  };

  return (
    <div>https://twitter.com/mannyfidel/status/1394705622726332418
      <Row>
        <h2>Orders:</h2>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs="auto">{handleLoading()}</Col>
      </Row>
    </div>
  );
};

export default OrderList;
