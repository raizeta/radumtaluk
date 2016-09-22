
angular.module('starter')
 .controller('PurchaseCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
    $scope.purchaselist = 
    [
        { id:1,nopo: "PO.LG.2016.01.0001", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000},
        { id:2,nopo: "PO.LG.2016.01.0002", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000},
        { id:3,nopo: "PO.LG.2016.01.0003", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000}
    ];
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
.controller('PurchaseInboxDetailCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading) 
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
    $scope.toggleChange = function(item) 
    {
        console.log(item); 
    };
    console.log($scope.settingsList);
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