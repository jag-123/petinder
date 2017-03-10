import React from 'react';

export default React.createClass({
  // nothing currently needs to be in the state
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div>
        <h2>Login with Facebook</h2>
        <form action="/auth/facebook">
        <input
          type="submit"
          value="Login"
        />
        </form>
      </div>
    );
  }
});