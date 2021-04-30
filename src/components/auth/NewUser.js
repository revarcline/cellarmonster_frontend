import React from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth';
import { Form, Button, Container } from 'react-bootstrap';

class NewUser extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    role: 'server',
    errors: { status: { message: '' } },
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, name, role } = this.state;
    this.props
      .dispatchSignupUser({ email, password, name, role })
      .then(() => this.props.history.push('/'))
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <Container className="pt-3" fluid>
        <Form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="email@domain.com"
              name="email"
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              id="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="role">User Role:</Form.Label>
            <Form.Control
              as="select"
              id="role"
              name="role"
              value={this.state.role}
              onChange={this.handleChange}
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
              name="password"
              placeholder="Enter Passcode"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit" variant="primary" onSubmit={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupUser: (credentials) => dispatch(signupUser(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(NewUser);
