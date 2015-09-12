// public/homeController.js
var adminsController = angular.module('g2l.adminsController', ["g2l.authenticationService"]);

adminsController.controller('adminsController', function($scope, $http, $window, authenticationService) {
  $scope.admin = {
  	"username": "",
  	"password": ""
  };

  $scope.saveAdmin = function(){
    $http.post('/api/newAdmin', $scope.admin)
        .success(function(data) {
 			alert("admin created!");
 			console.log(data);
        })
        .error(function(data) {
            alert("sorry, there was an error creating a new admin..");
            console.log('Error: ' + data);
        });     	
  }
});

