myAppModule.controller("NewDistributorController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $scope.submitForm = function(barangumum)
    {
        $scope.loading =true;
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }   
}]);

myAppModule.controller("ListDistributorController", ["$scope", "$location","$http", "authService", "auth","$window","$cordovaBarcodeScanner", "apiService",
function ($scope, $location, $http, authService, auth,$window,$cordovaBarcodeScanner,apiService) 
{  
    $scope.loading  = true;
    $scope.userInfo = auth;

    apiService.listdistributor()
    .then(function (result) 
    {
        $scope.distributors = result.Distributor;
        $scope.loading = false;
    });

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailDistributorController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    $http.get('')
    .success(function(data,status, headers, config) 
    {

        
    })

    .error(function (data, status, header, config) 
    {
           $location.path('/error/404');
    }).

    finally(function()
    {
        $scope.loading = false ;
    });

    
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("EditDistributorController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    $http.get('')
    .success(function(data,status, headers, config) 
    {
    
    })

    .error(function (data, status, header, config) 
    {
           $location.path('/error/404');
    }).

    finally(function()
    {
        $scope.loading = false ;
    });

    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("DeleteDistributorController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    // $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    
    alert($scope.iddistributor);
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);



