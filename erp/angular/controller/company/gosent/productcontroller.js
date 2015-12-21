myAppModule.controller("NewGosentProductController", ["$scope", "$location","$http", "authService", "auth","$window", 
    function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);

myAppModule.controller("ListGosentProductController", ["$scope", "$location","$http", "authService", "auth","$window",
function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.loading  = true;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DetailGosentProductController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);
myAppModule.controller("EditGosentProductController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;

    $scope.logout = function () 
    {  
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DeleteGosentProductController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path('/erp/masterbarang/list/suplier');
}]);