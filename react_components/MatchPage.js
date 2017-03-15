import React from 'react';
import MatchDelete from './MatchDelete';
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
  componentDidMount: function(event) {
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
     return <div>Save some pets</div>
   } else {
     var petComponents = allPets.map(function(pet) {
        return <div  className="col-lg-3 col-md-4 col-xs-6 thumb" key={pet._id}>
          <h3 className="text-center">{pet.name} {pet.age} {pet.sex}</h3>
          <img src={pet.image} width="300" height="200"/>
          <MatchDelete/>
        </div>;
    });
    return <div className="row">{petComponents}</div>;
   }
 }
})
