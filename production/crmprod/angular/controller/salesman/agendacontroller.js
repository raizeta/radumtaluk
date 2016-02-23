'use strict';
myAppModule.controller("AgendaController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter",
function ($scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter) 
{
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });
    
    //var tanggals = new Date();
    var tanggal = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.loading  = true;
    var idsalesman = auth.id;
    // var tanggal = "2016-02-02";
    apiService.listagenda(idsalesman,tanggal)
    .then(function (result) 
    {
        var idgroupcustomer;
        angular.forEach(result.JadwalKunjungan, function(value, key) 
        {
          idgroupcustomer =value.SCDL_GROUP;
        });

        singleapiService.singlelistgroupcustomer(idgroupcustomer)
        .then(function (result) 
        {
            console.log(result);
            $scope.customers = result.Customer;
            $scope.loading  = false;
        });
    });
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("MapAgendaController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService",
function ($scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService) 
{
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });

    $scope.loading  = true;
    var idsalesman = auth.id;
    var tanggal = $filter('date')(new Date(),'yyyy-MM-dd');
    apiService.listagenda(idsalesman,tanggal)
    .then(function (result) 
    {
        var idgroupcustomer;
        angular.forEach(result.JadwalKunjungan, function(value, key) 
        {
          idgroupcustomer =value.SCDL_GROUP;
        });

        singleapiService.singlelistgroupcustomer(idgroupcustomer)
        .then(function (result) 
        {
            console.log(result);
            $scope.customers = result.Customer;
            $scope.loading  = false;
        });
    });
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);