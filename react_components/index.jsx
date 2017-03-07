var HelloWorld = React.createClass({
  
  getInitialState: function() {
    return {
      h1Text: '',
      username: null,
      userId: null
    };
  },

  usernameHandler: function(userData) {
    this.setState({
      username: userData.username
    });
  },

  componentDidMount: function() {
  //   $.ajax({
  //     url: '/api/',
  //     dataType: 'json',
  //     cache: false,
  //     type: 'GET',
  //     success: function(data) {
  // //data from res.json in routes/index.js is {text: "HelloWorld"}, so we want to access the text field of data
  //         this.setState({
  //             h1Text: data.text
  //         });
  //         console.log('ok');
  //     }.bind(this),
  //     failure: function(xhr, status, err) {
  //         console.error('GET /api', status, err.toString());
  //     }.bind(this)
  //   });
  },

  render: function() {
    return (
      <div>
        <h1>PeTinder</h1>
        <LoginLocal username={this.usernameHandler} user={this.state.user}/>
        <LoginFacebook/>
        <RegisterNewUser/>
      </div>
    );
  }
});

var LoginLocal = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },
  updateNewUser: function (event) {
    // this makes sure that whatever is typed in the username box
    // is what our current user state is
    this.setState({
      username: event.target.value
    });
  },
  updatePassword: function(event) {
    this.setState({
      password: event.target.value
    });
  },
  login: function(event) {
    event.preventDefault();
    var formData = {
      username: this.state.username,
      password: this.state.password
    }
    // question: what do I do here? How do I display a different page in React?
    $.post('api/login/', formData)
      .done()
      .error();
  },
  componentDidMount: function () {
  //   $.ajax({
  //     url: '/api/login/',
  //     dataType: 'json',
  //     cache: false,
  //     type: 'GET',
  //     success: function(data) {
  // //data from res.json in routes/index.js is {text: "HelloWorld"}, so we want to access the text field of data
  //         this.setState({
  //             placeholder: data.text
  //         });
  //     }.bind(this),
  //     failure: function(xhr, status, err) {
  //         console.error('GET /api/login', status, err.toString());
  //     }.bind(this)
    // });
  },
  // question: is a form the right way to do this or should I use a regular button with onClick b/c
  // state is being updated?
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

var LoginFacebook = React.createClass({
  getInitialState: function() {
    return {

    }
  },
  login: function(event) {
    event.preventDefault();

    alert('facebook');
  },
  render: function() {
    return (
      <div>
        <h2>Login with Facebook</h2>
        <input
          type="button"
          value="Login"
          onClick={this.login}
        />
      </div>
    );
  }
});

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
  updateName: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  updateUsername: function(event) {
    this.setState({
      username: event.target.value
    });
  },
  updatePassword: function(event) {
    console.log(event.target.value);
    this.setState({
      password: event.target.value
    });
  },
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
    alert(this.state.name)
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

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('content')
);
