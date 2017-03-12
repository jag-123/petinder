var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
	name: String,
	username: String,
	password: String,
	preferences: [],
	matchedWith: [String] // list of pet _id's from pet database
	// data structure containing preferences
});

userSchema.plugin(findOrCreate); // I don't know if I used this...
userSchema.plugin(passportLocalMongoose); // I think this hashes and salts passwords for security :)

module.exports = mongoose.model("Users", userSchema);
