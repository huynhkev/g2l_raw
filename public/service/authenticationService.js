//set of functions to be used for authentication throughout the front-end of app

var authenticationService = angular.module('g2l.authenticationService', []);

authenticationService.service('authenticationService', function($window, $location){
	return {
		//if user is not admin, then redirect to start page
		isNotAuth: function(){
			console.log("authenticating");
			if($window.localStorage['jwtToken'] === undefined){
				$location.url("/")
			}

		},
		//return boolean value depending on if user is authenticated
		booleanAuth: function(){
			return $window.localStorage['jwtToken'] === undefined;
		}

	}
});