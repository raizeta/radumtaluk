'use strict';
myAppModule.controller("CustomersController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","CustomerService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,CustomerService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CustomerController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","CustomerService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,CustomerService) 
{   
    var idCustomer = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CustomerNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","CustomerService",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,CustomerService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CustomerEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","CustomerService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,CustomerService) 
{   
    var idCustomer = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("CustomerDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","CustomerService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,CustomerService) 
{   
    var idCustomer = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);