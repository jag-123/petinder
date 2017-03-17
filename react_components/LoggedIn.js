/*
This component contains elements that should always be displayed when a user is logged in.
Both the title of the app and a navigation bar are rendered.
*/

import React from 'react';
import NavLink from './NavLink'
import Logout from './Logout'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

export default React.createClass({
	render: function() {
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
			</div>
		);
	}
});