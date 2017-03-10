import React from 'react';

var md5 = require('md5'); // for hashing api signatures
var auth = require('../auth');
var secret = auth.PETFINDER_APP_SECRET;
var key = auth.PETFINDER_APP_KEY;

// starting api request stuff
export default React.createClass({
  getInitialState: function() {
    return {
      id: '',
      image: 'http://simpleicon.com/wp-content/uploads/camera.png',
      name: 'Press the button to get started'
    }
  },
  getPreferences: function() {
    return {
      animal: this.props.route.animal,
      breed: this.props.route.breed,
      size: this.props.route.size,
      sex: this.props.route.sex
    };
  },
  makeSignature: function(argsString) {
    var sig = md5(secret + argsString);
    return "&sig=" + sig;
  },
  makeArgsString: function(argObj = {}) {
    var argsString = '&key=' + key;
    for (var k in argObj) {
      argsString += '&' + k + '=' + String(argObj[k]);
    }

    return argsString;
  },
  makeURL: function(func, argObj) {
    var base = 'http://api.petfinder.com/' + func + '?format=json'
    var argsString = this.makeArgsString(argObj);
    // var signature = this.makeSignature(argsString);
    return base + argsString + '&callback=?';
  },
  randomPet: function() {
    console.log(this.getPreferences())
    // having trouble with CORS so no GET request written yet
    // making url to request random pet id #
    var getRandom = 'pet.getRandom';
    var argsGetRandom = {'location': '02492'};
    for (var pref in this.getPreferences()) {
      if (this.getPreferences()[pref] !== undefined) {
        argsGetRandom[pref] = this.getPreferences()[pref];
      }
    }

    // making url to request pet with this id number
    var getPet = 'pet.get';
    var argsGetPet = {id: '37235293'} // obtained from request

    var getRandomUrl = this.makeURL(getRandom, argsGetRandom)
    console.log(getRandomUrl, 'raandom pet id');
    var getPetUrl = this.makeURL(getPet, argsGetPet)
    $.ajax({
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
          url: getPetUrl,
          type: 'GET',
          dataType: 'jsonp',
          crossDomain:true,
          success: function(data) {
            var base = data.petfinder.pet;
            if (base.media) {
              var photo = base.media.photos.photo
              this.setState({
                image: photo[Math.floor((photo.length - 1) / 2)].$t
              });
            } else {
              this.setState({
                image: this.getInitialState().image
              });
            }
            console.log(base);
            this.setState({
              age: base.age.$t,
              name: base.name.$t,
              animal: base.animal.$t,
              sex: base.sex.$t
            });

          }.bind(this),
          error: function() { alert(':(')}.bind(this)
        })
      }.bind(this),
      error: function() { alert(':('); }.bind(this)
    });
  },
  componentWillMount: function() {
    this.randomPet();
  },
  render: function() {
    return (
      <div>
        <input type="button" value="get a pig" onClick={this.randomPet}/>
        <br/>
        <h3>{this.state.name}: {this.state.age} {this.state.sex}</h3>
        <img src={this.state.image} width="300"/>
      </div>
    )
  }
});
