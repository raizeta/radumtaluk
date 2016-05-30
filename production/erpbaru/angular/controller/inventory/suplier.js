'use strict';
myAppModule.controller("SupliersController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","SuplierService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,SuplierService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("SuplierController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","SuplierService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,SuplierService) 
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
myAppModule.controller("SuplierNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","SuplierService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,SuplierService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("SuplierEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","SuplierService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,SuplierService) 
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
myAppModule.controller("SuplierDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","SuplierService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,SuplierService) 
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