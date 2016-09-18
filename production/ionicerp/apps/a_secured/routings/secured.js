angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider, USER_ROLES,$ionicConfigProvider,$ionicConfigProvider) 
{
    $stateProvider
    .state('auth', 
    {
      url: '/',
      templateUrl: 'apps/a_secured/views/mainlogin.html',
      abstract:true,
    })
    .state('auth.login', 
    {
      url: 'auth/login',
      views: 
      {
          'login-tab': 
          {
            templateUrl: 'apps/a_secured/views/login.html',
            controller: 'LoginCtrl',
            parent: "main",
          }
      }
    })
    .state('auth.register', 
    {
      url: 'auth/register',
      views: 
      {
          'register-tab': 
          {
            templateUrl: 'apps/a_secured/views/register.html',
          }
      }
    });
});