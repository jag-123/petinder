import React from 'react'
import { route, Route, IndexRoute } from 'react-router'
import GetPet from './GetPet'
import Login from './Login'
import LoginFacebook from './LoginFacebook'
import LoginLocal from './LoginLocal'
import Logout from './Logout'
import MasterSelect from './MasterSelect'
import PeTinder from './PeTinder'
import Preferences from './Preferences'
// import RegisterNewUser from './RegisterNewUser'

module.exports = (
	<Route path="/" component={PeTinder}>
		<Route path="/loginss" component={Login}/>
	</Route>
)