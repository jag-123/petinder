import React from 'react';

export default React.createClass({
	render: function() {
		return (
			<div>
				<p>Please <NavLink to="/userlogin">log in</NavLink> to get started</p>
			</div>
		);
	}
});