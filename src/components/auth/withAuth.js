import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../features/auth/authSlice';
import { Spinner, Alert } from 'react-bootstrap';
import LoginMenu from './LoginMenu';

const withAuth = (WrappedComponent, role, extraProps) => {
  const Wrapper = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      handleCheckAuth();
    }, []);

    const {
      auth: {
        authentication: { authChecked, loggedIn },
      },
    } = useSelector((state) => state);

    const handleCheckAuth = () => dispatch(checkAuth());

    if (!authChecked) {
      return <Spinner animation="border" role="status" />;
    } else if (!loggedIn) {
      return (
        <>
          <Alert variant="primary">You must log in to use this feature.</Alert>
          <LoginMenu />
        </>
      );
    } else {
      return <WrappedComponent {...props} {...extraProps} />;
    }
  };

  return Wrapper;
};

export default withAuth;
