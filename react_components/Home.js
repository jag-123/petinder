import React from 'react';

export default React.createClass({
	render: function() {
		return(
			<div className="row">
				<div className='text-center'>
					<p>Welcome, {this.props.username}</p>
				</div>
			</div>
		);
	}
});