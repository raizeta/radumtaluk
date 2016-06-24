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
        // sweet.show({
        //     title: 'Confirm',
        //     text: 'Are You Sure To Delete This Product ' + barangumum.NM_BARANG,
        //     type: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#DD6B55',
        //     confirmButtonText: 'Yeah. I Like This!',
        //     closeOnConfirm: true,
        //     closeOnCancel: true
        // }, 
        // function(isConfirm) 
        // {
        //     if (isConfirm) 
        //     {
        //         // $location.path('/product/' + barangumum.ID);
        //         // $scope.$apply();
        //         alert("Product Berhasil Di Delete");
        //         $scope.products = _.without($scope.products,barangumum);
        //         $scope.$apply();


        //     }
        // });
        var r = confirm("Are You Sure?");
        if(r == true)
        {
            
            $scope.products = _.without($scope.products,barangumum);
            // $scope.$apply();
            alert("delete");
        }
    }
    $scope.tableSelection = {};
    $scope.chekuncek = "CHECK";

    $scope.checkall = function()
    {
        var selectionlength = _.size($scope.tableSelection)
        if (selectionlength == 0)
        {
            angular.forEach($scope.products, function(row, index) 
            {
                $scope.tableSelection[index] = true;
            });
            $scope.deletebutton = true;
            $scope.chekuncek = "UNCHECK";
        }
        else
        {
            $scope.tableSelection = {};
            $scope.deletebutton   = false;
            $scope.chekuncek = "CHECK";
        }
    }
    $scope.bulkdelete = function()
    {
        for (var i = $scope.products.length - 1; i >= 0; i--) 
        {
            if ($scope.tableSelection[i]) 
            {
                $scope.products.splice(i, 1);
                delete $scope.tableSelection[i];
            }
        }
        $scope.deletebutton   = false;
        $scope.chekuncek = "CHECK";
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
        console.log($scope.product);
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