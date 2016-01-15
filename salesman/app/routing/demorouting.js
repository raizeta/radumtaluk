'use strict';
app.config(function($routeProvider) 
{
  $routeProvider.when('/',              
  {
    templateUrl: 'app/partial/layout/login.html',
    controller:'LoginController',
    resolve: 
    {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    if(userInfo.rulename === 'SALESMAN')
                    {
                      $location.path('/dash');
                    }

                } 

            }
        }
  });
  
  $routeProvider.when('/dash',              
    {
      templateUrl: 'app/partial/layout/index.html',
      });
});