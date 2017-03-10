import React from 'react';

// component for registering as a new user
export default React.createClass({
  getInitialState: function() {
    return {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordMatch: false
    }
  },
  // updates current state to value of name field
  updateName: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  // updates current state to value of username field
  updateUsername: function(event) {
    this.setState({
      username: event.target.value
    });
  },
  // updates current state to value of password field
  updatePassword: function(event) {
    console.log(event.target.value);
    this.setState({
      password: event.target.value
    });
  },
  // updates current state to value of confirm password field
  // and determines whether or not the passwords match
  matchPasswords: function(event) {
    this.setState({
      confirmPassword: event.target.value
    });
    if (event.target.value == this.state.password) {
      console.log('they match!');
      this.setState({
        passwordMatch: true
      });
    } else {
      console.log('no match')
      this.setState({
        passwordMatch: false
      });
    }
  },
  register: function(event) {
    event.preventDefault();
    if (this.state.passwordMatch == false) {
      alert('Passwords do not match, please try again');
    } else if (this.state.name == '') {
      alert('A name for the account must be provided');
    } else if (this.state.username == '') {
      alert('A username must be provided');
    } else {
      var formData = {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password
        }

      $.post('/register', formData)
        .done(function(data) {
          console.log(data);
        })
        .error(function (err, status) {
          console.error(err, status);
        });
    }
  },
  render: function() {
    return (
      <div>
        <h2>Register an account</h2>
        <form id="register" onSubmit={this.register}>
          <p>Name: </p>
          <input
            type="text"
            value={this.state.name}
            onChange={this.updateName}
          />
          <p>Username: </p>
          <input
            type="text"
            value={this.state.username}
            onChange={this.updateUsername}
          />
          <p>Password: </p>
          <input
            type="password"
            value={this.state.password}
            onChange={this.updatePassword}
          />
          <p>Confirm Password: </p>
          <input
            type="password"
            value={this.state.confirmPassword}
            onChange={this.matchPasswords}
          />
          <input
            type="submit"
            value="Register"
          />
        </form>
      </div>
    )
  }
});