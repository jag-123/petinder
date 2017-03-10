import React from 'react';
var md5 = require('md5'); // for hashing api signatures
var auth = require('../auth');
var secret = auth.PETFINDER_APP_SECRET;
var key = auth.PETFINDER_APP_KEY;

// starting api request stuff
export default React.createClass({
  getInitialState: function() {
    return {}
  },
  makeSignature: function(argsString) {
    var sig = md5(secret + argsString);
    return "&sig=" + sig;
  },
  makeArgsString: function(argObj = {}) {
    var argsString = 'key=' + key;

    for (var k in argObj) {
      argsString += '&' + k + '=' + String(argObj[k]);
    }

    return argsString;
  },
  makeURL: function(func, argObj) {
    var base = 'api.petfinder.com/' + func + '?'
    var argsString = this.makeArgsString(argObj);
    var signature = this.makeSignature(argsString);

    return base + argsString + signature;
  },
  randomPet: function(event) {
    // having trouble with CORS so no GET request written yet
    // making url to request random pet id #
    var getRandom = 'pet.getRandom';
    var argsGetRandom = {'location': '02492'};
    console.log(this.makeURL(getRandom, argsGetRandom));

    // making url to request pet with this id number
    var getPet = 'pet.get';
    var argsGetPet = {id: '37235293'} // obtained from request
    console.log(this.makeURL(getPet, argsGetPet));
  },
  render: function() {
    return (
      <div>
        <input type="button" value="get a pet" onClick={this.randomPet}/>
      </div>
    )
  }
});