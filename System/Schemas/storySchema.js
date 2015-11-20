//module defines the collection and properties of that collection to be used for the db

var storySchema = {text: String, date: String};
var mongoose = require('mongoose');   
 mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/admins'); 
    console.log(process.env.MONGOLAB_URI);
module.exports = mongoose.model('Story', storySchema);
