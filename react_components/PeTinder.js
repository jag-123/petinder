import React from 'react';
import NavLink from './NavLink'
import Logout from './Logout'
import Login from './Login'
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
    console.log(this, 'render');
    if (this.state.username !== null){
      console.log(this.props, "props of PeTinder");
      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a>What a Pig</a>
              </Navbar.Brand>
            </Navbar.Header>
              <Nav>
                <NavItem><NavLink to="/" onlyActiveOnIndex>Home</NavLink></NavItem>
                <NavItem><NavLink to="/preferences">Set Preferences</NavLink></NavItem>
                <NavItem><NavLink to="/getpet">Pets</NavLink></NavItem>
                <NavItem><NavLink to="/matches">Matches</NavLink></NavItem>
                <Navbar.Form pullRight><Logout/></Navbar.Form>
              </Nav>
          </Navbar>
          <p>{console.log(this.props.children, 'children')}</p>
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
        <div>
          <h1>What a Pig</h1>
          <h3>Log in to get started</h3>
          <Login getuser={this.getUser}/>
        </div>
      );
    }
  }
});
