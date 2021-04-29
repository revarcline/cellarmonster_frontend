import React from 'react';
import { connect } from 'react-redux';
import { usersList } from '../../actions/users';
import LoginCard from './LoginCard';
import { Spinner } from 'react-bootstrap';

class LoginMenu extends React.Component {
  componentDidMount() {
    this.props.usersList();
  }

  generateCards = () => {
    // map props to LoginCard(s)
  };

  handleLoading = () => {
    if (this.props.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return;
    }
  };
}

const mapDispatchToProps = (state) => {
  return {
    userList: state.users,
    loading: state.loading,
  };
};

export default connect(mapDispatchToProps, { usersList })(LoginMenu);
