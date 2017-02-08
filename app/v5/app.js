"use strict";
var app = angular.module( "app", ['ngRoute'] , function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl",
    resolve: {
      "accommodation": function( $q, $timeout, $http ) {
        var myFriend = $q.defer();
          myFriend.resolve({
            hotelName: function( ) {
              return $http.get('https://fierce-hollows-55761.herokuapp.com/api/user', { timeout: 15000})
                  .then(function(response) {
                      if (typeof response.data === 'object') {
                          return "Room found";

                      } else {
                          // invalid response
                          return $q.reject("Room not found");
                      }

                  }, function(response) {
                      // something went wrong
                      return $q.reject("room not found");
                  });
            
            },
            roomNo: function( ) {
              return "404";
            }
          });
        return myFriend.promise;
      }
    }
  });
} );
app.controller( "TourCoordinatorCtrl", function( $scope, accommodation ) {
  $scope.name = "Shidhin";
  $scope.place = "Switzerland";
  accommodation.hotelName()
  .then(function(data) {
      $scope.hotel = data;
     
    }, function(error) {
        // promise rejected, could log the error with: console.log('error', error);
        $scope.hotel = error;
    });
  $scope.roomno = accommodation.roomNo( );
} );