angular.module('starter', ['ionic','ng-fusioncharts','angular.filter'])

.run(function($ionicPlatform,$rootScope, $state,$window,$filter,StorageService) 
{
    $ionicPlatform.ready(function() 
    {
        if(window.cordova && window.cordova.plugins.Keyboard) 
        {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) 
        {
            StatusBar.styleDefault();
        }
        var purchase = StorageService.get('purchase');
        if(!purchase)
        {
            var purchaselist = 
            [
                { id:1,nopo: "PO.LG.2016.01.0001", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:1000,qty:20},
                { id:2,nopo: "PO.LG.2016.01.0002", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:1000,qty:20},
                { id:3,nopo: "PO.LG.2016.01.0003", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:1000,qty:20}
            ];
            StorageService.set('purchase',purchaselist)    
        }
        
    });
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) 
    {

    });

    $rootScope.tanggalwaktuharini = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    $rootScope.hanyatanggalharini = $filter('date')(new Date(),'yyyy.MM.dd');
 
});




