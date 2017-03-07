// the wrapper for everything
var PeTinder = React.createClass({
  getInitialState: function() {
    // default for logged out state
    return {
      username: null,
      name: null,
      userId: null
    };
  },
  // update state with user data if someone is logged in
  componentDidMount: function() {
    $.ajax({
      url: '/user',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
          console.log(data);
          this.setState({
              username: data.username,
              name: data.name,
              userId: data.id
          });
      }.bind(this),
      failure: function(xhr, status, err) {
          console.error('GET /user', status, err.toString());
      }.bind(this)
    });
  },
  // need to ask about how to update component to show username without refreshing
  // maybe componentWillUpdate?
  render: function() {
    return (
      <div>
        <h1>PeTinder</h1>
        <p>{this.state.name} {this.state.username}</p>
        <Logout/>
        <LoginLocal/>
        <LoginFacebook/>
        <RegisterNewUser/>
      </div>
    );
  }
});

// component for logging in with local strategy
var LoginLocal = React.createClass({
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
    // question: what do I do here? How do I display a different page in React?
    // Austin's answer: https://github.com/ReactTraining/react-router
    $.post('/login', formData)
      .done(function(data) {
        console.log(data);
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

// component for logging in with Facebook
var LoginFacebook = React.createClass({
  // nothing currently needs to be in the state
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div>
        <h2>Login with Facebook</h2>
        <form action="/auth/facebook">
        <input
          type="submit"
          value="Login"
        />
        </form>
      </div>
    );
  }
});

// component for registering as a new user
var RegisterNewUser = React.createClass({
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

// component for logging user out 
var Logout = React.createClass({
  getInitialState: function() {
    return {}
  },
  // I don't know if any information has to be logged here, 
  // but it's ok for testing for now
  logout: function(event) {
    event.preventDefault;
    
    $.get('/logout/')
      .done(function(data) {
        console.log(data)
      })
      .error(function(xhr, status, err) {
        console.error('GET /home', status, err.toString());
      });
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.logout}>
          <input
            type="submit"
            value="Logout"
          />
        </form>
      </div>
    )
  }
});
ReactDOM.render(
  <PeTinder />,
  document.getElementById('content')
);
