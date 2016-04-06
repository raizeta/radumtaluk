myAppModule.controller("DashCompAlgPurchasingController", ["$scope", "$location","$http", "authService", "auth","$window", 
    function ($scope, $location, $http, authService, auth,$window) 
{

    // $scope.loading  = true;
    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);

myAppModule.controller("DashCompAlgWarehouseController", ["$scope", "$location","$http", "authService", "auth","$window",
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
myAppModule.controller("DashCompAlgSalesController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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
myAppModule.controller("DashCompAlgMarketingController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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

