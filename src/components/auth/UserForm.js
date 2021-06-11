import React from 'react';
import { signupUser, updateUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';

const UserForm = (props) => {
  const dispatch = useDispatch();
  const handleSignupUser = async (data) => await dispatch(signupUser(data));
  const handleUpdateUser = async (data) => {
    await dispatch(updateUser(data));
  };
  const mode = props.mode === 'edit' ? 'edit' : 'new';
  const history = useHistory();

  const initialValues =
    mode === 'edit'
      ? {
          email: props.editUser.email,
          name: props.editUser.name,
          role: props.editUser.role,
        }
      : {
          email: '',
          name: '',
          role: 'server',
        };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (mode === 'new') {
      handleSignupUser(data);
      history.push('/bottles');
    } else if (mode === 'edit') {
      data.user_id = props.editUser.id;
      handleUpdateUser(data);
    }
  };

  return (
    <Container className="pt-3" fluid>
      <Row className="justify-content-md-center">
        <Col xs md="8" sm="10" lg="6">
          {mode === 'new' ? <h1>Create a New User</h1> : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                type="email"
                defaultValue={initialValues.email}
                placeholder="email@domain.com"
                id="email"
                {...register('email', { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">Name:</Form.Label>
              <Form.Control
                type="text"
                defaultValue={initialValues.name}
                placeholder="Enter Name"
                id="name"
                {...register('name', { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="role">User Role:</Form.Label>
              <Form.Control
                as="select"
                defaultValue={initialValues.role}
                id="role"
                name="role"
                {...register('role', { required: true })}
              >
                <option value="server">Server</option>
                <option value="runner">Runner</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            {mode === 'new' ? (
              <Form.Group>
                <Form.Label htmlFor="password">Passcode:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Passcode"
                  id="password"
                  {...register('password', { required: true })}
                />
              </Form.Group>
            ) : null}
            <br />
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <br />
    </Container>
  );
};

export default withRouter(UserForm);
