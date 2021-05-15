import React, { useEffect } from 'react';
import { signupUser } from '../../actions/auth';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UserForm = (props) => {
  useEffect(() => console.log(props));

  const initialValues =
    props.mode === 'edit'
      ? {
          email: props.editUser.email,
          password: '',
          name: props.editUser.name,
          role: props.editUser.role,
        }
      : {
          email: '',
          password: '',
          name: '',
          role: 'server',
        };

  const { register, handleSubmit, errors } = useForm({ initialValues });

  const onSubmit = (data) => {
    if (props.mode === 'new') {
      console.log('new action}');
    } else if (props.mode === 'edit') {
      console.log('update action');
    }
    console.log(JSON.stringify(data));
  };

  return (
    <Container className="pt-3" fluid>
      <Row className="justify-content-md-center">
        <Col xs md="8" sm="10" lg="6">
          {props.mode === 'new' ? <h1>Create a New User</h1> : null}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@domain.com"
                id="email"
                {...register('email', { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                id="name"
                {...register('name', { required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="role">User Role:</Form.Label>
              <Form.Control
                as="select"
                id="role"
                name="role"
                {...register('role', { required: true })}
              >
                <option value="server">Server</option>
                <option value="runner">Runner</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Passcode:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Passcode"
                id="password"
                {...register('password', { required: true })}
              />
            </Form.Group>
            <br />

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
