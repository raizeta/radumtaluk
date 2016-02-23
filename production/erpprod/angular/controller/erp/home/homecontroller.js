'use strict';
myAppModule.controller("HomeController", ["$scope", "$location","$http", "authService", "auth","$window","ngToast",
function ($scope, $location, $http, authService, auth,$window,ngToast) 
{
	ngToast.create('Welcome To Lukison Group...');
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

