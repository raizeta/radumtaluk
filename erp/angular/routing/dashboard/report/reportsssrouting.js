'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/report/new/sss',
    {
        templateUrl : 'angular/partial/dashboard/report/sss/newsss.html',
        controller  : 'NewReportSssController',
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
    $routeProvider.when('/dashboard/report/list/sss',
    {
        templateUrl : 'angular/partial/dashboard/report/sss/listsss.html',
        controller  : 'ListReportSssController',
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
    $routeProvider.when('/dashboard/report/detail/sss/:idsss',
    {
        templateUrl : 'angular/partial/dashboard/report/sss/detailsss.html',
        controller  : 'DetailReportSssController',
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
    $routeProvider.when('/dashboard/report/edit/sss/:idsss',
    {
        templateUrl : 'angular/partial/dashboard/report/sss/editsss.html',
        controller  : 'EditReportSssController',
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
    $routeProvider.when('/dashboard/report/delete/sss/:idsss',
    {
        templateUrl : 'angular/partial/dashboard/report/sss/editsss.html',
        controller  : 'DeleteReportSssController',
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