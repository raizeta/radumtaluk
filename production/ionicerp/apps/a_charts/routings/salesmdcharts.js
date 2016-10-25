angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider)
{
    $stateProvider.state('main.salesmd', 
    {
      url: '/salesmd',
      abstract: true,
      views: 
      {
          'charts-tab': 
          {
            templateUrl: 'apps/a_charts/views/sales-md/main.html',
          }
      }
    });
    $stateProvider.state('main.salesmd.visit', 
    {
          url: "/visit",
          views: 
          {
              'salesmd-visit': 
              {
                  templateUrl: "apps/a_charts/views/sales-md/visit.html",
                  controller:'VisitChartsCtrl'
              }
          },
    });
    $stateProvider.state('main.salesmd.actionvisit', 
    {
          url: "/action-visit",
          views: 
          {
              'salesmd-action-visit': 
              {
                  templateUrl: "apps/a_charts/views/sales-md/action-visit.html",
                  controller:'ActionVisitChartsCtrl'
              }
          },
    });
    $stateProvider.state('main.salesmd.actionvisitrequest', 
    {
          url: "/action-visit-request",
          views: 
          {
              'salesmd-action-visit-request': 
              {
                  templateUrl: "apps/a_charts/views/sales-md/action-visit-request.html",
                  controller:'ActionVisitRequestChartsCtrl'
              }
          },
    });
    $stateProvider.state('main.salesmd.actionvisitsellout', 
    {
          url: "/action-visit-sellout",
          views: 
          {
              'salesmd-action-visit-sellout': 
              {
                  templateUrl: "apps/a_charts/views/sales-md/action-visit-sellout.html",
                  controller:'ActionVisitSellOutChartsCtrl'
              }
          },
    });

});