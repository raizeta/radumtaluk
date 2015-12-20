'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/report/new/alg',
    {
        templateUrl : 'angular/partial/dashboard/report/alg/newalg.html',
        controller  : 'NewReportAlgController',
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
    $routeProvider.when('/dashboard/report/list/alg',
    {
        templateUrl : 'angular/partial/dashboard/report/alg/listalg.html',
        controller  : 'ListReportAlgController',
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
    $routeProvider.when('/dashboard/report/detail/alg/:idalg',
    {
        templateUrl : 'angular/partial/dashboard/report/alg/detailalg.html',
        controller  : 'DetailReportAlgController',
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
    $routeProvider.when('/dashboard/report/edit/alg/:idalg',
    {
        templateUrl : 'angular/partial/dashboard/report/alg/editalg.html',
        controller  : 'EditReportAlgController',
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
    $routeProvider.when('/dashboard/report/delete/alg/:idalg',
    {
        templateUrl : 'angular/partial/dashboard/report/alg/editalg.html',
        controller  : 'DeleteReportAlgController',
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