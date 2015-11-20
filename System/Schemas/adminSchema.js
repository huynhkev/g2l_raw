//module defines the collection and properties of that collection to be used for the db

var adminSchema = {username: String, password: String, firstName: String, lastName: String};
var mongoose = require('mongoose');   
 mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/admins'); 
    console.log(process.env.MONGOLAB_URI);
module.exports = mongoose.model('Admin', adminSchema);
