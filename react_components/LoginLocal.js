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
        // this.props.login();
        // console.log(this.props, 'login')
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
        <h2>Login with username and password</h2>
        <form id="local-login" onSubmit={this.login}>
          <p>Username: </p>
          <input
            type="text"
            value={this.state.username}
            onChange={this.updateNewUser}
          />
          <br/>
          <p>Password: </p>
          <input
            type="password"
            value={this.state.password}
            onChange={this.updatePassword}
          />
          <input
            type="submit"
            value="Login"
          />
        </form>
			</div>
		);
	}
});
