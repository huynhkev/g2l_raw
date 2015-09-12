
module.exports = function(app) {
  // will handle any request that ends in /events
  // depends on where the router is "use()'d"
  var Admin = require("./../Schemas/adminSchema.js");
  var jwt = require('jsonwebtoken');
  var adminController = require("./../Schemas/adminSchema.js");

  app.post('/api/ifAdmin', function(req, res, next) {
          //find and compare given user to database of admins
          var admin = {
              username: "ann",
              password: "password"
          };
          var givenAdmin = req.body;

          Admin.find(givenAdmin).exec(function(err, admins){
                if (err) throw err;

                // show the admins in the past month
                if(admins.length > 0){
                  var admin = admins[0];
                  // create a token
                  var token = jwt.sign(admin, app.get('sessionSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                  });
                  return res.json({
                      success: true,
                      token: token,
                      message: "User authenticated! Auth token provided."
                  }); 
                }else{
                  return res.json({message: "Invalid password given. Try again.", success: false});                
                }
          });  
  });

  // get all todos
  app.post('/api/newAdmin', function(req, res) {
      console.log("new admin: " + req.body.username + ", " + req.body.password);
      // create a new admin  
      var newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password 
      });        
      newAdmin.save();
      // save the user
      newAdmin.save(function(err) {
        if (err) throw err;

        console.log('Admin created!');
        res.send("admin created! :)");
      });
  });   

};

