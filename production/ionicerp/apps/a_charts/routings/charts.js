angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider)
{
    $stateProvider.state('main.charts', 
    {
      url: '/charts',
      abstract:true,
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/charts.html',
            controller:'ChartsCtrl'
          }
      }
    });
    $stateProvider.state('main.charts.inbox', 
    {
          url: "/sales",
          views: {
              'charts-sales': {
                  templateUrl: "apps/a_charts/views/charts-sales.html",
                  controller:'ChartsSalesCtrl'
              }
          }
    });
    $stateProvider.state('main.charts.employe', 
    {
          url: "/employes",
          views: {
              'charts-employes': {
                  templateUrl: "apps/a_charts/views/charts-employes.html",
                  controller:'ChartsEmployesCtrl'
              }
          }
    });
});