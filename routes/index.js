var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var router = express.Router();

// returns the homepage
router.get('/', function(req, res, next) {
	res.json({'text' : 'PeTinder'});
});

// returns the login page
router.get('/login', function(req, res) {
	res.json({'text': 'placeholder'});
});

// for logging in with facebook
router.get('/auth/facebook', 
	passport.authenticate('facebook')
);

router.get('/auth/facebook/callback',
	passport.authenticate('facebook', {successRedirect: '/',
										failureRedirect: '/login'})
);

// check which user is logged in
router.get('/user', 
	function(req, res, next) {
		if(req.isAuthenticated()) { 
			return next(); 
		}
		res.send(401);
	}, function(req, res) {
		res.send(req.user);
});


// log in with local strategy
router.post('/login', passport.authenticate('local'), 
	function(req, res) {
		res.redirect('/');
	}
);

// register new user
router.post('/register', function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.render("login", {});
    }

    passport.authenticate('login', function(req, res) {
      res.redirect('/');
    });
  });	
})

// logout anyone who is logged in
router.get('/logout', function(req, res) {
	req.logout()
	res.redirect('/')
})

module.exports = router;
