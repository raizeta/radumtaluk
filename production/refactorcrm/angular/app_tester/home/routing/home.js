'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/home',
    {
        templateUrl : 'angular/app_tester/home/views/home.html',
        controller  : 'HomeController',
        resolve: 
        {
            auth: function ($q,LoginFac,$location) 
            {
                var userInfo = LoginFac.getUserInfo();
                if(userInfo)
                {
                   if (userInfo.rulename === 'SALESMAN') 
                    {
                        return $q.when(userInfo);
                    }
                    else
                    {
                        $location.path('/error/404');
                    } 
                }
                else 
                {
                    $location.path('/');
                }
            }
        }
    });	
}]);
