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
var findOrCreate = require('mongoose-findorcreate');

// require files
var User = require("./models/userModel");
var auth = require('./auth');
var index = require('./routes/index');

// connect to database
var uri = "mongodb://heroku_1t5r6jcf:8i8eejg7rul5b1l71idrqta5a4@ds137760.mlab.com:37760/heroku_1t5r6jcf"

mongoose.connect(uri);

// initialize express
var app = express();

app.set('port', (process.env.PORT || 3000));

// middleware
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// this is called when Facebook provides account information
passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
  	// create a new user if one is not already in the database
    User.findOrCreate({username: profile.displayName, name: profile.displayName}, function (err, user) {
      if (err) { return done(err);}
      if (!user) {return done(null, false)}
      return done(null, user);
    });
  }
));

// this is called to authenticate the user's password
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

//Nice simple one-line for hooking up backend routes!
//Routes for backend models
app.use('/', index);

var INDEX_DIR = path.resolve(__dirname, './public');

// if the url is not a route on the server, we send
// index.html and the react router routes the correct content
app.get('*', function(req, res) {
  console.log(INDEX_DIR);
  res.sendFile(INDEX_DIR + '/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
