// public/appController.js
var adminsController = angular.module('g2l.contactController', ["g2l.authenticationService"]);

adminsController.controller('contactController', function($scope, $http, $window, authenticationService, $route) {
  
  //redirect to start page if not admin
  authenticationService.isNotAuth();
});


adminsController.$inject = ['$scope'];

adminsController.directive("switchMap", function($compile){   
      return{
        restrict: 'A',
        scope: { info: "@" },
        link: function(scope , element){   




          //google maps 
          function initMap(current) {

            if(scope.info == "main") {
              var g2l = {lat: 47.431430, lng: -122.29759};
            }else{
              var g2l = {lat:47.434767, lng: -122.282482};
            }

            var map = new google.maps.Map(document.getElementById('map'), {
              center: current,
              scrollwheel: false,
              zoom: 7
            });

            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map
            });

            // Set destination, origin and travel mode.
            var request = {
              destination: g2l,
              origin: current,
              travelMode: google.maps.TravelMode.DRIVING
            };

            // Pass the directions request to the directions service.
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                // Display the route on the map.
                directionsDisplay.setDirections(response);
              }
            });

          }


          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

          function success(pos) {
            var crd = pos.coords;
            var current = {lat: crd.latitude, lng: crd.longitude};
            angular.element(document.querySelector('#spinner')).remove();  
            google.maps.event.addDomListener(window, 'load', initMap(current));
          };

          function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
          };

          



          //     
           element.bind("click", function(e){
            angular.element(document.querySelector('#map')).remove();              
            var childNode = $compile('<div id="spinner" style="margin-top: 2em"><i class="fa fa fa-wrench faa-wrench animated fa-5x faa-fast" ></i></div><div id="map" "style="border: 1px solid black" ></div>')(scope)
            element.parent().append(childNode);       
            console.log(scope["info"]);  

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error, options);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }



           });

            scope.doStuff = function(){                   
              // do stuff
            }
        }
    }
   });

