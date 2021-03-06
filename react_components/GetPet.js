/*
The page where the Tinder functionality manifests itself. A pet, chosen based on the preferences the user has set, 
is displayed, and the user has the choice to either "swipe right" to save the pet to their matches or "swipe left"
to move on to the next pet without saving it. 
*/
import React from 'react';
import MatchButton from './MatchButton'
import NextButton from './NextButton'

var auth = require('../auth');
var key = auth.PETFINDER_APP_KEY;

// starting api request stuff
export default React.createClass({
  getInitialState: function() {
    // default states
    return {
      id: '',
      name: '',
      age: '',
      sex: '',
      size: '',
      image: 'http://simpleicon.com/wp-content/uploads/camera.png'
    }
  },
  getPreferences: function() {
    // pull out lists of preferences from the prefs property
    // assuming prefs is a one-element array

    return {
      animal: this.props.prefs[0].pet,
      size: this.props.prefs[0].size,
      sex: this.props.prefs[0].sex
    };
  },
  makeArgsString: function(argObj = {}) {
    // compiles all arguments and parameters into a string for the request
    // argObj: an object of keys and values that correspond to arguments
    // to be passed to the api. Both the keys and values must be strings
    //  example: {'animal': 'cat'}
    // the key is automatically prepended so this does not need to go into
    // the argObj

    var argsString = '&key=' + key;
    for (var k in argObj) {
      argsString += '&' + k + '=' + String(argObj[k]);
    }

    return argsString;
  },
  makeURL: function(func, argObj) {
    // creates a url for the api request that requests
    // a json formatted response
    // func: the api method. This is a string like 'pet.find'
    // argObj: an object of keys and values to be passed as arguments to
    // the request keys and values must all be strings

    var base = 'https://api.petfinder.com/' + func + '?format=json'
    var argsString = this.makeArgsString(argObj);
    return base + argsString + '&callback=?';
  },
  randomPet: function() {
    //takes user preferences and finids a random pet that satifies the preferences

    var getRandom = 'pet.getRandom';
    var argsGetRandom = {'location': '02492'}; // location doesn't seem to do anything

    for (var pref in this.getPreferences()) {
      if (this.getPreferences()[pref] !== undefined) {
        var prefsArr = this.getPreferences()[pref];
        // the api does not seem to take multiple options for an argument, so instead 
        // we just choose a random preference for each catagory instead
        argsGetRandom[pref] = prefsArr[Math.floor(Math.random()*prefsArr.length)];
      }
    }

    var getRandomUrl = this.makeURL(getRandom, argsGetRandom);
    $.ajax({
      // first request a random pet id
      url: getRandomUrl,
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
        this.setState({id: data.petfinder.petIds.id.$t});
        var getPet = 'pet.get';
        var argsGetPet = {
          id: this.state.id
        };
        var getPetUrl = this.makeURL(getPet, argsGetPet)

        $.ajax({
          // then get the pet's profile
          url: getPetUrl,
          type: 'GET',
          dataType: 'jsonp',
          crossDomain:true,
          success: function(data) {
            var base = data.petfinder.pet;
            if (base.media.photos !== undefined) {
              // if there is a picture list provided use the one in the middle
              // because it tends to be the right size
              var photo = base.media.photos.photo
              this.setState({
                // gets a picture that is pretty often the right size...
                image: photo[Math.floor((photo.length - 1) / 2)].$t
              });
            } else {
              // use the default image
              this.setState({
                image: this.getInitialState().image
              });
            }
            this.setState({
              age: base.age.$t,
              name: base.name.$t,
              animal: base.animal.$t,
              sex: base.sex.$t,
              size: base.size.$t
            });

          }.bind(this),
          error: function() { alert(':(')}.bind(this)
        })
      }.bind(this),
      error: function() { alert(':('); }.bind(this)
    });
  },
  componentWillMount: function() {
    // this loads the first pet on the page for the user
    this.randomPet();
  },
  render: function() {
    return (
      <div className="row content">
        <NextButton next={this.randomPet}/>
        <div className="col-sm-4 text-center">
          <h3>{this.state.name} {this.state.age} {this.state.sex}</h3>
          <img src={this.state.image} width="300"/>
        </div>
        <MatchButton next={this.randomPet} match={this.state} user={this.props.user}/>
      </div>
    )
  }
});
