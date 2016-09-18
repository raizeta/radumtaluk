
angular.module('starter')
 .controller('PurchaseCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{

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
	  $scope.settingsList = [
    { text: "Wireless", harga:12000,quantity:20,checked: true },
    { text: "GPS", harga:12000,quantity:20,checked: true },
    { text: "Bluetooth", harga:12000,quantity:20,checked: true },
    { text: "Wireless", harga:12000,quantity:20,checked: true },
    { text: "GPS", harga:12000,quantity:20,checked: true },
    { text: "Bluetooth", harga:12000,quantity:20,checked: true },
    { text: "Wireless", harga:12000,quantity:20,checked: true },
    { text: "GPS", harga:12000,quantity:20,checked: true }
  ];
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