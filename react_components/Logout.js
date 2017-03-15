import React from 'react';
import { browserHistory } from 'react-router';

export default React.createClass({
  getInitialState: function() {
    return {}
  },
  // I don't know if any information has to be logged here,
  // but it's ok for testing for now
  logout: function(event) {
    event.preventDefault;

    $.get('/logout')
      .done(function(data) {
        console.log(data);
      })
      .error(function(xhr, status, err) {
        console.error('GET /home', status, err.toString());
      });
  },
  render: function() {
    return (
      <div className='text-left'>
        <form className='form-inline' onSubmit={this.logout}>
          <button className='btn btn-outline-success my-2 my-sm-0' type="submit"value="Logout">Logout</button>
        </form>
      </div>
    )
  }
});
