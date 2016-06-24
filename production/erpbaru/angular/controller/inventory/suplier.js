'use strict';
myAppModule.controller("SupliersController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","SuplierService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,SuplierService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    SuplierService.GetSupliers()
    .then(function (result)
    {
        $scope.supliers = result.Suplier;
    });
}]);
myAppModule.controller("SuplierController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","SuplierService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,SuplierService) 
{   
    var idSuplier = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("SuplierNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","SuplierService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,SuplierService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("SuplierEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","SuplierService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,SuplierService) 
{   
    var idSuplier = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("SuplierDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","SuplierService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,SuplierService) 
{   
    var idSuplier = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);