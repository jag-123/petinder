import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, browserHistory} from 'react-router';

var PeTinder = React.createClass({
  getInitialState: function() {
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
      </div>
    );
  }
});

var Home = React.createClass({
    getInitialState: function() {
      return {

      }
    },
    print: function(event) {
      console.log('hi');
    },
    render: function() {
        return (
          <div>
            <input type="button" value="hi" onClick={this.print} />
          </div>
        );
    }
})

render(
    <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={PeTinder}/>
    </Router>,
    document.getElementById('content')
);
