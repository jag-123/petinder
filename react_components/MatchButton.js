import React from 'react';

export default React.createClass({
	saveMatch: function(event) {
		event.preventDefault();
		// to do in the morning: 
		// * make a route to create a new pet in database
		// * make a route to add match to list of matches in 
		// user database
		// * use the randomPet function (passed as next in props)
	},
	render: function() {
		return(
			<div>
				<input type="button" value="clickme" onClick={this.saveMatch}/>
			</div>
		);
	}
});