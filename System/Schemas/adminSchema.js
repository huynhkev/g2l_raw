//module defines the collection and properties of that collection to be used for the db

var adminSchema = {username: String, password: String, firstName: String, lastName: String};
var mongoose = require('mongoose');   
module.exports = mongoose.model('Admin', adminSchema);
