var express = require('express');

var router = express.Router();

//returns the home page handlebars template, index.hbs
router.get('/', function(req, res, next) {
	res.json({'text' : 'Hello World'});
});

router.get('/auth/facebook', 
	passport.authenticate('facebook')
);

router.get('/auth/facebook/callback',
	passport.authenticatae('facebook', {successRedirect: '/',
										failureRedirect: '/login'})
);

router.get('/user', 
	function(req, res, next) {
		if(req.isAuthenticated()) { 
			return next(): 
		}
		res.send(401);
	}, function(req, res) {
		res.send(req.user);
});

router.post('/login', passport.authenticate('local'), 
	function(req, res) {
		res.redirect('/');
	}
);

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


module.exports = router;
