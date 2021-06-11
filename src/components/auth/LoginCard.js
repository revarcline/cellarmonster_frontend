import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
//import { loginUser } from '../../features/auth/authSlice';
import { loginUser } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import { Card, Form, Button, Collapse, Container, InputGroup } from 'react-bootstrap';

const LoginCard = (props) => {
  const dispatch = useDispatch();

  const [openCard, setOpenCard] = useState(false);

  const handleLoginUser = async (credentials) => await dispatch(loginUser(credentials));

  const { register, handleSubmit } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();
    const sendData = { ...data, email: props.email };
    handleLoginUser(sendData).then(() => props.history.push('/bottles'));
  };

  return (
    <Container fluid className="pt-3">
      <Card body>
        <div onClick={() => setOpenCard(!openCard)} aria-controls="collapse-form">
          <Card.Title>{props.name}</Card.Title>
          <Card.Subtitle>{props.role}</Card.Subtitle>
        </div>
        <Collapse in={openCard}>
          <Form onSubmit={handleSubmit(onSubmit)} id="collapse-form" inline>
            <InputGroup>
              <Form.Control
                className="mb-2 mr-sm-2"
                id="password"
                type="password"
                placeholder="Passcode"
                name="password"
                {...register('password', { required: true })}
              />
              <InputGroup.Append>
                <Button type="submit" className="mb-2">
                  Log In
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Collapse>
      </Card>
    </Container>
  );
};

export default withRouter(LoginCard);
