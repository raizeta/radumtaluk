'use strict';
myAppModule.controller("UnitBarangsController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","UnitBarangService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,UnitBarangService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("UnitBarangController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","UnitBarangService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,UnitBarangService) 
{   
    var idUnitBarang = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("UnitBarangNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","UnitBarangService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,UnitBarangService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("UnitBarangEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","UnitBarangService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,UnitBarangService) 
{   
    var idUnitBarang = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("UnitBarangDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","UnitBarangService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,UnitBarangService) 
{   
    var idUnitBarang = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);