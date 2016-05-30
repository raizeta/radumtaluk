myAppModule.controller("MenuController", ["$q","$rootScope","$scope", "$location","$http","auth","$window", 
function ($q,$rootScope,$scope, $location, $http,auth,$window) 
{   
    $scope.activemenu  = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.chat = function()
    {
        alert("Lets Chat");
    }
    $scope.telepon = function()
    {
        alert("Lets Call");
    }


}]);