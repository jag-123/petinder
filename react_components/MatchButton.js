// the "swipe right" button. If this one is pressed, the match is saved in the pet and user databases.

import React from 'react';

export default React.createClass({
	onError: function(err, status) {
		console.error(status);
	},
	saveMatch: function(event) {
		// save the pet in the database, save the user
		// in the pet's matches, save the pet in the 
		// user's matches
		event.preventDefault();

		var matchData = {
			user: this.props.user, // user _id
			// characteristics to save in the pet database
			petId: this.props.match.id, // petfinder id
			name: this.props.match.name,
			age: this.props.match.age,	
			sex: this.props.match.sex,
			size: this.props.match.size
		}

		$.post('/match', matchData)
			.done(this.props.next()) //next is randomPet from the GetPet component
			.error(this.onError);
	},
	render: function() {
		return(
			<div>
				<input type="button" value="swipe right" onClick={this.saveMatch}/>
			</div>
		);
	}
});