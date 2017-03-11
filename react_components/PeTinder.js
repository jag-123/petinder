import React from 'react';
import NavLink from './NavLink'
import Logout from './Logout'


// the wrapper for everything
export default React.createClass({
  getInitialState: function() {
    console.log('test');
    // default for logged out state
    return {
      username: null,
      name: null,
      userId: null
      // preferences needed
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
          //browserHistory.push("/userlogin");
      }.bind(this)
    });
  },
  // might need components to render for homepage... but this
  // is an idea for how it kinda might work...
  // anything rendered by this component shows up on EVERY PAGE
  render: function() {
    if (this.state.username){
      return (
        <div>
          <h1>What a Pig</h1>
          <ul role="nav">
            <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
            <li><NavLink to="/preferences">Set Preferences</NavLink></li>
            <li><NavLink to="/getpet">Pets</NavLink></li>
          </ul>
          <Logout/>
          <p>Welcome, {this.state.name}</p>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>
          <h1>What a Pig</h1>
          <p>Please <NavLink to="/userlogin">log in</NavLink> to get started</p>
          {this.props.children}
        </div>
      );
    }
  }
});
