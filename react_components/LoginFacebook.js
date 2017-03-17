/*
This component renders the button for a user to log in with facebook. It is displayed on the Login
page.
*/

import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="fbLogin">
        <form action="/auth/facebook">
        <button
          className="loginBtn loginBtn--facebook"
          type="submit"
          value="Login"
        >
        Login with Facebook
        </button>
        </form>
      </div>
    );
  }
});
