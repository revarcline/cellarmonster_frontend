import React from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../../actions/auth';
import { Spinner, Alert } from 'react-bootstrap';
import LoginMenu from './LoginMenu';

const withAuth = (WrappedComponent) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      this.props.dispatchCheckAuth();
    }

    render() {
      if (!this.props.authChecked) {
        return <Spinner animation="border" role="status" />;
      } else if (!this.props.loggedIn) {
        return (
          <>
            <Alert variant="primary">You must log in to use this feature.</Alert>
            <LoginMenu />
          </>
        );
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  }

  const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
    return { authChecked, loggedIn, currentUser };
  };

  const mapDispatchToProps = (dispatch) => {
    return { dispatchCheckAuth: () => dispatch(checkAuth()) };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

export default withAuth;
