'use strict';
myAppModule.controller("CategorysController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","CategoryService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,CategoryService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CategoryController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","CategoryService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,CategoryService) 
{   
    var idCategory = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CategoryNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","CategoryService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,CategoryService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CategoryEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","CategoryService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,CategoryService) 
{   
    var idCategory = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CategoryDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","CategoryService" 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,CategoryService) 
{   
    var idCategory = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);