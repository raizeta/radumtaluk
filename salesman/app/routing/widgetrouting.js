'use strict';
app.config(function($routeProvider) {
  $routeProvider.when('/widget/map',              
    {
      templateUrl: 'app/partial/widget/map.html',
      controller: 'MapController', 
      reloadOnSearch: false
    });
  $routeProvider.when('/widget/barcode',        
    {
      templateUrl: 'app/partial/scroll.html', 
      reloadOnSearch: false
    }); 
  $routeProvider.when('/widget/capture',        
    {
      templateUrl: 'app/partial/scroll.html', 
      reloadOnSearch: false
    });

  $routeProvider.when('/widget/listcustomer',        
    {
      templateUrl: 'app/partial/widget/listcustomer.html',
      controller:'ListCustomerController', 
      reloadOnSearch: false
    });

  $routeProvider.when('/widget/customer/:id',        
    {
      templateUrl: 'app/partial/widget/detailcustomer.html',
      controller:'DetailCustomerController', 
      reloadOnSearch: false
    }); 
});