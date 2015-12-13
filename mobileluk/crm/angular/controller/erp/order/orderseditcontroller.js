myAppModule.controller("EditRequestOrderController", ["$scope", "$location","$http", "authService", "auth","$window", "$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{

    $scope.idrequestorder = $routeParams.idrequestorder;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("EditSalesOrderController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{

    $scope.idsalesorder = $routeParams.idsalesorder;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);


myAppModule.controller("EditPurchaseOrderController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams", function ($scope, $location, $http, authService, auth,$window,$routeParams) 
{

    $scope.idpurchaseorder = $routeParams.idpurchaseorder;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);