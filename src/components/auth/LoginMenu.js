import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import LoginCard from './LoginCard';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

class LoginMenu extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  generateCards = () => {
    return this.props.users.map((user) => {
      return (
        <LoginCard
          email={user.attributes.email}
          name={user.attributes.name}
          role={user.attributes.role}
          key={user.id}
        />
      );
    });
  };

  handleLoading = () => {
    if (this.props.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return this.generateCards();
    }
  };

  render() {
    return (
      <Container fluid className="pt-3">
        <Row className="justify-content-md-center">
          <Col xs md="8" sm="10" lg="6">
            {this.handleLoading()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    users: state.usersList.users,
    loading: state.loading,
  };
};

export default connect(mapDispatchToProps, { getUsers })(LoginMenu);
