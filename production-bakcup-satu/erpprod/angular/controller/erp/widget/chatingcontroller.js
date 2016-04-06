myAppModule.controller("NewChatingController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("ListChatingController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    } 
}]);

myAppModule.controller("DetailChatingController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{
    $scope.userInfo = auth;
    $scope.idChating = $routeParams.idChating;
    alert($scope.idChating);
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    } 
}]);

myAppModule.controller("EditChatingController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{
    $scope.userInfo = auth;
    $scope.idChating = $routeParams.idChating;

    alert($scope.idmemo);
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    } 
}]);

myAppModule.controller("DeleteChatingController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }  
}]);