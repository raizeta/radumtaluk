
angular.module('starter')
 .controller('PurchaseCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService) 
{
    $scope.purchaselist = 
    [
        { id:1,nopo: "PO.LG.2016.01.0001", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:1000,qty:20},
        { id:2,nopo: "PO.LG.2016.01.0002", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:1000,qty:20},
        { id:3,nopo: "PO.LG.2016.01.0003", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:1000,qty:20}
    ];
    var sumresult   = UtilService.SumPriceWithQty($scope.purchaselist,'harga','qty');   //60000
    var sumharga    = UtilService.SumJustPriceOrQty($scope.purchaselist,'harga');       //3000
    var sumqty      = UtilService.SumJustPriceOrQty($scope.purchaselist,'qty');         //60
    
})
.controller('PurchaseInboxCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
})
.controller('PurchaseInboxDetailCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,UtilService) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
    $scope.settingsList = 
    [
        { text: "Wireless", harga:12000,quantity:20,checked: true },
        { text: "GPS", harga:12000,quantity:20,checked: true },
        { text: "Bluetooth", harga:12000,quantity:20,checked: true },
        { text: "Wireless", harga:12000,quantity:20,checked: true },
        { text: "GPS", harga:12000,quantity:20,checked: true },
        { text: "Bluetooth", harga:12000,quantity:20,checked: true },
        { text: "Wireless", harga:12000,quantity:20,checked: true },
        { text: "GPS", harga:12000,quantity:20,checked: true }
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
                alert("PO Sudah Di Aprove");
            }  
        }
        else
        {
            alert("Apakah Kamu Yakin Me Reject PO Ini?");
        }
    }
    
})
.controller('PurchaseAcceptCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
})
.controller('PurchaseAcceptDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
})
.controller('PurchaseRejectCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
})
.controller('PurchaseRejectDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
});