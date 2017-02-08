"use strict";

var app = angular.module( "app", ['ngRoute'] );

app.config( function( $routeProvider ) {
  $routeProvider.when( "/visitplace", {
    templateUrl: "placetovisit.html",
    controller: "TourCoordinatorCtrl"
  } );
} );


app.controller( "TourCoordinatorCtrl", function( $scope, $q, $http ) {
  
  $scope.x = true;

  var firstHttp = function() {
    var deferred = $q.defer()
    if($scope.x) {
      data = 'x was true'
       deferred.resolve(data);
    } else {
      $http.get('test.json')
      .then(function(data) {
        $scope.data1 = data;
        deferred.resolve(data);
      })
    }  
    return deferred.promise
  }

  $scope.myGetterFn = function() {
    firstHttp()
    .then(function(data) 
    {
      data.data ? $scope.data1 = data : $scope.datax = data;
        $http.get('test2.json')
          .then(function(data2) 
          {
              $scope.data2 = data2
              $http.get('test3.json')
                .then(function(data3) 
                {
                    $scope.data3 = data3
                })
          })
      })
  }
} );