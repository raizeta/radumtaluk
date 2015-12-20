'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/report/new/esm',
    {
        templateUrl : 'angular/partial/dashboard/report/esm/newesm.html',
        controller  : 'NewReportEsmController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
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
    $routeProvider.when('/dashboard/report/list/esm',
    {
        templateUrl : 'angular/partial/dashboard/report/esm/listesm.html',
        controller  : 'ListReportEsmController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
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
    $routeProvider.when('/dashboard/report/detail/esm/:idesm',
    {
        templateUrl : 'angular/partial/dashboard/report/esm/detailesm.html',
        controller  : 'DetailReportEsmController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
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
    $routeProvider.when('/dashboard/report/edit/esm/:idesm',
    {
        templateUrl : 'angular/partial/dashboard/report/esm/editesm.html',
        controller  : 'EditReportEsmController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
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
    $routeProvider.when('/dashboard/report/delete/esm/:idesm',
    {
        templateUrl : 'angular/partial/dashboard/report/esm/editesm.html',
        controller  : 'DeleteReportEsmController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
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