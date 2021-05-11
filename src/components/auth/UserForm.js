import React from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class UserForm extends React.Component {
  state =
    this.props.mode === 'new'
      ? {
          email: '',
          password: '',
          name: '',
          role: 'server',
        }
      : {
          email: this.props.editUser.email,
          password: '',
          name: this.props.editUser.name,
          role: this.props.editUser.role,
        };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.mode === 'new') {
      const { email, password, name, role } = this.state;
      this.props
        .dispatchSignupUser({ email, password, name, role })
        .then(() => this.props.history.push('/'))
        .catch((errors) => this.setState({ errors }));
    } else if (this.props.mode === 'edit') {
      const { email, password, name, role } = this.state;
      this.props
        .dispatchUpdateUser({ email, password, name, role })
        .catch((errors) => this.setState({ errors }));
    }
  };

  render() {
    return (
      <Container className="pt-3" fluid>
        <Row className="justify-content-md-center">
          <Col xs md="8" sm="10" lg="6">
            <Form onSubmit={this.handleSubmit}>
              {this.props.mode === 'new' ? <h1>Create a New User</h1> : null}
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
              <br />

              <Button type="submit" variant="primary" onSubmit={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  // get user for edit
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupUser: (credentials) => dispatch(signupUser(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
