/*
Form for logging in with a username and password.
*/
//Good commenting on this component! Maybe look into how login is implemented in the example that I mention in the "feedback.txt" file
import React from 'react';
import { Link, browserHistory } from 'react-router';

// component for logging in with local strategy
export default React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },
  // updates current state to value of username field
  updateNewUser: function (event) {
    this.setState({
      username: event.target.value
    });
  },
  // updates current state to value of password field
  updatePassword: function(event) {
    this.setState({
      password: event.target.value
    });
  },
  // makes a post request with submitted form data
  login: function(event) {
    event.preventDefault();
    var formData = {
      username: this.state.username,
      password: this.state.password
    }
    var getUser = this.props.getuser;
    $.post('/login', formData)
      .done(function(data) {
        //redirects to preferences page
        getUser();
        browserHistory.push("/preferences");
      })
      .error(function(err, status) {
        console.error(status);
      });
  },
	render: function() {
		return (
			<div>
        <form id="local-login" onSubmit={this.login} className="form-signin">
          <h2 className="form-signin-heading">Login with username and password</h2>
          <input className="form-control"
            placeholder="Username"
            type="text"
            value={this.state.username}
            onChange={this.updateNewUser}
          />
          <br/>
          <input className="form-control"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.updatePassword}
          />
          <br/>
          <button className="btn btn-lg btn-primary btn-block"
            type="submit"
            value="Login"
          >
          Login
          </button>
        </form>
			</div>
		);
	}
});
