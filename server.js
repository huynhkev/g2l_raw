// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var config = require('./config'); // get our config file
    app.set('sessionSecret', config.secret); // secret variable

    mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/admins');
    
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users

    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 5000);
    console.log("App listening on port 5000");

    // routes ======================================================================
    var admin = require("./System/routes/admin.js")(app);


    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });