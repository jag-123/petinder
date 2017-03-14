import React from 'react';

export default React.createClass({
  // nothing currently needs to be in the state
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="fbLogin">
        <form action="/auth/facebook">
        <button
          className="loginBtn loginBtn--facebook"
          type="submit"
          value="Login"
        >Login with Facebook</button>
        </form>
      </div>
    );
  }
});
