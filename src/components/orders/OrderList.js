import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../features/orders/orderSlice';
import { Row, Col, Spinner } from 'react-bootstrap';
import OrderCard from './OrderCard';

const OrderList = (props) => {
  const dispatch = useDispatch();
  const {
    orders: {
      orderList: { data, status },
    },
    auth: { currentUser, loggedIn },
  } = useSelector((state) => state);

  const handleGetOrders = (id) => {
    dispatch(getOrders(id));
  };

  useEffect(() => {
    console.log(currentUser.role);
    if (currentUser.role === 'server') {
      console.log('server logged in');
      handleGetOrders(currentUser.id);
    } else {
      console.log('admin or runner');
      handleGetOrders();
    }
  }, []);

  const generateCards = () => {
    return data.map(({ id, attributes }) => {
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
    if (status === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else {
      return generateCards();
    }
  };

  return (
    <div>
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
