//module defines the collection and properties of that collection to be used for the db

var storySchema = {text: String, date: String};
var mongoose = require('mongoose');   
module.exports = mongoose.model('Story', storySchema);
