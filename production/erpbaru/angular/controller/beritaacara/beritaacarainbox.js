'use strict';
myAppModule.controller("BeritaAcaraInboxController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

}]);