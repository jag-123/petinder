import React from 'react';
var auth = require('../auth');
var key = auth.PETFINDER_APP_KEY;

export default React.createClass({
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

    var base = 'http://api.petfinder.com/' + func + '?format=json'
    var argsString = this.makeArgsString(argObj);
    return base + argsString + '&callback=?';
  },
  componentDidMount: function(event) {
    $.ajax({
      url: '/showmatches',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
        this.setState({
            pfIds: data.pfIds,
        });
        console.log(this.state, "state")
        var getPet = 'pet.get';
        var argsGetPet = {
          pfIds: this.state.id
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
      error: function() { alert(':(')}.bind(this)
    });
  },
  render: function() {
    return(
      <div>
        <p>test</p>
      </div>
    );
  }
})
