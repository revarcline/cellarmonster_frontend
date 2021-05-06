import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orders';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import OrderCard from './OrderCard';

class OrderList extends React.Component {
  componentDidMount() {
    this.props.getOrders;
  }

  generateCards = () => {
    console.log(this.props.orders);
    return this.props.orders.map(({ id, attributes }) => {
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

  handleLoading = () => {
    if (this.props.loading === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else {
      return this.generateCards();
    }
  };

  render() {
    return (
      <div>
        <Row>
          <h2>Orders:</h2>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="auto">{this.handleLoading()}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.orderLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: dispatch(getOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
