import React from 'react';

export default React.createClass({
	render: function() {
		return(
			<div>
				<p>Welcome, {this.props.username}</p>
			</div>
		);
	}
});