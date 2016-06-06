'use strict';
myAppModule.controller("ProductsController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,sweet) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    ProductService.GetProducts()
    .then(function (result) 
    {
        $scope.products = result.BarangUmums;
        console.log($scope.products);
        $scope.loading = true;
    });

    $scope.deleteproduct = function(barangumum)
    {
        $scope.loading  = false;
        sweet.show({
            title: 'Confirm',
            text: 'Are You Sure To Delete This Product ' + barangumum.NM_BARANG,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yeah. I Like This!',
            closeOnConfirm: true,
            closeOnCancel: true
        }, 
        function(isConfirm) 
        {
            if (isConfirm) 
            {
                // $location.path('/product/' + barangumum.ID);
                // $scope.$apply();
                $scope.shownoticealert = true;
                $scope.products = _.without($scope.products,barangumum);
                $scope.$apply();

            }
        });
    }
}]);

myAppModule.controller("ProductController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ProductService) 
{   
    var $id = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    ProductService.GetProduct($id)
    .then(function (result) 
    {
        $scope.product = result;
    });
  

}]);

myAppModule.controller("ProductNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("ProductEditController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ProductService) 
{   
    var $id = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    ProductService.GetProduct($id)
    .then(function (result) 
    {
        $scope.product = result;
    });

}]);

myAppModule.controller("ProductDeleteController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","$routeParams","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$routeParams,ProductService) 
{   
    var idProduct = $routeParams.id;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

}]);