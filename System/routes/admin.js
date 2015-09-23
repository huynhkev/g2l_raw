//routes handles HTTP requests (get/post) to the back-end from front-end

module.exports = function(app) {
  // will handle any request that ends in /events
  // depends on where the router is "use()'d"

  //get the schema (object structure) to query the database for
  var Admin = require("./../Schemas/adminSchema.js");
  //get the web tokens used for authentication
  var jwt = require('jsonwebtoken');

  //send an authentication token if user is an admin
  app.post('/api/ifAdmin', function(req, res, next) {
          console.log("entering ifAdmin");
          //given user credentials
          var givenAdmin = req.body;

          //find and compare given user credentials to database of admins
          //Admin schema points app to the Admin collection
          //finds the instance of Admin that matches the given user credentials
          Admin.find(givenAdmin).exec(function(err, admins){
                if (err) throw err;

                // if admins are found that match the given credentials
                if(admins.length > 0){
                  var admin = admins[0];
                  // create a token
                  var token = jwt.sign(admin, app.get('sessionSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                  });
                  //send it back to front-end as json object
                  return res.json({
                      success: true,
                      token: token,
                      message: "User authenticated! Auth token provided."
                  }); 
                //if admins are not found..  
                }else{
                  return res.json({message: "Invalid password given. Try again.", success: false});                
                }
          });  
  });

  // create a new admin in the database
  app.post('/api/newAdmin', function(req, res) {
      console.log("new admin: " + req.body.username + ", " + req.body.password + ", " + req.body.firstName + ", " + req.body.lastName);
      
      // create a new admin  
      var newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });        
      newAdmin.save();
      // save the user
      newAdmin.save(function(err) {
        if (err) throw err;

        res.send("admin created! :)");
      });
  });   

  // get an array of all admins in the database
  app.get('/api/getAdmins', function(req, res) {
    console.log("entering getAdmins");
    //{} means no filter requirements
    Admin.find({}, function (err, adminArray) {
      if (err) return handleError(err);

      //send back array of admins
      res.send(adminArray);
    })    
  }); 

  //remove admin from database
  app.post('/api/removeAdmin', function(req, res){
    console.log("entering removeAdmin");
    //find admin with given properties and remove it from db
    Admin.find(req.body).remove().exec();
    res.send("Admin removed");
  });

};

