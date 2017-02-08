"use strict";

var app = angular.module( "app", ['ngRoute'] );

app.config( function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl"
  } );
} );

app.factory( "accommodation", function($q, $http ) {
    return {
      hotelName: function(){
        var deferred = $q.defer();
          
          $http.get('https://fierce-hollows-55761.herokuapp.com/api/user', { timeout: 15000})
            .then(function(response) {
                if (typeof response.data === 'object') {
                    return deferred.resolve("Room found");
                    //return deferred.notify("pending");
                } else {
                    // invalid response
                    return deferred.reject("Room not found");
                }

            }, function(response) {
                // something went wrong
                return deferred.reject("room not found");
            });
            
          return deferred.promise;
        },
      roomNo: function(){
        return "404";
      }
    }
} );

app.controller( "TourCoordinatorCtrl", function( $scope, accommodation ) {
  $scope.name = "Shidhin";
  $scope.place = "Switzerland";
  console.log(accommodation);
  accommodation.hotelName()
  .then(function(data) {
      $scope.hotel = data;
     
    }, function(error) {
        // promise rejected, could log the error with: console.log('error', error);
        $scope.hotel = error;
    }, function(notify){
      $scope.hotel = notify;
    });
  $scope.roomno = accommodation.roomNo( );
} );