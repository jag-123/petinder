import React from 'react';
import { Link, browserHistory } from 'react-router';

// the wrapper for everything
export default React.createClass({
  getInitialState: function() {
    console.log('test');
    // default for logged out state
    return {
      username: null,
      name: null,
      userId: null
      // preferences needed
    };
  },
  // update state with user data if someone is logged in
  componentDidMount: function() {
    $.ajax({
      url: '/user',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
          console.log(data);
          this.setState({
              username: data.username,
              name: data.name,
              userId: data.id
          });
      }.bind(this),
      failure: function(xhr, status, err) {
          console.error('GET /user', status, err.toString());
          //browserHistory.push("/userlogin");
      }.bind(this)
    });
  },
  // need to ask about how to update component to show username without refreshing
  // maybe componentWillUpdate?
  render: function() {
    return (
      <div>
        <h1>PeTinder</h1>
        <p>{this.state.name} {this.state.username}</p>
        {this.props.children}
      </div>
    );
  }
});
