angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.charts', 
    {
          url: '/charts',
          abstract: true,
          views: 
          {
            'tab-charts': 
            {
              templateUrl: 'templates/charts/index.html',
              controller: 'SalesmanCtrl'
            }
          }
    });
    $stateProvider.state('tab.charts.noo', 
    {
          url: "/noo",
          views: 
          {
              'noo-charts': 
              {
                  templateUrl: "templates/charts/noo-charts.html",
                  controller:'SalesmanCtrl'
              }
          },
    });
});
