// public/appController.js
var adminsController = angular.module('g2l.galleryController', ["g2l.authenticationService"]);

adminsController.controller('galleryController', function($scope, $http, $window, authenticationService, $route) {
  
  //redirect to start page if not admin
  authenticationService.isNotAuth();
  

});

