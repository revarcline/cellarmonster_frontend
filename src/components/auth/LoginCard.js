import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Card, Form, Button, Collapse, Container } from 'react-bootstrap';

class LoginCard extends React.Component {
  state = {
    email: this.props.email,
    password: '',
    open: false,
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
      .then(() => this.props.history.push('/bottles'))
      .catch(() => this.setState({ error: true }));
  };

  setOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <Container fluid className="pt-3">
        <Card body>
          <div onClick={this.setOpen} aria-controls="collapse-form">
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Subtitle>{this.props.role}</Card.Subtitle>
          </div>
          <Collapse in={this.state.open}>
            <Form onSubmit={this.handleSubmit} id="collapse-form" inline>
              <Form.Label htmlFor="password" sronly="true">
                Passcode
              </Form.Label>
              <Form.Control
                className="mb-2 mr-sm-2"
                id="password"
                type="password"
                placeholder="Passcode"
                name="password"
                onChange={this.handleChange}
              />
              <Button type="submit" className="mb-2">
                Log In
              </Button>
            </Form>
          </Collapse>
        </Card>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginUser: (credentials) => dispatch(loginUser(credentials)),
  };
};
export default connect(null, mapDispatchToProps)(LoginCard);
