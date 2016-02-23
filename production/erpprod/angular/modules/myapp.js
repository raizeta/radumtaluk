'use strict';
var myAppModule 	= angular.module('myAppModule',
								['ngRoute','angularSpinner','ui.bootstrap','ngAnimate',
                                 'oc.lazyLoad','signature','ui.select2',"xeditable",
								 'ng-fusioncharts','naif.base64','monospaced.qrcode',"ngSanitize",
                                 'ngCordova','ngMap','mm.acl','ui.bootstrap.contextMenu','ngToast','ngMessages']);

myAppModule.run(["$rootScope", "$location","uiSelect2Config","editableOptions", 
function ($rootScope, $location,uiSelect2Config,editableOptions) 
{
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    uiSelect2Config.placeholder = "Placeholder text";
    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        // console.log(userInfo);
    });
   
    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        // console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) 
    {
        if (eventObj.authenticated === false) 
        {
            $location.path("/login");
        }
    });
}]);

myAppModule.config(['ngToastProvider', function(ngToastProvider) {
  ngToastProvider.configure
  ({
            animation: 'slide', // or 'fade',
            className: 'success',
            dismissButton: true,
            compileContent: true,
            timeout:1000,
            horizontalPosition:'right',     //left, center
            verticalPosition:   'bottom',  //top,center
            maxNumber: 3 // 0 for unlimited
  });
}]);

