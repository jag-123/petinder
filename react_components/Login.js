/*
The component that is displayed when a user is not logged in. The two options for
logging in are using a username and password (local strategy) or using facebook.
If a new user wishes to log in with a username and password, they must first
register using the register form. 
*/

import React from 'react'
import LoginLocal from './LoginLocal'
import LoginFacebook from './LoginFacebook'
import RegisterNewUser from './RegisterNewUser'
export default React.createClass({
	render: function() {
		return(
			<div className="wrapper">
				<LoginLocal getuser={this.props.getuser}/>
				<br/>
				<LoginFacebook/>
				<br/>
				<br/>
				<RegisterNewUser/>
			</div>
		)
	}
})
