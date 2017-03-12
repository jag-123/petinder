import React from 'react'

export default React.createClass({
  getInitialState: function(event){
    return {
      id: '',
      name: '',
      age: '',
      sex: '',
      size: '',
      image: 'http://simpleicon.com/wp-content/uploads/camera.png'
    }
  },
  componentDidMount: function(event) {
    console.log(this.props);
    console.log(this.props.user);
    console.log(this.state);
    $.get('/showmatches')
      .done(function(data) {
        console.log('hi');
        console.log(data);
      })
      .error(function(xhr, status, err) {
        console.error('GET /home', status, err.toString());
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
