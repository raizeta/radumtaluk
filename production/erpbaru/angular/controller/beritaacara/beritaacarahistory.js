'use strict';
myAppModule.controller("BeritaAcaraHistoryController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout) 
{   
    $scope.datatab = 
    {
      selectedIndex: 2,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

}]);