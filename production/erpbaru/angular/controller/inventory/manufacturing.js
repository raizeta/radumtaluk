'use strict';
myAppModule.controller("ManufacturingsController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ManufacturingService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ManufacturingService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ManufacturingController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ManufacturingService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ManufacturingService) 
{   
    var idManufacturing = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ManufacturingNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ManufacturingService",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ManufacturingService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ManufacturingEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ManufacturingService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ManufacturingService) 
{   
    var idManufacturing = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ManufacturingDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ManufacturingService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ManufacturingService) 
{   
    var idManufacturing = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);