//routes handles HTTP requests (get/post) to the back-end from front-end

module.exports = function(app) {
  // will handle any request that ends in /events
  // depends on where the router is "use()'d"
  //get the schema (object structure) to query the database for
  var Story = require("./../Schemas/storySchema.js");

  //add a story to the db
  app.post('/api/appendStory', function(req, res){
    console.log("entering appendStory");
    var textBody = req.body.text;
    var story = new Story({
      text: textBody,
      date: (new Date()).toString()
    });
    story.save(function(err) {
      if (err) throw err;
      res.send("story created!");
    });    
  });

  //remove a story to the db
  app.post('/api/removeStory', function(req, res){
    console.log("entering removeStory");
    //find admin with given properties and remove it from db
    Story.find(req.body).remove().exec();
    res.send("Story removed");        
  });

  //get all stories in db
  app.get('/api/getStories', function(req, res){
    console.log("entering getStories");
    Story.find({}, function (err, storyArray) {
      if (err) return handleError(err);

      //send back array of admins
      res.send(storyArray);
    })   

  });

};

