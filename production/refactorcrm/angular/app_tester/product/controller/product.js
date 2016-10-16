'use strict';
myAppModule.controller("ProductController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductFac) 
{   
    $scope.activeproduct   = "active";
    $scope.userInfo     = auth;
	$scope.logout       = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    ProductFac.GetProducts()
    .then(function(response)
    {
    	$scope.products = response;
    },
    function(error)
    {
    	console.log(error);
    })
    .finally(function()
	{

	});
});



