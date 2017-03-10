import React from 'react'
import { route, Route, IndexRoute } from 'react-router'
import GetPet from './GetPet'
import Login from './Login'
import LoginFacebook from './LoginFacebook'
import LoginLocal from './LoginLocal'
import Logout from './Logout'
import PeTinder from './PeTinder'
import Preferences from './Preferences'

module.exports = (
	<Route path="/" component={PeTinder}>
		<Route path="/userlogin" component={Login}/>
		<Route path="/userlogout" component={Logout}/>
		<Route path="/preferences" component={Preferences}/>
		<Route path="getpet" animal="pig" component={GetPet}/>
	</Route>
)
