/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	// the wrapper for everything
	var PeTinder = React.createClass({
	  displayName: 'PeTinder',

	  getInitialState: function getInitialState() {
	    // default for logged out state
	    return {
	      username: null,
	      name: null,
	      userId: null
	    };
	  },
	  // update state with user data if someone is logged in
	  componentDidMount: function componentDidMount() {
	    $.ajax({
	      url: '/user',
	      dataType: 'json',
	      cache: false,
	      type: 'GET',
	      success: function (data) {
	        console.log(data);
	        this.setState({
	          username: data.username,
	          name: data.name,
	          userId: data.id
	        });
	      }.bind(this),
	      failure: function (xhr, status, err) {
	        console.error('GET /user', status, err.toString());
	      }.bind(this)
	    });
	  },
	  // need to ask about how to update component to show username without refreshing
	  // maybe componentWillUpdate?
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'PeTinder'
	      ),
	      React.createElement(
	        'p',
	        null,
	        this.state.name,
	        ' ',
	        this.state.username
	      ),
	      React.createElement(Logout, null),
	      React.createElement(LoginLocal, null),
	      React.createElement(LoginFacebook, null),
	      React.createElement(RegisterNewUser, null)
	    );
	  }
	});

	// component for logging in with local strategy
	var LoginLocal = React.createClass({
	  displayName: 'LoginLocal',

	  getInitialState: function getInitialState() {
	    return {
	      username: '',
	      password: ''
	    };
	  },
	  // updates current state to value of username field
	  updateNewUser: function updateNewUser(event) {
	    this.setState({
	      username: event.target.value
	    });
	  },
	  // updates current state to value of password field
	  updatePassword: function updatePassword(event) {
	    this.setState({
	      password: event.target.value
	    });
	  },
	  // makes a post request with submitted form data
	  login: function login(event) {
	    event.preventDefault();
	    var formData = {
	      username: this.state.username,
	      password: this.state.password
	    };
	    // question: what do I do here? How do I display a different page in React?
	    // Austin's answer: https://github.com/ReactTraining/react-router
	    $.post('/login', formData).done(function (data) {
	      console.log(data);
	    }).error(function (err, status) {
	      console.error(status);
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Login with username and password'
	      ),
	      React.createElement(
	        'form',
	        { id: 'local-login', onSubmit: this.login },
	        React.createElement(
	          'p',
	          null,
	          'Username: '
	        ),
	        React.createElement('input', {
	          type: 'text',
	          value: this.state.username,
	          onChange: this.updateNewUser
	        }),
	        React.createElement('br', null),
	        React.createElement(
	          'p',
	          null,
	          'Password: '
	        ),
	        React.createElement('input', {
	          type: 'password',
	          value: this.state.password,
	          onChange: this.updatePassword
	        }),
	        React.createElement('input', {
	          type: 'submit',
	          value: 'Login'
	        })
	      )
	    );
	  }
	});

	// component for logging in with Facebook
	var LoginFacebook = React.createClass({
	  displayName: 'LoginFacebook',

	  // nothing currently needs to be in the state
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Login with Facebook'
	      ),
	      React.createElement(
	        'form',
	        { action: '/auth/facebook' },
	        React.createElement('input', {
	          type: 'submit',
	          value: 'Login'
	        })
	      )
	    );
	  }
	});

	// component for registering as a new user
	var RegisterNewUser = React.createClass({
	  displayName: 'RegisterNewUser',

	  getInitialState: function getInitialState() {
	    return {
	      name: '',
	      username: '',
	      password: '',
	      confirmPassword: '',
	      passwordMatch: false
	    };
	  },
	  // updates current state to value of name field
	  updateName: function updateName(event) {
	    this.setState({
	      name: event.target.value
	    });
	  },
	  // updates current state to value of username field
	  updateUsername: function updateUsername(event) {
	    this.setState({
	      username: event.target.value
	    });
	  },
	  // updates current state to value of password field
	  updatePassword: function updatePassword(event) {
	    console.log(event.target.value);
	    this.setState({
	      password: event.target.value
	    });
	  },
	  // updates current state to value of confirm password field
	  // and determines whether or not the passwords match
	  matchPasswords: function matchPasswords(event) {
	    this.setState({
	      confirmPassword: event.target.value
	    });
	    if (event.target.value == this.state.password) {
	      console.log('they match!');
	      this.setState({
	        passwordMatch: true
	      });
	    } else {
	      console.log('no match');
	      this.setState({
	        passwordMatch: false
	      });
	    }
	  },
	  register: function register(event) {
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
	      };

	      $.post('/register', formData).done(function (data) {
	        console.log(data);
	      }).error(function (err, status) {
	        console.error(err, status);
	      });
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Register an account'
	      ),
	      React.createElement(
	        'form',
	        { id: 'register', onSubmit: this.register },
	        React.createElement(
	          'p',
	          null,
	          'Name: '
	        ),
	        React.createElement('input', {
	          type: 'text',
	          value: this.state.name,
	          onChange: this.updateName
	        }),
	        React.createElement(
	          'p',
	          null,
	          'Username: '
	        ),
	        React.createElement('input', {
	          type: 'text',
	          value: this.state.username,
	          onChange: this.updateUsername
	        }),
	        React.createElement(
	          'p',
	          null,
	          'Password: '
	        ),
	        React.createElement('input', {
	          type: 'password',
	          value: this.state.password,
	          onChange: this.updatePassword
	        }),
	        React.createElement(
	          'p',
	          null,
	          'Confirm Password: '
	        ),
	        React.createElement('input', {
	          type: 'password',
	          value: this.state.confirmPassword,
	          onChange: this.matchPasswords
	        }),
	        React.createElement('input', {
	          type: 'submit',
	          value: 'Register'
	        })
	      )
	    );
	  }
	});

	// component for logging user out 
	var Logout = React.createClass({
	  displayName: 'Logout',

	  getInitialState: function getInitialState() {
	    return {};
	  },
	  // I don't know if any information has to be logged here, 
	  // but it's ok for testing for now
	  logout: function logout(event) {
	    event.preventDefault;

	    $.get('/logout/').done(function (data) {
	      console.log(data);
	    }).error(function (xhr, status, err) {
	      console.error('GET /home', status, err.toString());
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'form',
	        { onSubmit: this.logout },
	        React.createElement('input', {
	          type: 'submit',
	          value: 'Logout'
	        })
	      )
	    );
	  }
	});
	ReactDOM.render(React.createElement(PeTinder, null), document.getElementById('content'));

/***/ }
/******/ ]);