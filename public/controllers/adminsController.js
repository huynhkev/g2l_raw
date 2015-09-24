// public/appController.js
var adminsController = angular.module('g2l.adminsController', ["g2l.authenticationService"]);

adminsController.controller('adminsController', function($scope, $http, $window, authenticationService, $route) {
  
  //redirect to start page if not admin
  authenticationService.isNotAuth();
  
  $scope.admin = {
  	"username": "",
  	"password": "",
    "firstName": "",
    "lastName": ""
  };

  //save new admin
  $scope.saveAdmin = function(){
    //contact api in back-end
    $http.post('/api/newAdmin', $scope.admin)
        .success(function(data) {
 			alert("admin created!");
 			console.log(data);
      //refresh page
      $route.reload();
        })
        .error(function(data) {
            alert("sorry, there was an error creating a new admin..");
            console.log('Error: ' + data);
        });     	
  }

  //remove admin from database
  $scope.removeAdmin = function(admin){
    console.log(admin);
    //contact api in back-end
    $http.post('/api/removeAdmin', admin)
        .success(function(data) {
      alert("admin deleted!");
      console.log(data);
      $route.reload();
        })
        .error(function(data) {
            alert("sorry, there was an error deleting admin..");
            console.log('Error: ' + data);
        });     
  }

  // get array of admins to display
  //contact getAdmins api
  $http.get('/api/getAdmins').
    then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response.data);
      $scope.adminArray = response.data;
    }, function(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert("Error getting list of admins...");
    });

});

