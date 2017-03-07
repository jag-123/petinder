var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();

var User = require("../models/userModel");
// returns the homepage
router.get('/', function(req, res, next) {
	res.json({'text' : 'PeTinder'});
});

// returns the login page. This is not being used right now!!!
router.get('/login', function(req, res) {
	res.json({'text': 'placeholder'});
});

// for logging in with facebook
router.get('/auth/facebook', 
	passport.authenticate('facebook')
);

// the redirects are weird right now... will probably make more 
// sense once we figure out changing pages with React
router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {successRedirect: '/',
										failureRedirect: '/'})
);

// GET information on the user who is logged in
router.get('/user', 
	function(req, res, next) {
		if(req.isAuthenticated()) { 
			return next(); 
		}
		res.send(401);
	}, function(req, res) {
		res.json({
			username:req.user.username, 
			name: req.user.name,
			id: req.user._id
		});
});


// log in with local strategy
router.post('/login', passport.authenticate('local'), 
	function(req, res) {
		console.log(req);
		res.json({
			username: req.user.username,
			name: req.user.name,
			id: req.user._id
		});
	}
);

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
	req.logout()
	res.send("logged out") // this is for testing. should be taken out later!!
})

module.exports = router;
