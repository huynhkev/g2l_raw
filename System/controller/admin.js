'use strict';

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
