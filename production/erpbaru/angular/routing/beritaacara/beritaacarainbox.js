'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/beritaacara/inbox',
    {
        templateUrl : 'angular/partial/beritaacara/inbox.html',
        controller  : 'BeritaAcaraInboxController',
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
    $routeProvider.when('/beritaacara/inbox/detail/:iddetail',
    {
        templateUrl : 'angular/partial/beritaacara/inboxdetail.html',
        controller  : 'BeritaAcaraInboxDetailController',
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