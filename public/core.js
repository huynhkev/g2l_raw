// public/core.js
//core handles essential routing, authentication, initial logic for front-end

var g2l = angular.module('g2l', [
    "g2l.authenticationService",
    "g2l.homeController",
    "g2l.adminsController",
    "textAngular",
    "angular-confirm",
    'ngRoute']);

//define front-end routes
g2l.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.
        when("/", {
            templateUrl: 'views/login.html',
            controller: 'mainController'
        }).
        when("/home", {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        }).
        when("/manageAdmins", {
            templateUrl: 'views//admins.html',
            controller: 'adminsController'
        }).
        otherwise({
            redirectTo: "/"
        });
       $locationProvider.html5Mode({
        requireBase: false,
        enabled: true
       });
}]);

//main controller for initial page
g2l.controller('mainController', function($scope, $http, $window, authenticationService, $location) {

    $scope.admin = {
        "username": "",
        "password": ""
    };

    //check if user is an admin. Redirect if so
    $scope.ifAdmin = function(){
        $http.post('/api/ifAdmin', $scope.admin)
            .success(function(data) {
                if(data){
                    if(data.success){
                        $location.url("/home");
                        return data;
                    }else{
                        alert("no password match");
                    }
                    
                }else{
                    alert("sorry, we could not validate you...");
                }
            })
            .error(function(data) {
                alert("sorry, there was an error validating you..");
                console.log('Error: ' + data);
            });        
    };

    $scope.ifUser = function(){
        $location.url("/home");
    }
});

//functions executed during every HTTP requests
g2l.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    //before each HTTP requests, check if user has an authentication token
    request: function (config) {
       config.headers = config.headers || {};
      //set authentication token in HTTP headers
      if ($window.localStorage['jwtToken']) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage['jwtToken'];
      }
      console.log(config.headers);
       return config;
    },
    //after each HTTP requests, store authentication token to localStorage 
    //localStorage stores token in browser so that it remembers on next page visit
    //sessionStorage deletes token when session is done
    response: function(res){
        //if the request is to the authentication API and there is a token returned then save it
        //so that users can visit other secured pages
        if(res.data.token){
            $window.localStorage['jwtToken'] = res.data.token;
        }
        return res;
    },
    //if there is an error after a HTTP request
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
           console.log("rejecting..");
      }
      return $q.reject(rejection);

    }
  };
});

//reconfigure the $httpProvider settings so that it will use the authentication interceptor at each HTTP requests
g2l.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
