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

//Preferences include animal, breed, size, sex, location
class Preferences extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pet: []
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		const { checked, value } = e.target;
		let { pet } = this.state;
		if(checked && pet.indexOf(value) === -1) {
			pet.push(value);
		}else {
			pet = pet.filter(i => i !== value)
		}
		this.setState({
			pet
		});
	}
	render() {
		const { pet } = this.state;
		return (
			<div className='container'>
				<h3>Choose your pets:</h3>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Cat'
						checked={pet.indexOf('Cat') !== -1}
						onChange={this.handleChange} />
					Cat
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Dog'
						checked={pet.indexOf('Dog') !== -1}
						onChange={this.handleChange} />
					Dog
				</label>
				</div>

				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Barnyard'
						checked={pet.indexOf('Barnyard') !== -1}
						onChange={this.handleChange} />
					Barnyard
				</label>
				</div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Bird'
            checked={pet.indexOf('Bird') !== -1}
            onChange={this.handleChange} />
          Bird
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Horse'
            checked={pet.indexOf('Horse') !== -1}
            onChange={this.handleChange} />
          Horse
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Pig'
            checked={pet.indexOf('Pig') !== -1}
            onChange={this.handleChange} />
          Pig
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Reptile'
            checked={pet.indexOf('Reptile') !== -1}
            onChange={this.handleChange} />
          Reptile
        </label>
        </div>

        <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value='Smallfurry'
            checked={pet.indexOf('Smallfurry') !== -1}
            onChange={this.handleChange} />
          Smallfurry
        </label>
        </div>

				<br />
				Your Pets: {pet.join(', ')}
			</div>
		)
	}
}

ReactDOM.render(<Preferences />, document.getElementById('preferences'));

var MasterSelect = React.createClass({
    setMasterpieces: function(e) {
      this.setState({
        masterpieces: e.target.value
      });
    },
    setMasterpiece: function(e) {
      this.setState({
        masterpiece: e.target.value
      });
    },

    getInitialState: function() {
      return {
        masterpieces: 0,
        masterpiece: 0
      }
    },

    render: function() {
      var breeds = [
        'breed1',
        'breed2',
      ],
      size = [
        'small',
        'large',
      ],
      sex = [
        'M',
        'F',
      ],
      masters = [
        'Default value ',
        'Breed ',
        'Size ',
        'Sex ',
      ],
      masterpieces = [
        [], breeds, size, sex
      ],
      oMasters = masters.map(function(option, i) {
        return <option value={i}>{option}</option>
      }),
      oMasterpieces = masterpieces[this.state.masterpieces].map(function(option, i) {
        return <option value={i}>{option}</option>
      });

      return (
        <div>
          <select onChange={ this.setMasterpieces }>
            { oMasters }
          </select>
          {
            oMasterpieces && oMasterpieces.length ?
            <span>
              <select onChange={ this.setMasterpiece } >
                { oMasterpieces }
              </select>
              <div className="gap">
                { masters[this.state.masterpieces] } makes { masterpieces[this.state.masterpieces][this.state.masterpiece] }
              </div>
            </span>
            : ''
          }

        </div>
      )
    }
  });

ReactDOM.render(<MasterSelect />, document.getElementById('test'));
