import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Card, Form, Button } from 'react-bootstrap';

class LoginCard extends React.Component {
  state = {
    email: this.props.email,
    password: '',
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props
      .dispatchLoginUser({ email, password })
      .then(() => this.props.history.push('/'))
      .catch(() => this.setState({ error: true }));
  };

  render() {
    return (
      <Card body>
        <Card.Title></Card.Title>
        <Card.Subtitle></Card.Subtitle>
        <Form>
          <Form.Group>
            <Form.Label>Passcode</Form.Label>
            <Form.Control
              type="password"
              placeholder="Passcode"
              name="password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit">Log In</Button>
        </Form>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginUser: (credentials) => dispatch(loginUser(credentials)),
  };
};
export default connect(null, mapDispatchToProps)(LoginCard);
