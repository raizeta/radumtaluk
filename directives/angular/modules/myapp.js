'use strict';
var myAppModule 	= angular.module('myAppModule',['oc.lazyLoad','ui.router','ui.bootstrap','angular-loading-bar']);

myAppModule.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) 
{
    
    $ocLazyLoadProvider.config({debug:false,events:true,});
    $urlRouterProvider.otherwise('/dashboard/home');
    $stateProvider.state('dashboard', 
    {
        url:'/',
        templateUrl: 'angular/views/dashboard.html',
        controller:"MainCtrl"
    });
    $stateProvider.state('dashboard.home',
    {
        url:'/home',
        templateUrl:'angular/views/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'myAppModule',
              files:[
                  'angular/controller/main.js',
              ]
            })
          }
        }
    });
}]);




