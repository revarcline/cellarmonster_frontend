import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import LoginCard from './LoginCard';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

class LoginMenu extends React.Component {
  componentDidMount() {
    this.props.getUsers();
    console.log(this.props);
  }

  generateCards = () => {
    console.log(this.props);
    return this.props.users.map(({ attributes: { email, name, role, id } }) => {
      const capsRole = role.charAt(0).toUpperCase() + role.slice(1);
      return <LoginCard email={email} name={name} role={capsRole} key={id} />;
    });
  };

  handleLoading = () => {
    if (this.props.loading) {
      return <Spinner animation="border" role="status" />;
    } else {
      return this.generateCards();
    }
  };

  render() {
    return (
      <Container fluid className="pt-3">
        <Row className="justify-content-md-center">
          <Col lg="6" md="8" sm="10" xs>
            {this.handleLoading()}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersList.data.data,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginMenu);
