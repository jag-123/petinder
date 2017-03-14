import React from 'react';
var auth = require('../auth');
var key = auth.PETFINDER_APP_KEY;

export default React.createClass({
  getInitialState: function() {
    // default states
    return {
      alldata: {
        pets: [
        ]
      }
    }
  },
  componentWillMount: function(event) {
    $.ajax({
      url: '/showmatches',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
        console.log(data, '/showmatches');
        this.setState({
            alldata: {
              pets:data.pets
            }
        });
      }.bind(this),
      error: function() { alert(':(')}.bind(this)
    });
  },
  render: function() {
    var allPets = this.state.alldata.pets;
    console.log(allPets);
    // this next line creates an error, b/c it is undefined after getInitialState
    // console.log(allPets[0]);
    if (!allPets[0]){
     return <div>loading</div>
   } else {
     var petComponents = allPets.map(function(pet) {
        return <div>{pet.name}</div>;
    });
    return <div>{petComponents}</div>;
   }
 }
})
