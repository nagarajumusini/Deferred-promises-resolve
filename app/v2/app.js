"use strict";
var app = angular.module( "app", ['ngRoute'] );
app.config( function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl"
  } );
} );
app.factory( "accommodation", function( $timeout ) {
  return {
    hotelName: function( scope ) {
      $timeout(function(){
        scope.hotel = "Some hotel";
      },3000);
      return "---";
    },
    roomNo: function( scope ) {
      $timeout(function(){
        scope.roomno = "103";
      },3000);
      return "---";
    }
  };
} );
app.controller( "TourCoordinatorCtrl", function( $scope, accommodation ) {
  $scope.name = "Shidhin";
  $scope.place = "Switzerland";
  $scope.hotel = accommodation.hotelName( $scope );
  $scope.roomno = accommodation.roomNo( $scope );
} );