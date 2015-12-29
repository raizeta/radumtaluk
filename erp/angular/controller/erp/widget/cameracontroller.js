myAppModule.controller("CameraController", ["$scope", "$location","$http", "authService", "auth","$window", "$cordovaCamera","Camera",
function ($scope, $location, $http, authService, auth,$window,$cordovaCamera,Camera) 
{

  	


  $scope.jepret = function () {


    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });


  };

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);


myAppModule.controller("PosisiController", ["$scope", "$location","$http", "authService", "auth","$window", "$cordovaCamera","Camera",
function ($scope, $location, $http, authService, auth,$window,$cordovaCamera,Camera) 
{

  	


  $scope.jepret = function () {


    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });


  };

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);