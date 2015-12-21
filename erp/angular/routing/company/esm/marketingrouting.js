'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/esm/new/marketing',
    {
        templateUrl : 'angular/partial/company/esm/marketing/newmarketing.html',
        controller  : 'NewEsmMarketingController',
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
    $routeProvider.when('/company/esm/list/marketing',
    {
        templateUrl : 'angular/partial/company/esm/marketing/listmarketing.html',
        controller  : 'ListEsmMarketingController',
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
    $routeProvider.when('/company/esm/detail/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/esm/marketing/detailmarketing.html',
        controller  : 'DetailEsmMarketingController',
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
    $routeProvider.when('/company/esm/edit/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/esm/marketing/editmarketing.html',
        controller  : 'EditEsmMarketingController',
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
    $routeProvider.when('/company/esm/delete/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/esm/marketing/editmarketing.html',
        controller  : 'DeleteEsmMarketingController',
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