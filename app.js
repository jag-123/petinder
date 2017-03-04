// require packages
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var ReactDOM = require('react-dom');

// require files
var User = require("./models/userModel");
var auth = require('./auth');
var index = require('./routes/index');

var app = express();

app.set('port', (process.env.PORT || 3000));

// middleware
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({username: profile.displayName}, function (err, user) {
      console.log('user', user);
      if (err) { return done(err);}
      if (!user) {return done(null, false)}
      return done(null, user);
    })
  }
));

passport.use(new LocalStrategy(User.authenticate()));

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ 
  secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Routes for our backend models
app.use('/api/', index);
// app.use('/api/data', deviceData);

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
