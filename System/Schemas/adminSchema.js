var adminSchema = {username: String, password: String, firstName: String, lastName: String};
var mongoose = require('mongoose');   
module.exports = mongoose.model('Admin', adminSchema);
