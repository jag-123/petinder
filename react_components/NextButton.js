/*
The 'swipe left' button. This button allows the user to skip to the next pet without saving it as a match
*/
import React from 'react';

export default React.createClass({
	nextPet: function() {
		// skips to the next pet without saving a match
		this.props.next()
	},
	render: function() {
		return(
			<div className="col-sm-4 text-right sidenav">
				<button 
				className="slide slide-left" 
				type="button" value="swipe left" 
				onClick={this.nextPet}
				>&nbsp;</button>
			</div>
		);
	}
});