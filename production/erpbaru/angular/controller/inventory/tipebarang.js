'use strict';
myAppModule.controller("TipeBarangsController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","TipeBarangService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,TipeBarangService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    TipeBarangService.GetTipeBarangs()
    .then(function (result)
    {
        $scope.types = result.Tipebarang;
    });
}]);
myAppModule.controller("TipeBarangController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","TipeBarangService",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,TipeBarangService) 
{   
    var idTipeBarang = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("TipeBarangNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","TipeBarangService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,TipeBarangService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("TipeBarangEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","TipeBarangService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,TipeBarangService) 
{   
    var idTipeBarang = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("TipeBarangDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","TipeBarangService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,TipeBarangService) 
{   
    var idTipeBarang = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);