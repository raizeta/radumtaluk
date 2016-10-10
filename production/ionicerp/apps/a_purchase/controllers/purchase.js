
angular.module('starter')
 .controller('PurchaseCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService,StorageService,PurchaseFac) 
{

})

.controller('PurchaseInboxCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,$ionicModal,UtilService,StorageService,PurchaseFac) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);
    PurchaseFac.SearchPurchases(103)
    .then (function (response)
    {
        $scope.purchaselist     = response;
        
    },
    function (error)
    {

    });

    $scope.openModal = function(item) 
    {
        $ionicModal.fromTemplateUrl('apps/a_purchase/views/purchasemodal.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $scope.detailpurchase   = item;
            $scope.modal            = modal;
            $scope.modal.show();
        });
        
    };
    $scope.closeModal = function() 
    {
        $scope.modal.hide();
    };
})
.controller('PurchaseInboxDetailCtrl', function($window,$timeout,$rootScope,$stateParams,$scope,$state,$ionicPopup,$ionicLoading,UtilService,StorageService,PurchaseDetailFac,resPurchaceList) 
{
    var KD_PO = $stateParams.id;
    $ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);

    $scope.purchaselist     = resPurchaceList;
    $rootScope.total        = UtilService.SumPriceQtyWithCondition($scope.purchaselist,'HARGA','QTY','checked');

    $scope.toggleChange = function(item) 
    {
        if(item.checked)
        {
            $rootScope.total = $rootScope.total + (item.HARGA * item.QTY);
        }
        else
        {
          $rootScope.total = $rootScope.total - (item.HARGA * item.QTY);  
        }
        PurchaseDetailFac.UpdatePurchaseDetail(item)
        .then (function(response)
        {
            console.log("Purchase Berhasil Di Update");
        });
    };
    $scope.confirmasi = function(statusaprove)
    {
        if(statusaprove === 'aprove')
        {
            if($scope.total == 0)
            {
                alert("PO Tidak Bisa Di Aprove.Minimal Satu Item Harus Di Aprove");
            }
            else
            {
                var confirmPopup = $ionicPopup.confirm
                ({
                    title: 'Aprove',
                    template: 'Are You Sure To Aprove This PO?',
                    cancelText:'Cancel',
                    cancelType:'button-assertive',
                });

                confirmPopup.then(function(res) 
                {
                    if(res) 
                    {
                        var detail = {id:$stateParams.id,'status_aprove':true};
                        StorageService.set('id_po',detail);
                        $state.go('main.po.inbox');
                    } 
               });
            }  
        }
        else
        {
            var confirmPopup = $ionicPopup.confirm
            ({
                title: 'Reject',
                template: 'Are You Sure To Reject This PO?',
                cancelText:'Cancel',
                cancelType:'button-assertive',
            });

            confirmPopup.then(function(res)
            {
                if(res) 
                {
                    var detail = {id:$stateParams.id,'status_aprove':false};
                    StorageService.set('id_po',detail);
                    $state.go('main.po.inbox');
                }
            });  
        }
    }
})
.controller('PurchaseAcceptCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,$ionicModal,PurchaseFac) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });

    PurchaseFac.SearchPurchases(102)
    .then (function (response)
    {
        $scope.purchaselist     = response;
    })
    .finally(function()
    {
        $ionicLoading.hide();   
    });

    $scope.openModal = function(item) 
    {
        $ionicModal.fromTemplateUrl('apps/a_purchase/views/purchasemodal.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $scope.detailpurchase   = item;
            $scope.modal            = modal;
            $scope.modal.show();
        });
        
    };
    $scope.closeModal = function() 
    {
        $scope.modal.hide();
    };
})
.controller('PurchaseAcceptDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService,resPurchaceList) 
{
    $scope.purchaselist     = resPurchaceList;
    $rootScope.total        = UtilService.SumPriceQtyWithCondition($scope.purchaselist,'HARGA','QTY','checked');
    $rootScope.totalall     = UtilService.SumPriceWithQty($scope.purchaselist,'HARGA','QTY');
})
.controller('PurchaseRejectCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,$ionicModal,StorageService,PurchaseFac) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    PurchaseFac.SearchPurchases(102)
    .then (function (response)
    {
        $scope.purchaselist     = response;
    })
    .finally(function()
    {
        $ionicLoading.hide();   
    });

    $scope.openModal = function(item) 
    {
        $ionicModal.fromTemplateUrl('apps/a_purchase/views/purchasemodal.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $scope.detailpurchase   = item;
            $scope.modal            = modal;
            $scope.modal.show();
        }); 
    };
    $scope.closeModal = function() 
    {
        $scope.modal.hide();
    };
})
.controller('PurchaseRejectDetailCtrl', function($window,$rootScope,$scope,UtilService,resPurchaceList) 
{
    $scope.purchaselist     = resPurchaceList;
    $rootScope.total        = UtilService.SumPriceQtyWithCondition($scope.purchaselist,'HARGA','QTY','checked');
    $rootScope.totalall     = UtilService.SumPriceWithQty($scope.purchaselist,'HARGA','QTY');
});