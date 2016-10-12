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
    });
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) 
    {

    });

    $rootScope.tanggalwaktuharini = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    $rootScope.hanyatanggalharini = $filter('date')(new Date(),'yyyy.MM.dd');
 
});




