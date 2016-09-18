angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider, USER_ROLES,$ionicConfigProvider,$ionicConfigProvider) 
{
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider
  .state('main', 
  {
    url: '/',
    abstract: true,
    templateUrl: 'apps/a_layout/views/main.html',
  })
  .state('main.dashboard', 
  {
    url: 'main/dashboard',
    views: 
    {
        'dashboard-tab': 
        {
          templateUrl: 'apps/a_layout/views/dashboard.html',
          controller: 'DashboardCtrl'
        }
    }
  })

  $urlRouterProvider.otherwise(function ($injector, $location) 
  {
    var $state = $injector.get("$state");
    $state.go("main.dashboard");
  });
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
});