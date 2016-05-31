'use strict';
myAppModule.controller("WarehousesController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","WarehouseService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,WarehouseService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("WarehouseController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","WarehouseService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,WarehouseService) 
{   
    var idWarehouse = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("WarehouseNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","WarehouseService",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,WarehouseService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("WarehouseEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","WarehouseService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,WarehouseService) 
{   
    var idWarehouse = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("WarehouseDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","WarehouseService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,WarehouseService) 
{   
    var idWarehouse = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);