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
      abstract: true,
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/products/main.html',
          }
      }
    });
    $stateProvider.state('main.products.inbox', 
    {
          url: "/inbox",
          views: 
          {
              'cproducts-inbox': 
              {
                  templateUrl: "apps/a_charts/views/products/cproducts-inbox.html",
                  controller:'XXXCtrl'
              }
          },
    });
    $stateProvider.state('main.products.outbox', 
    {
          url: "/outbox",
          views: 
          {
              'cproducts-outbox': 
              {
                  templateUrl: "apps/a_charts/views/products/cproducts-outbox.html",
                  controller:'YYYCtrl'
              }
          },
    });
    $stateProvider.state('main.products.history', 
    {
          url: "/history",
          views: 
          {
              'cproducts-history': 
              {
                  templateUrl: "apps/a_charts/views/products/cproducts-history.html",
                  controller:'ZZZCtrl'
              }
          },
    });

});