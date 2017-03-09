var mongoose = require('mongoose');

var petSchema = mongoose.Schema({
	name: String,
	animal: String,
	description: String,
	photo: String,
	matchedWith: [String]	// user _id
});

module.exports = mongoose.model("Pets", petSchema);