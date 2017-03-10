var mongoose = require('mongoose');

var petSchema = mongoose.Schema({
	pfId: String,
	matchedWith: [String]	// user _id
});

module.exports = mongoose.model("Pets", petSchema);