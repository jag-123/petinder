import React from 'react'
import LoginLocal from './LoginLocal'
import LoginFacebook from './LoginFacebook'
import RegisterNewUser from './RegisterNewUser'
export default React.createClass({
	render: function() {
		return(
			<div>
				<LoginLocal/>
				<LoginFacebook/>
				<RegisterNewUser/>
			</div>
		)
	}
})