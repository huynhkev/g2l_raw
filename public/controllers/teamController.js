// public/appController.js
var adminsController = angular.module('g2l.teamController', ["g2l.authenticationService"]);

adminsController.controller('teamController', function($scope, $http, $window, authenticationService, $route) {
  
  //redirect to start page if not admin
 // authenticationService.isNotAuth();
  

});

