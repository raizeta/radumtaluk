'use strict';
myAppModule.controller("SalesmanController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout) 
{   
    var tanggalplan = $filter('date')('2016-10-15','yyyy-MM-dd');
    $scope.activesalesman = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
});



