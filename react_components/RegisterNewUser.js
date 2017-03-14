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
        <form className="form-signin" id="register" onSubmit={this.register}>
          <h2 className="form-signin-heading">Register an account</h2>
          <input className="form-control"
            placeholder="Name"
            type="text"
            value={this.state.name}
            onChange={this.updateName}
          />
          <br/>
          <input className="form-control"
            placeholder="Username"
            type="text"
            value={this.state.username}
            onChange={this.updateUsername}
          />
          <br/>
          <input className="form-control"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.updatePassword}
          />
          <br/>
          <input className="form-control"
            placeholder="Confirm Password"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.matchPasswords}
          />
          <br/>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            value="Register"
          >Register</button>
        </form>
      </div>
    )
  }
});
