import React from 'react';

export default React.createClass({
	saveMatch: function(event) {
		event.preventDefault();
		// to do in the morning: 
		// * add this button to the getpet page
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