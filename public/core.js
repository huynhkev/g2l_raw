// public/core.js
var g2l = angular.module('g2l', [
    "g2l.authenticationService",
    "g2l.homeController",
    "g2l.adminsController",
    'ngRoute']);

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

g2l.controller('mainController', function($scope, $http, $window, authenticationService, $location) {

    $scope.admin = {
        "username": "",
        "password": ""
    };

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


g2l.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
       config.headers = config.headers || {};
      if ($window.localStorage['jwtToken']) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage['jwtToken'];
      }
      console.log(config.headers);
       return config;
    },
    response: function(res){
        //if the request is to the authentication API and there is a token returned then save it
        if(res.data.token){
            $window.localStorage['jwtToken'] = res.data.token;
        }
        return res;
    },

    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
           console.log("rejecting..");
      }
      return $q.reject(rejection);

    }
  };
});

g2l.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
