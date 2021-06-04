import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../features/users/userSlice';
import LoginCard from './LoginCard';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const LoginMenu = (props) => {
  const dispatch = useDispatch();
  const handleGetUsers = async () => await dispatch(getUsers());

  useEffect(() => {
    handleGetUsers();
  }, []);

  const {
    users: {
      userList: { status, data },
    },
  } = useSelector((state) => state);

  const generateCards = () => {
    return data.map(({ attributes: { email, name, role, id } }) => {
      const capsRole = role.charAt(0).toUpperCase() + role.slice(1);
      return <LoginCard email={email} name={name} role={capsRole} key={id} />;
    });
  };

  const handleLoading = () => {
    if (status === 'loading') {
      return <Spinner animation="border" role="status" />;
    } else if (status === 'finished') {
      return generateCards();
    }
  };

  return (
    <Container fluid className="pt-3">
      <Row className="justify-content-md-center">
        <Col lg="6" md="8" sm="10" xs>
          {handleLoading()}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginMenu;
