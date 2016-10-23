angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider)
{
    $stateProvider.state('main.charts', 
    {
      url: '/charts',
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts-dash.html',
            controller:'ChartsCtrl'
          }
      }
    });
    $stateProvider.state('main.products', 
    {
      url: '/products',
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts-products.html',
            controller:'ChartProductsCtrl'
          }
      }
    });
    $stateProvider.state('main.customers', 
    {
      url: '/customers',
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts-customers.html',
            controller:'ChartCustomersCtrl'
          }
      }
    });
    $stateProvider.state('main.supliers', 
    {
      url: '/supliers',
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts-supliers.html',
            controller:'ChartProductsCtrl'
          }
      }
    });
    $stateProvider.state('main.purchases', 
    {
      url: '/purchases',
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts-purchases.html',
            controller:'ChartProductsCtrl'
          }
      }
    });
    $stateProvider.state('main.sales', 
    {
      url: '/sales',
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts-sales.html',
            controller:'ChartProductsCtrl'
          }
      }
    });
    $stateProvider.state('main.spg', 
    {
      url: '/spg',
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts-spg.html',
            controller:'ChartProductsCtrl'
          }
      }
    });
});