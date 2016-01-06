'use strict';
var myAppModule 	= angular.module('myAppModule',
								['ngRoute','angularSpinner','ui.bootstrap','ngAnimate',
                                 'oc.lazyLoad','signature','ui.select2',
								 'ng-fusioncharts','naif.base64','monospaced.qrcode',
                                 'ngCordova','ngMap','mm.acl','ui.bootstrap.contextMenu']);
myAppModule.run(["$rootScope", "$location","uiSelect2Config", function ($rootScope, $location,uiSelect2Config) 
{
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




