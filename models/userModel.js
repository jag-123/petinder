var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
	name: String,
	username: String,
	password: String,
	preferences: [],
	matchedWith: [String]
	// data structure containing preferences
});

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose); // I think this hashes and salts passwords for security :)

module.exports = mongoose.model("Users", userSchema);
