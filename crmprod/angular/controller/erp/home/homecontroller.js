'use strict';
myAppModule.controller("HomeController", ["$scope", "$location","$http", "authService", "auth","$window","apiService",
function ($scope, $location, $http, authService, auth,$window,apiService) 
{
    
    $scope.newcustomer = function()
    {
        $location.path('/customer');
    }

    apiService.listcustomer()
    .then(function (result) 
    {
        $scope.customers = result.gps;
        $scope.loading  = false;
        console.log($scope.customers);   
    });

    $scope.viscustomer = function()
    {
        $location.path('/visit');
    }

    $scope.reportase = function()
    {
        $location.path('/report');
    }

    $scope.profile = function()
    {
        $location.path('/profile');
    }

    $scope.mapcustomer = function()
    {
        $location.path('/mapcustomer');
    }

    $scope.userInfo = auth;

	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);



