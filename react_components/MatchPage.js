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

    if (!allPets[0]){
     return <div>loading</div>
   } else {
     var petComponents = allPets.map(function(pet) {
        return <div>
          <h3>{pet.name} {pet.age} {pet.sex}</h3>
          <img src={pet.image} width="300"/>
        </div>;
    });
    return <div>{petComponents}</div>;
   }
 }
})
