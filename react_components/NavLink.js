// link component for navigation. Keeps track of which link is active
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
  	//  ...this.props clones properties where this class is instantiated
    return <Link {...this.props} activeClassName="active"/>
  }
})
