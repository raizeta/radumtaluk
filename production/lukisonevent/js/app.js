// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic-material'])

.run(function($ionicPlatform,$rootScope, $state,$window) 
{
    $ionicPlatform.ready(function() 
    {
      if(window.cordova && window.cordova.plugins.Keyboard) 
      {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });


    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) 
    {

    });

    var globalurl = {};
    globalurl.linkurl   = "http://api.lukisongroup.com/eventmaxi";
    globalurl.tokenurl  = "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
    $rootScope.linkurl = globalurl;

    if($window.localStorage.getItem('jumlah-item'))
    {
        var jumlahitem                          = JSON.parse($window.localStorage.getItem('jumlah-item'));
        $rootScope.jumlahitemdikeranjang        = jumlahitem;
    }
    else
    {
        $rootScope.jumlahitemdikeranjang = 0;
    }
    
})



.filter('capitalize', function() 
{
    return function(input) 
    {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
