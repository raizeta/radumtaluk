'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/report/new/gosent',
    {
        templateUrl : 'angular/partial/dashboard/report/gosent/newgosent.html',
        controller  : 'NewReportGosentController',
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
    $routeProvider.when('/dashboard/report/list/gosent',
    {
        templateUrl : 'angular/partial/dashboard/report/gosent/listgosent.html',
        controller  : 'ListReportGosentController',
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
    $routeProvider.when('/dashboard/report/detail/gosent/:idgosent',
    {
        templateUrl : 'angular/partial/dashboard/report/gosent/detailgosent.html',
        controller  : 'DetailReportGosentController',
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
    $routeProvider.when('/dashboard/report/edit/gosent/:idgosent',
    {
        templateUrl : 'angular/partial/dashboard/report/gosent/editgosent.html',
        controller  : 'EditReportGosentController',
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
    $routeProvider.when('/dashboard/report/delete/gosent/:idgosent',
    {
        templateUrl : 'angular/partial/dashboard/report/gosent/editgosent.html',
        controller  : 'DeleteReportGosentController',
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