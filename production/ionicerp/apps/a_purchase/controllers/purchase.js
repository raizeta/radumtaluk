
angular.module('starter')
 .controller('PurchaseCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService,StorageService) 
{

})

.controller('PurchaseInboxCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,$ionicModal,UtilService,StorageService) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);
    
    var x                   = StorageService.get('id_po');
    $scope.purchaselist     = StorageService.get('purchase'); 
    if(x)
    {
        var existpo             = _.findIndex($scope.purchaselist , { id:parseInt(x.id)});
        $timeout(function()
        {
            var y = $scope.purchaselist.splice(existpo, 1);
            StorageService.set('purchase',$scope.purchaselist);
            StorageService.destroy('id_po');
            if(x.status_aprove)
            {
                var aproveitem = StorageService.get('purchase-aprove');
                if(aproveitem)
                {
                    aproveitem.push(y[0]);
                    StorageService.set('purchase-aprove',aproveitem);   
                }
                else
                {
                    StorageService.set('purchase-aprove',y);   
                } 
            }
            else
            {
                var rejectitem = StorageService.get('purchase-reject');
                if(aproveitem)
                {
                    rejectitem.push(y[0]);
                    StorageService.set('purchase-reject',rejectitem);   
                }
                else
                {
                    StorageService.set('purchase-reject',y);   
                } 
            }
        },2000);    
    }
    $ionicModal.fromTemplateUrl('apps/a_purchase/views/purchasemodal.html', 
    {
        scope: $scope
    })
    .then(function(modal) 
    {
        $scope.newUser = {ppn:'20 %',supliers:"PT.ZETA SHOP",email:'radumta@gmail.com',etd:'4 Hari'};
        $scope.modal = modal;
    });
    $scope.openModal = function() 
    {
        
        $scope.modal.show();
    };
    $scope.closeModal = function() 
    {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() 
    {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() 
    {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() 
    {
        // Execute action
    });
})
.controller('PurchaseInboxDetailCtrl', function($window,$timeout,$rootScope,$stateParams,$scope,$state,$ionicPopup,$ionicLoading,UtilService,StorageService) 
{
    $ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);
    $scope.settingsList = 
    [
        { id_detail:1,id_po:1,text: "Wireless", harga:12000,quantity:20,checked: true },
        { id_detail:2,id_po:1,text: "GPS", harga:12000,quantity:20,checked: true },
        { id_detail:3,id_po:1,text: "Bluetooth", harga:12000,quantity:20,checked: true },
        { id_detail:4,id_po:1,text: "Wireless", harga:12000,quantity:20,checked: true },
        { id_detail:5,id_po:1,text: "GPS", harga:12000,quantity:20,checked: true },
        { id_detail:6,id_po:1,text: "Bluetooth", harga:12000,quantity:20,checked: true },
        { id_detail:7,id_po:1,text: "Wireless", harga:12000,quantity:20,checked: true },
        { id_detail:8,id_po:1,text: "GPS", harga:12000,quantity:20,checked: true }
    ];
    $scope.total    = UtilService.SumPriceWithQty($scope.settingsList,'harga','quantity','checked');
    $scope.toggleChange = function(item) 
    {
        if(item.checked)
        {
            $scope.total = $scope.total + (item.harga * item.quantity);
        }
        else
        {
          $scope.total = $scope.total - (item.harga * item.quantity);  
        }
        // var existproduct = _.findIndex($scope.settingsList, item);
        // $scope.settingsList[existproduct] = item;
        // console.log($scope.settingsList);
        // $scope.total    = UtilService.SumPriceWithQty($scope.settingsList,'harga','quantity','checked');
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
.controller('PurchaseAcceptCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,StorageService) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);
    $scope.purchaselist     = StorageService.get('purchase-aprove');
    console.log($scope.purchaselist);
})
.controller('PurchaseAcceptDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);
    var settingsList = 
    [
        { id_detail:1,id_po:1,text: "Wireless", harga:12000,quantity:20,checked: false },
        { id_detail:2,id_po:1,text: "GPS", harga:12000,quantity:20,checked: true },
        { id_detail:3,id_po:1,text: "Bluetooth", harga:12000,quantity:20,checked: false },
        { id_detail:4,id_po:1,text: "Wireless", harga:12000,quantity:20,checked: true },
        { id_detail:5,id_po:1,text: "GPS", harga:12000,quantity:20,checked: false },
        { id_detail:6,id_po:1,text: "Bluetooth", harga:12000,quantity:20,checked: true },
        { id_detail:7,id_po:1,text: "Wireless", harga:12000,quantity:20,checked: false },
        { id_detail:8,id_po:1,text: "GPS", harga:12000,quantity:20,checked: true }
    ];
    $scope.settingsList = _.sortBy( settingsList, 'checked' ).reverse();
    $scope.total    = UtilService.SumPriceQtyWithCondition(settingsList,'harga','quantity','checked');
})
.controller('PurchaseRejectCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,StorageService) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);
    $scope.purchaselist     = StorageService.get('purchase-reject');
})
.controller('PurchaseRejectDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},500);
    var settingsList = 
    [
        { id_detail:1,id_po:1,text: "Wireless", harga:1000,quantity:10,checked: false },
        { id_detail:2,id_po:1,text: "GPS", harga:2000,quantity:20,checked: true },
        { id_detail:3,id_po:1,text: "Bluetooth", harga:3000,quantity:30,checked: false },
        { id_detail:4,id_po:1,text: "Wireless", harga:4000,quantity:40,checked: true },
        { id_detail:5,id_po:1,text: "GPS", harga:5000,quantity:50,checked: false },
        { id_detail:6,id_po:1,text: "Bluetooth", harga:6000,quantity:60,checked: true },
        { id_detail:7,id_po:1,text: "Wireless", harga:7000,quantity:70,checked: false },
        { id_detail:8,id_po:1,text: "GPS", harga:8000,quantity:80,checked: true }
    ];
    $scope.settingsList = _.sortBy(settingsList, 'checked' ).reverse();
    $scope.total    = UtilService.SumPriceQtyWithCondition(settingsList,'harga','quantity','checked');
});