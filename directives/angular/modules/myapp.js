'use strict';
var myAppModule 	= angular.module('myAppModule',['oc.lazyLoad','ui.router','ui.bootstrap','angular-loading-bar']);

myAppModule.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) 
{
    
    $ocLazyLoadProvider.config({debug:false,events:true,});
    $urlRouterProvider.otherwise('/dashboard/home');
    $stateProvider
    $stateProvider.state('dashboard', 
    {
        url:'/dashboard',
        templateUrl: 'angular/views/adminlte.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad)
            {
                return $ocLazyLoad.load(
                {
                    name:'myAppModule',
                    files:[]
                }),

                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                })
            }
        }
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




