myAppModule.controller("NewEmailController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("ListEmailController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("DetailEmailController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{

    $scope.userInfo = auth;
    $scope.idberitaacara = $routeParams.idberitaacara;
    alert($scope.idberitaacara);
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("EditEmailController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{

    $scope.userInfo = auth;
    $scope.idberitaacara = $routeParams.idberitaacara;

    alert($scope.idberitaacara);
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("DeleteEmailController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);