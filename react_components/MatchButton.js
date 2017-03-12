import React from 'react';

export default React.createClass({
	onSuccess: function(data) {
		console.log(data);
	},
	onError: function(err, status) {
		console.error(status);
	},
	saveMatch: function(event) {
		event.preventDefault();
		alert(JSON.stringify(this.props.match.size));

		var matchData = {
			user: this.props.user, // user _id
			petId: this.props.match.id, // petfinder id
			name: this.props.match.name,
			age: this.props.match.age,
			sex: this.props.match.sex,
			size: this.props.match.size
		}

		$.post('/match', matchData)
			.done(this.onSuccess)
			.error(this.onError);
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