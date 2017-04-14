/*
This component contains elements that should always be displayed when a user is logged in.
Both the title of the app and a navigation bar are rendered.
*/

//It's a little confusing as to how this component ties in by the name of the component, so I would name this something more specific to what it does
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
