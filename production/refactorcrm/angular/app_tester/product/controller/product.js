'use strict';
myAppModule.controller("ProductController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductFac,ModalService) 
{   
    $scope.activeproduct   = "active";
    $scope.userInfo     = auth;
	$scope.logout       = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    ProductFac.GetSearchProductsAll()
    .then(function(response)
    {
        $scope.productsactive       = [];
        $scope.productsnonactive    = [];
        angular.forEach(response,function(value,key)
        {
            if(value.STATUS === 1)
            {
              $scope.productsactive.push(value);  
            }
            else
            {
               $scope.productsnonactive.push(value); 
            }
        });
    },
    function(error)
    {
    	console.log(error);
    })
    .finally(function()
	{

	});

    $scope.showmodal = function(item,oldstatus) 
    {
        ModalService
        .showModal(
        {
          templateUrl: "angular/app_tester/product/views/productmodal.html",
          controller: "ProductModalController",
          inputs: 
          {
            title: item
          }
        })
        .then(function(modal) 
        {
            modal.element.modal(function ()
            {
                alert("Button OK Klick");
            });
            modal.close.then(function(result) 
            {
                var status = result.list.STATUS;
                if(status !== oldstatus)
                {
                    if(status === 0)
                    {
                       var productindex = _.findIndex($scope.productsactive,{KD_BARANG:result.list.KD_BARANG});
                       var x            = $scope.productsactive.splice(productindex,1)[0]; 
                       $scope.productsnonactive.push(x);
                    }
                    else
                    {
                        var productindex = _.findIndex($scope.productsnonactive,{KD_BARANG:result.list.KD_BARANG});
                        var x            = $scope.productsnonactive.splice(productindex,1)[0]; 
                        $scope.productsactive.push(x);  
                    }
                    ProductFac.UpdateProduct(result.list.ID,result.list.STATUS)
                    .then(function(response)
                    {
                        console.log("Products Berhasil Di Update");
                    },
                    function(error)
                    {
                        alert("Products Gagal Di Update.Try Again");
                    });
                }
            });
        });   
    };
});

myAppModule.controller('ProductModalController',
function($rootScope,$scope, $http,$element, title, close,$filter) 
{

    $scope.title = title.NM_BARANG;
    $scope.list  = title;
    $scope.close = function() 
    {
        close({list:title,title:$scope.title}, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.cancel = function() 
    {
        $element.modal('hide');
    };
});

