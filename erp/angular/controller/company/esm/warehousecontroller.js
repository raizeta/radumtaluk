myAppModule.controller("NewEsmWarehouseController", ["$scope", "$location","$http", "authService", "auth","$window", 
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

myAppModule.controller("ListEsmWarehouseController", ["$scope", "$location","$http", "authService", "auth","$window",
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
myAppModule.controller("DetailEsmWarehouseController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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
myAppModule.controller("EditEsmWarehouseController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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

myAppModule.controller("DeleteEsmWarehouseController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path('/erp/masterbarang/list/suplier');
}]);