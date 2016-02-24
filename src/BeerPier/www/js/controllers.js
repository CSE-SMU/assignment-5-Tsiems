angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $http, $timeout) {



  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
  $scope.organicChoices = ["Any", "Yes", "No"];
  $scope.organic = {};
  $scope.organic.index = 0;
  $scope.categories = [
    {
      "id" : 1,
      "name" : "British Origin Ales"
    },
    {
      "id" : 2,
      "name" : "Irish Origin Ales"
    },
    {
      "id" : 3,
      "name" : "North American Origin Ales"
    },
    {
      "id" : 4,
      "name" : "German Origin Ales"
    },
    {
      "id" : 5,
      "name" : "Belgian And French Origin Ales"
    },
    {
      "id" : 6,
      "name" : "International Ale Styles"
    },
    {
      "id" : 7,
      "name" : "European-germanic Lager"
    },
    {
      "id" : 8,
      "name" : "North American Lager"
    },
    {
      "id" : 9,
      "name" : "Other Lager"
    },
    {
      "id" : 10,
      "name" : "International Styles"
    },
    {
      "id" : 11,
      "name" : "Hybrid/mixed Beer"
    },
    {
      "id" : 12,
      "name" : "Mead, Cider, & Perry"
    }
  ];


  $scope.search = {};
  // $scope.search.name = "";
  // $scope.search.abv = "";
  // $scope.search.ibu = "";


  $scope.search.abvGreater = true;
  $scope.search.ibuGreater = true;






  $scope.search = function() {
    var data = {
      hasLabels: "Y"
    };

    if( $scope.search.beername ) {
      data.name = $scope.search.beername;
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
    if( $scope.search.year ) {
      data.year = $scope.search.year;
    }

     //watching $scope.myResource for changes
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers',
      params: data
    }).then(function successCallback(response) {
        // console.log(response);
        // console.log(data);

        BeerData.data = response.data.data;
        $state.go('app.beers');

        // $scope.$watch('beers.beers', function(newData) {
        //   $scope.beers.beers = newData;
        // });
        // $timeout(function () {
        //   var myarray = Array.prototype.slice.call(response.data.data,0,10);
        //
        //
        //   console.log(myarray);
        //   $scope.beers.beers = myarray;
        //   console.log($scope.beers.beers);
        // }, 10);
        // console.log(response.data.data);
        // console.log(angular.isArray($scope.beers.beers));
        // $scope.beers.beers = response.data;
        // console.log(angular.isArray($scope.beers.beers));


        // $scope.beername = response.data[0].name;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

    });
  };

})

.factory('BeerData', function() {
  return { data: {}, selectedData: 0,
    colors: {1:"#FFE699",2:"#FFD878",3:"#FFCA5A",4:"#FFBF42",5:"#FBB123",6:"#F8A600",7:"#F39C00",8:"#EA8F00",
    9:"#E58500",10:"#DE7C00",11:"#D77200",12:"#CF6900",13:"#CB6200",14:"#C35900",15:"#BB5100",16:"#B54C00",
    17:"#B04500",18:"#A63E00",19:"#A13700",20:"#9B3200",21:"#952D00",22:"#8E2900",23:"#882300",24:"#821E00",
    25:"#7B1A00",26:"#771900",27:"#701400",28:"#6A0E00",29:"#660D00",30:"#5E0B00",31:"#5A0A02",32:"#600903",
    33:"#520907",34:"#4C0505",35:"#470606",36:"#440607",37:"#3F0708",38:"#3B0607",39:"#3A070B",40:"#36080A"
    }
 };
})

.controller('BeersCtrl', function($scope, $state, BeerData) {
  $scope.beers = {};
  $scope.beers.data = BeerData.data;

  console.log(BeerData.data);

  // $scope.beers.beers = [5,7,8];
  console.log("reset");

  $scope.srmColor = function(srmVal) {
    // console.log(srmVal + " " + BeerData.colors[(srmVal)]);
    return {'background-color': BeerData.colors[(srmVal)]};
  }

  // $scope.getResults = function() {
  //   console.log("Woohoo!");
  //   console.log($scope.organicChoices[$scope.organic.index]);
  //   $scope.getBeers();
  //   console.log($scope.beers.beers);
  //
  // };
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
  console.log($stateParams.beerId);
  // $scope.spot = $stateParams.beerId;
  $scope.beer = BeerData.data[($stateParams.beerId)];
  $scope.srmColor = function(srmVal) {
    // console.log(srmVal + " " + BeerData.colors[(srmVal)]);
    return {'background': BeerData.colors[(srmVal)]};
  }
  console.log($scope.beer);
});
