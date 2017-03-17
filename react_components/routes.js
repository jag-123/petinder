/*
The components are matched to routes here using React Router.
*/
import React from 'react'
import { route, Route, Link, IndexRoute } from 'react-router'
import GetPet from './GetPet'
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
