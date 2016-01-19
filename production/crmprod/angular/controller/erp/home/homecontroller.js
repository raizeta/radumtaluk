'use strict';
myAppModule.controller("HomeController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService",
function ($scope, $location, $http, authService, auth,$window,apiService,regionalService) 
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

    regionalService.listpropinsi()
    .then(function (result) 
    {
        $scope.propinsis = result.Propinsi;  
    });

    var kab = regionalService.listkabupaten()
    .then(function (result) 
    {
        $scope.kabupatens = result.Kabupaten; 
        return result; 
    });

    $scope.changeprovinsi=function()
    {
        
    }

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



