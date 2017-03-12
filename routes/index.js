var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var Router = require('react-router');
var session = require("express-session");

var router = express.Router();

var User = require("../models/userModel");
// returns the homepage
// router.get('/', function(req, res, next) {
// 	res.json({'text' : 'PeTinder'});
// });

// for logging in with facebook
router.get('/auth/facebook',
	passport.authenticate('facebook')
);

// the redirects are weird right now... will probably make more
// sense once we figure out changing pages with React
router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {successRedirect: '/preferences',
										failureRedirect: '/userlogin'})
);

// GET information on the user who is logged in
router.get('/user',
	function(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		} else {
			console.log("not logged in");
		}
		res.json({username: null})
	}, function(req, res) {
		res.json({
			username:req.user.username,
			name: req.user.name,
			id: req.user._id,
			preferences: req.user.preferences
		});
});


// log in with local strategy
router.post('/login', passport.authenticate('local'),
	function(req, res) {
		res.json({
			username: req.user.username,
			name: req.user.name,
			id: req.user._id
		});
		//Router.browserHistory.push('/');
	}
);

//post preferences
router.post('/preferences', function(req, res) {
	User.findOne({"_id":req.user._id},function(err,user){
		user.preferences = (req.body);
		user.save(function(err){
			if (err){
				res.sendStatus(500);
				return;
			}
		})
		console.log(user.preferences)
	})
	console.log(req.user);
	res.json({
		username: req.user.username,
		name: req.user.name,
		id: req.user._id,
		preferences: req.user.preferences
	});
});


// register new user
router.post('/register', function(req, res) {
  User.register(new User({username: req.body.username, name:req.body.name}), req.body.password, function(err, account) {
    if (err) {
      console.error(err);
    }

    passport.authenticate('login', function(req, res) {
      res.json({
      	username: account.username,
      	name: account.name,
      	id: account._id
      });
    });
  });
})

// logout anyone who is logged in
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/userlogin');
})

module.exports = router;
