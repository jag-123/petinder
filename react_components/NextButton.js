import React from 'react';

export default React.createClass({
	nextPet: function() {
		// skips to the next pet without saving a match
		this.props.next()
	},
	render: function() {
		return(
			<div>
				<input type="button" value="swipe left" onClick={this.nextPet}/>
			</div>
		);
	}
});