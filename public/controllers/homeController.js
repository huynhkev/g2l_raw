// public/homeController.js
var homeController = angular.module('g2l.homeController', ["g2l.authenticationService"]);

homeController.controller('homeController', function($scope, $http, $window, authenticationService, $route) {
  //authenticationService.isNotAuth();


  //show button if user is an admin
  $scope.showButton = authenticationService.booleanAuth();
  console.log(authenticationService.booleanAuth());

  //getStories();

  $scope.stories = [];

  $scope.post = {
    text: ""
  };



  function getStories(){
    $http.get('/api/getStories')
        .success(function(data) {
          console.log(data);
          $scope.stories = data;
        })
        .error(function(data) {
            alert("sorry, there was an error validating you..");
            console.log('Error: ' + data);
        });     
  }

  $scope.appendStory = function(){
    $http.post('/api/appendStory', $scope.post)
        .success(function(data) {
          alert("the post: " + data + ", was successfully added");
          $scope.examplePost = "";
          $route.reload();
        })
        .error(function(data) {
            alert("sorry, there was an error validating you..");
            console.log('Error: ' + data);
        });     	
  }

  $scope.removeStory = function(story){
    alert(story);
    console.log(story);
    $http.post('/api/removeStory', story)
        .success(function(data) {
          alert("the post: " + data + ", was successfully removed");
          $route.reload();
        })
        .error(function(data) {
            alert("sorry, there was an error validating you..");
            console.log('Error: ' + data);
        });       
  }
  
});

