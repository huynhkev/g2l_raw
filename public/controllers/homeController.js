// public/homeController.js
var homeController = angular.module('g2l.homeController', ["g2l.authenticationService"]);

homeController.controller('homeController', function($scope, $http, $window, authenticationService) {
  authenticationService.isNotAuth();
  $scope.showButton = authenticationService.booleanAuth();
  console.log(authenticationService.booleanAuth());
});

