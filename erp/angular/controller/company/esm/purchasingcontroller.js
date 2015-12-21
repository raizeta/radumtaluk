myAppModule.controller("NewEsmPurchasingController", ["$scope", "$location","$http", "authService", "auth","$window", 
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

myAppModule.controller("ListEsmPurchasingController", ["$scope", "$location","$http", "authService", "auth","$window",
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
myAppModule.controller("DetailEsmPurchasingController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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
myAppModule.controller("EditEsmPurchasingController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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

myAppModule.controller("DeleteEsmPurchasingController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path('/erp/masterbarang/list/suplier');
}]);