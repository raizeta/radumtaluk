angular.module('starter')
 .controller('BaCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$scope.beritaacara = 
    [
        { id:1,nopo: "BA.LG.2016.01.0001", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000},
        { id:2,nopo: "BA.LG.2016.01.0002", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000},
        { id:3,nopo: "BA.LG.2016.01.0003", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000}
    ];
})
.controller('BaInboxCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading) 
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
.controller('BaInboxDetailCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading) 
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
.controller('BaOutboxCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
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
.controller('BaOutboxDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
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
.controller('BaHistoryCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
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
.controller('BaHistoryDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
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