import React from 'react';


export default React.createClass({
  getInitialState: function() {
    return {}
  },
  // I don't know if any information has to be logged here,
  // but it's ok for testing for now
  logout: function(event) {
    event.preventDefault;

    $.get('/logout/')
      .done(function(data) {
        console.log(data)
      })
      .error(function(xhr, status, err) {
        console.error('GET /home', status, err.toString());
      });
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.logout}>
          <input
            type="submit"
            value="Logout"
          />
        </form>
      </div>
    )
  }
});