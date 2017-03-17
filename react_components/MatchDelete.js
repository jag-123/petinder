/* 
removes a pet from Matches page
*/
import React from 'react';

export default React.createClass({
	onError: function(err, status) {
		console.error(status);
	},
  deleteMatch: function(event){
    console.log(this.state);
    console.log(this.props);
    // event.preventDefault();
    //
    // var matchData = {
    // }
    //
    // $.post('/match', matchData)
    // 	.done()
    // 	.error(this.onError);
  },
	render: function() {
		return(
			<div className="text-center">
				<button className="slide slide-delete" type="button" value="Delete Match" onClick={this.deleteMatch}>Delete</button>
			</div>
		);
	}
});
