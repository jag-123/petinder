/*
The wrapper component for the app. It will either render a page with a navigation bar and a component
associated with the current route if the user is logged in, or a login screen if no user is logged in.
*/

import React from 'react';
import NavLink from './NavLink'
import Logout from './Logout'
import Login from './Login'
import LoggedIn from './LoggedIn'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

// the wrapper for everything
export default React.createClass({
  getInitialState: function() {
    // default for logged out state
    return {
      username: null,
      name: null,
      userId: null,
      userPrefs: []
    };
  },
  getUser: function() {
    $.ajax({
      url: '/user',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
          this.setState({
              username: data.username,
              name: data.name,
              userId: data.id,
              userPrefs: data.preferences
          });
      }.bind(this),
      failure: function(xhr, status, err) {
          console.error('GET /user', status, err.toString());
          //browserHistory.push("/userlogin");
      }.bind(this)
    });
  },
  componentWillMount: function() {
    this.getUser();
  },
  handlePrefChange: function(prefs) {
    this.setState({
      userPrefs: prefs
    });
  },
  // might need components to render for homepage... but this
  // is an idea for how it kinda might work...
  // anything rendered by this component shows up on EVERY PAGE
  render: function() {
    if (this.state.username !== null){
      return (
        <div>
          <LoggedIn/>
          { React.cloneElement(this.props.children, {
              user:this.state.userId,
              username: this.state.username,
              prefs:this.state.userPrefs,
              getuser:this.getUser,
              prefhandler:this.handlePrefChange
            })
          }
        </div>
      );
    } else {
      return (
        <div className='row'>
          <div className='text-center'>
            <h1>What a Pig</h1>
            <h3>Log in to get started</h3>
          </div>
          <Login getuser={this.getUser}/>
        </div>
      );
    }
  }
});
