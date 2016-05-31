'use strict';
myAppModule.controller("DistributorsController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","DistributorService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,DistributorService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DistributorController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","DistributorService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,DistributorService) 
{   
    var idDistributor = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DistributorNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","DistributorService",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,DistributorService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DistributorEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","DistributorService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,DistributorService) 
{   
    var idDistributor = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DistributorDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","DistributorService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,DistributorService) 
{   
    var idDistributor = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);