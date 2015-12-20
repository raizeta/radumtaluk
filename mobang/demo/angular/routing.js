"use strict";
app.config(function($routeProvider) 
{
  $routeProvider.when('/',              
    {
      templateUrl: 'angular/partial/home.html', reloadOnSearch: false
    });
  $routeProvider.when('/scroll',        
    {
      templateUrl: 'angular/partial/scroll.html', reloadOnSearch: false
    }); 
  $routeProvider.when('/toggle',        
    {
      templateUrl: 'angular/partial/toggle.html', reloadOnSearch: false
    }); 
  $routeProvider.when('/tabs',          
    {
      templateUrl: 'angular/partial/tabs.html', reloadOnSearch: false
    }); 
  $routeProvider.when('/accordion',     
    {
      templateUrl: 'angular/partial/accordion.html', reloadOnSearch: false
    }); 
  $routeProvider.when('/overlay',       
    {
      templateUrl: 'angular/partial/overlay.html', reloadOnSearch: false
    }); 
  $routeProvider.when('/forms',         
    {
      templateUrl: 'angular/partial/forms.html', reloadOnSearch: false
    });
  $routeProvider.when('/dropdown',      
    {
      templateUrl: 'angular/partial/dropdown.html', reloadOnSearch: false
    });
  $routeProvider.when('/touch',         
    {
      templateUrl: 'angular/partial/touch.html', reloadOnSearch: false
    });
  $routeProvider.when('/swipe',         
    {
      templateUrl: 'angular/partial/swipe.html', reloadOnSearch: false
    });
  $routeProvider.when('/drag',          
    {
      templateUrl: 'angular/partial/drag.html', reloadOnSearch: false
    });
  $routeProvider.when('/drag2',         
    {
      templateUrl: 'angular/partial/drag2.html', reloadOnSearch: false
    });
  $routeProvider.when('/carousel',      
    {
      templateUrl: 'angular/partial/carousel.html', reloadOnSearch: false
    });
});