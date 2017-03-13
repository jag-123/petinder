import React from 'react';
var auth = require('../auth');
var key = auth.PETFINDER_APP_KEY;

export default React.createClass({
  getInitialState: function() {
    // default states
    return {
      alldata: {
        id: '',
        name: [],
        age: [],
        sex: [],
        size: [],
        image: []
      }
    }
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

    var base = 'http://api.petfinder.com/' + func + '?format=json'
    var argsString = this.makeArgsString(argObj);
    return base + argsString + '&callback=?';
  },
  componentWillMount: function(event) {
    $.ajax({
      url: '/showmatches',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
        this.setState({
            alldata: {id: data.pfIds,
              name:this.state.alldata.name,
              age:this.state.alldata.age,
              sex:this.state.alldata.sex,
              size:this.state.alldata.size,
              image:this.state.alldata.image}
        });
        //console.log(this.state, "state")
        var getPet = 'pet.get';

        for (var i=0;i<this.state.alldata.id.length;i++){
          var argsGetPet = {
            id: this.state.alldata.id[i]
          };

          var getPetUrl = this.makeURL(getPet, argsGetPet)
          $.ajax({
            // then get the pet's profile
            url: getPetUrl,
            type: 'GET',
            dataType: 'jsonp',
            crossDomain:true,
            success: function(data) {
              // console.log(data);
              var base = data.petfinder.pet;
              if (base.media.photos !== undefined) {
                // if there is a picture list provided use the one in the middle
                var photo = base.media.photos.photo;

                this.setState({
                  // gets a picture that is pretty often the right size...
                  alldata: {id: this.state.alldata.id,
                    name:this.state.alldata.name,
                    age:this.state.alldata.age,
                    sex:this.state.alldata.sex,
                    size:this.state.alldata.size,
                    image: this.state.alldata.image.concat([photo[Math.floor((photo.length - 1) / 2)].$t])}
                });
              } else {
                // use the default image
                this.setState({
                  alldata:{id: this.state.alldata.id,
                    name:this.state.alldata.name,
                    age:this.state.alldata.age,
                    sex:this.state.alldata.sex,
                    size:this.state.alldata.size,
                    image: this.state.alldata.image.concat(this.getInitialState().image)}
                });
              }

              this.setState({
                alldata: {age: this.state.alldata.age.concat(base.age.$t),
                  name: this.state.alldata.name.concat(base.name.$t),
                  sex: this.state.alldata.sex.concat(base.sex.$t),
                  size: this.state.alldata.size.concat(base.size.$t),
                  image:this.state.alldata.image,
                  id:this.state.alldata.id}
              });

              //console.log(this.state)

            }.bind(this),
            error: function() { alert(':(')}.bind(this)
          })

          //console.log(argsGetPet)
        }

      }.bind(this),
      error: function() { alert(':(')}.bind(this)
    });
  },
  render: function() {
    //being printed multiple times
    console.log(this.state)

    return(
      <div>
        {/* {
          this.state.alldata.id.map(function(pet){
            return <div>
                    <h3>{this.state.alldata.name} {this.state.alldata.age} {this.state.alldata.sex}</h3>
                    <img src={this.state.alldata.image} width="300"/>
                  </div>
          })
        } */}
      </div>
    );
  }
})
