'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/beritaacara/history',
    {
        templateUrl : 'angular/partial/beritaacara/history.html',
        controller  : 'BeritaAcaraHistoryController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {

                    return $q.when(userInfo);
                }
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
}]);