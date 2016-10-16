'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/absen',
    {
        templateUrl : 'angular/app_tester/absen/views/absen.html',
        controller  : 'AbsenController',
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
