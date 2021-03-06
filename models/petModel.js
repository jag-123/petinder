var mongoose = require('mongoose');

var petSchema = mongoose.Schema({
	pfId: String,
	name: String,
	age: String,
	sex: String,
	size: String,
	image: String,	// a url
	matchedWith: [String]	// user _id
});

module.exports = mongoose.model("Pets", petSchema);