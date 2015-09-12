var adminSchema = {username: String, password: String};
var mongoose = require('mongoose');   
module.exports = mongoose.model('Admin', adminSchema);
