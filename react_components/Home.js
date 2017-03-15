import React from 'react';

export default React.createClass({
	render: function() {
		return(
			<div className="col-lg-8">
				<div className='text-center'>
					<p>Welcome, {this.props.username}</p>
				</div>
			</div>
		);
	}
});