var authenticationService = angular.module('g2l.authenticationService', []);

authenticationService.service('authenticationService', function($window, $location){
	return {
		isNotAuth: function(){
			// console.log("authenticating");
			if($window.localStorage['jwtToken'] === undefined){
				//$location.url("/")
				alert("User is not an admin!");
			}else{
				alert("User is an admin!");
			}

		},
		booleanAuth: function(){
			return $window.localStorage['jwtToken'] === undefined;
		}

	}
});