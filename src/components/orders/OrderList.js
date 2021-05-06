import React from 'react';
import { connect } from 'react-redux';
import { getAllOrders, getUserOrders } from '../../actions/orders';
import { Row, Col, Spinner } from 'react-bootstrap';
import OrderCard from './OrderCard';

class OrderList extends React.Component {
  componentDidMount() {
    console.log('orderlist getting');
    console.log(this.props.currentUser);
    if (this.props.currentUser.role === 'server') {
      this.props.getUserOrders;
    } else {
      this.props.getAllOrders;
    }
  }

  generateCards = () => {
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
    } else if (this.props.loading === 'finished') {
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
    currentUser: state.auth.currentUser.data,
    loading: state.orders.orderLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllOrders: dispatch(getAllOrders()),
    getUserOrders: dispatch(getUserOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
