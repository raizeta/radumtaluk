'use strict';
app.config(function($routeProvider) {
  $routeProvider.when('/',              
    {
      templateUrl: 'app/partial/home.html', 
      reloadOnSearch: false
    });
  $routeProvider.when('/scroll',        
    {
      templateUrl: 'app/partial/scroll.html', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/toggle',        
    {
      templateUrl: 'app/partial/toggle.html', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/tabs',          
    {
      templateUrl: 'app/partial/tabs.html', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/accordion',     
    {
      templateUrl: 'app/partial/accordion.html', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/overlay',       
    {
      templateUrl: 'app/partial/overlay.html', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/forms',         
    {
      templateUrl: 'app/partial/forms.html', 
      reloadOnSearch: false
    });
  $routeProvider.when('/dropdown',      
    {
      templateUrl: 'app/partial/dropdown.html', 
      reloadOnSearch: false
    });
  $routeProvider.when('/touch',         
    {
      templateUrl: 'app/partial/touch.html', 
      reloadOnSearch: false
    });
  $routeProvider.when('/swipe',         
    {
      templateUrl: 'app/partial/swipe.html', 
      reloadOnSearch: false
    });
  $routeProvider.when('/drag',          
    {
      templateUrl: 'app/partial/drag.html', 
      reloadOnSearch: false
    });
  $routeProvider.when('/drag2',         
    {
      templateUrl: 'app/partial/drag2.html', 
      reloadOnSearch: false
    });
  $routeProvider.when('/carousel',      
    {
      templateUrl: 'app/partial/carousel.html', 
      reloadOnSearch: false});
});