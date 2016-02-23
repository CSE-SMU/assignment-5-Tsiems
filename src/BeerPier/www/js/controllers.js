angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $http) {
  $scope.organicChoices = ["Any", "Yes", "No"];
  $scope.organic = {};
  $scope.organic.index = 0;

  $scope.search = {};
  $scope.search.name = "";
  $scope.search.abv = "";
  $scope.search.ibu = "";

  $scope.search.abvGreater = true;
  $scope.search.ibuGreater = true;

  $scope.beers = {};
  $scope.beers.beers = [5,7,8];
  console.log($scope.beers.beers);
  console.log("reset");

  $scope.getBeer = function() {
    var data = {
      key: '77b766eded59b064556e04a254bc521c'
    };

    console.log($scope.search.name);
    if( $scope.search.name ) {
      data.name = $scope.search.name;
    }
    if( $scope.search.abv ) {
      var direction = "+";
      if( !$scope.search.abvGreater ) {
        direction = "-";
      }
      data.abv = direction + $scope.search.abv;
    }
    if( $scope.search.ibu ) {
      var direction = "+";
      if( !$scope.search.abvGreater ) {
        direction = "-";
      }
      data.ibu = direction + $scope.search.ibu;
    }
    if( $scope.organic.index ) {
      if( $scope.organic.index == 1) {
        data.isOrganic = "Y";
      }
      else {
        data.isOrganic = "N";
      }
    }

    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',
      params: data
    }).then(function successCallback(response) {
        console.log(response);
        console.log(data);

        console.log(response.data.data);
        console.log(angular.isArray($scope.beers.beers));
        $scope.beers.beers = response.data;
        console.log(angular.isArray($scope.beers.beers));

        // $scope.beername = response.data[0].name;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
  };

  $scope.getResults = function() {
    console.log("Woohoo!");
    console.log($scope.organicChoices[$scope.organic.index]);
    $scope.getBeer();
    $state.go('app.results');
  };


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

// .controller('PlaylistsCtrl', function($scope, $http) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
//
//   $scope.getBeer = function() {
//     var data = {
//       key: '77b766eded59b064556e04a254bc521c',
//       ibu: '+50'
//     };
//
//     $http({
//       method: 'GET',
//       url: 'https://salty-taiga-88147.herokuapp.com/beers',
//       params: data
//     }).then(function successCallback(response) {
//         console.log(response);
//
//         // $scope.beername = response.data[0].name;
//       }, function errorCallback(response) {
//         // called asynchronously if an error occurs
//         // or server returns response with an error status.
//     });
//   };
//
//   // $scope.getBeer();
//
// })
//
// .controller('PlaylistCtrl', function($scope, $stateParams) {
// })

// .controller('BeerCtrl', function($scope, $http, $state) {
//
//   $scope.goToSearch = function() {
//     $state.go('app.search');
//   };
//
//
//
//   $scope.getBeer = function() {
//     var data = {
//       key: '77b766eded59b064556e04a254bc521c',
//       ibu: '+50'
//     };
//
//     $http({
//       method: 'GET',
//       url: 'https://salty-taiga-88147.herokuapp.com/beers',
//       params: data
//     }).then(function successCallback(response) {
//         console.log(response);
//
//         // $scope.beername = response.data[0].name;
//       }, function errorCallback(response) {
//         // called asynchronously if an error occurs
//         // or server returns response with an error status.
//     });
//   };
//
//   $scope.getResults = function() {
//     console.log("Woohoo!");
//     console.log($scope.organic);
//     $state.go('app.results');
//   };
//   // $scope.getBeer();
//
// })
//
// .controller('BeerCtrl', function($scope, $stateParams) {
// });
