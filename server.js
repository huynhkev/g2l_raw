// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var config = require('./config'); // get our config file. config contains static data we can use throughout whole app
    app.set('sessionSecret', config.secret); // secret variable. Stores the secret variable for authentication

    //process.env.MONGOLAB_URI is the link used to connect to mongolab's database for when app is deployed to host site
    //if there is no host database available, then app will connect to mongodb database in localhost. The database is called 'admins'
    mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/admins'); 
    
    mongoose.connection.on("open", function() {
    console.log("connection to database done!");
    });

    mongoose.connection.on("error", function() {
        console.log(process.env.MONGOLAB_URI);
        console.log("error: could not connect to database");
    });
    
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users

    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    //process.env.PORT used when deploying site to host site. Connects to their port
    //else, connect to local port on your machine
    app.listen(process.env.PORT || 5000);
    console.log(process.env.PORT);
    console.log("App listening on port 5000");

    // routes ======================================================================
    //import the routes for when there are requests to specific route URIs. Passes the app as parameter to help access required files in routes
    var admin = require("./System/routes/admin.js")(app);
    var home = require("./System/routes/home.js")(app);

    // route to handle all angular requests
    //NEED THIS FOR FRONT-END ANGULAR ROUTING
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });