// public/appController.js
var eventsController = angular.module('g2l.eventsController', ["g2l.authenticationService"]);

eventsController.controller('eventsController', function($scope, $http, $window, authenticationService, $route) {
  
  //redirect to start page if not admin
  authenticationService.isNotAuth();
  $scope.upcoming = true;  

});

