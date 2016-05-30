'use strict';
myAppModule.controller("ProductsController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ProductController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ProductService) 
{   
    var idProduct = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ProductNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ProductEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ProductService) 
{   
    var idProduct = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("ProductDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ProductService) 
{   
    var idProduct = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);