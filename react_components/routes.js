import React from 'react'
import { route, Route, Link, IndexRoute } from 'react-router'
import GetPet from './GetPet'
import Login from './Login'
import LoginFacebook from './LoginFacebook'
import LoginLocal from './LoginLocal'
import Logout from './Logout'
import PeTinder from './PeTinder'
import Preferences from './Preferences'
import MatchPage from './MatchPage'
import Home from './Home'

module.exports = (
	<Route path="/" component={PeTinder}>
		<IndexRoute component={Home}/>
		{/*<Route path="/userlogin" component={Login}/>*/}
		<Route path="/preferences" component={Preferences}/>
		<Route path="/getpet" component={GetPet}/>
		<Route path="/matches" component={MatchPage}/>
	</Route>
)
