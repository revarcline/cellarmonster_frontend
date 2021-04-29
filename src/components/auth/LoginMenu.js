import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import LoginCard from './LoginCard';
import { Spinner } from 'react-bootstrap';

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
    return <div>{this.handleLoading()}</div>;
  }
}

const mapDispatchToProps = (state) => {
  return {
    users: state.usersList.users,
    loading: state.loading,
  };
};

export default connect(mapDispatchToProps, { getUsers })(LoginMenu);
