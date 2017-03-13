import React from 'react';
import NavLink from './NavLink'
import Logout from './Logout'
import Login from './Login'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

// Ariana's to do in morning:
// * figure out how to handle displays when user is/isn't logged in
// (it's funky now)
// * comb through code for consistency and clarity (comments!!!)
// * split up larger chunks into separate components
// * sort components into subfolders and make sure paths are updated
// idea: maybe ONLY show a log in link (or something nicer looking) if
// the user has not logged in yet

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
          console.log(this.state.username, "state")
          this.render;
      }.bind(this),
      failure: function(xhr, status, err) {
          console.error('GET /user', status, err.toString());
          //browserHistory.push("/userlogin");
      }.bind(this)
    });
    console.log('user got', this.state.userPrefs);
  },
  handlePrefChange: function(prefs) {
    console.log(prefs, 'prefs');
    this.setState({
      userPrefs: prefs
    });
  },
  // update state with user data if someone is logged in
  componentDidMount: function() {
    this.getUser();
    console.log(this.state.userPrefs, mounted)
  },
  componentWillUpdate: function() {
    console.log(this.state.userPrefs[0], "will update")
  },
  // might need components to render for homepage... but this
  // is an idea for how it kinda might work...
  // anything rendered by this component shows up on EVERY PAGE
  render: function() {
    if (this.state.username){
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
          <p>Welcome, {this.state.username}</p>
          <p>{this.props.userId}</p>
          {React.cloneElement(this.props.children, {
            user:this.state.userId, 
            prefs:this.state.userPrefs, 
            getuser:this.getUser,
            prefhandler:this.handlePrefChange
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h1>What a Pig</h1>
          <h3>Log in to get started</h3>
          <p>{this.state.userId}</p>
          <Login getuser={this.getUser}/>
        </div>
      );
    }
  }
});
