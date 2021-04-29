import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/auth';

class NewUser extends React.Component {
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, name, type } = this.state;
    this.props
      .dispatchSignupUser({ email, password, name, type })
      .then(() => this.props.history.push('/'))
      .catch((errors) => this.setState({ errors }));
  };

  return;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupUser: (credentials) => dispatch(signupUser(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(NewUser);
