'use strict';
//code logic/functions that is used for when there is an HTTP request to a specific route URI

module.exports = function(){
  return {
    ifAdmin:function(req,res){
      res.render('index',{ locals: { config: System.config.clean }});
    },
    aggregatedList:function(req,res) {
      res.send(res.locals.aggregatedassets);
    }
  };
};
