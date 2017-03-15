var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var Router = require('react-router');
var session = require("express-session");

var router = express.Router();

var User = require("../models/userModel");
var Pet = require("../models/petModel");

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
			res.json({username: null})
		}
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
		});
		res.json({
			username: user.username,
			name: user.name,
			id: user._id,
			preferences: user.preferences
		});
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


//displays user matches on matches page
router.get('/showmatches', function(req, res){
	User.findOne({"_id":req.user._id},function (err,user){
		if (err){
			console.log(err)
		} else {
			for (var i=0; i<user.matchedWith.length; i++){
				Pet.findOne({"_id":user.matchedWith[i]},function(err,pet){
					if (err){
						console.error(err);
					} else if (pet){
						if ((user.matchedWithPfIds).indexOf(pet.pfId) === -1){
							user.matchedWithPfIds.push(pet.pfId);
							user.save(function(err) {
								if(err) {
									console.error(err);
								}
							});
						}
					}
				});
			}
		}
		//sets unique elements in matchedWithPfIds array
		var pfIds = [...new Set(user.matchedWithPfIds)];
		Pet.find({"pfId":{$in:pfIds}},function(err,pet){
			if (err){
				console.error(err);
			}
			res.json({pets:pet})
		})
	});
});

//removes match from matchedWith field
router.get('/deletematch',function(req,res){
	console.log(req)
});

router.post('/match', function(req, res) {
	User.findOne({"_id": req.body.user}, function(err, user) {
		if (err) {
			console.error(err);
		} else {
			Pet.findOne({"pfId": req.body.petId}, function(err, pet) {
				if (err) {
					console.error(err);
				} else if (pet) {
					if ((pet.matchedWith).indexOf(req.body.user) === -1) {
						pet.matchedWith.push(req.body.user);
					}
				} else {
					var pet = new Pet({
						"name": req.body.name,
						"age": req.body.age,
						"sex": req.body.sex,
						"size": req.body.size,
						"pfId": req.body.petId,
						"image": req.body.image,
						"matchedWith": [req.body.user]
					});

					pet.save(function(err) {
						if(err) {
							console.error(err);
						}
					});
				}

				if ((user.matchedWith).indexOf(pet._id) === -1) {
					user.matchedWith.push(pet._id);
				}
				user.save(function(err) {
					if(err) {
						console.error(err);
					}
				});
				res.json({user:user, pet:pet})
			});
		}
	});
});

module.exports = router;
