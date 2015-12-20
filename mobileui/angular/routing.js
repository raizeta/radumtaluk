"use strict";
app.config(function($routeProvider) 
{
  $routeProvider.when('/',              
    {
      templateUrl: 'angular/partial/home.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/scroll',        
    {
      templateUrl: 'angular/partial/scroll.html',
      controller: 'MainController', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/toggle',        
    {
      templateUrl: 'angular/partial/toggle.html',
      controller: 'MainController',  
      reloadOnSearch: false
    }); 
  $routeProvider.when('/tabs',          
    {
      templateUrl: 'angular/partial/tabs.html',
      controller: 'MainController', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/accordion',     
    {
      templateUrl: 'angular/partial/accordion.html',
      controller: 'MainController', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/overlay',       
    {
      templateUrl: 'angular/partial/overlay.html',
      controller: 'MainController', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/forms',         
    {
      templateUrl: 'angular/partial/forms.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/dropdown',      
    {
      templateUrl: 'angular/partial/dropdown.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/touch',         
    {
      templateUrl: 'angular/partial/touch.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/swipe',         
    {
      templateUrl: 'angular/partial/swipe.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/drag',          
    {
      templateUrl: 'angular/partial/drag.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/drag2',         
    {
      templateUrl: 'angular/partial/drag2.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/carousel',      
    {
      templateUrl: 'angular/partial/carousel.html',
      controller: 'MainController', 
      reloadOnSearch: false
    });
});