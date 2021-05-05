import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orders';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

class OrderList extends React.Component {
  componentDidMount() {
    this.props.getOrders;
  }

  generateCards = () => {
    console.log(this.props.orders);
    return this.props.orders.map((order) => {
      const user = order.attributes.user;
      const bottle = order.attributes.bottle;
      const quantity = order.attributes.quantity;
      return (
        <div key={order.id}>
          <h3>{user.name}</h3>
          <p>
            {quantity} {bottle.producer} {bottle.name}
          </p>
        </div>
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
      <Container fluid className="pt-3">
        <Row>
          <Container fluid ClassName="pt-3">
            <h2>Orders:</h2>
          </Container>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs="auto">{this.handleLoading()}</Col>
        </Row>
      </Container>
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
