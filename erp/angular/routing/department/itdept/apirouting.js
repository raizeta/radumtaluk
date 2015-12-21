'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/alg/new/marketing',
    {
        templateUrl : 'angular/partial/company/alg/marketing/newmarketing.html',
        controller  : 'NewAlgMarketingController',
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
    $routeProvider.when('/company/alg/list/marketing',
    {
        templateUrl : 'angular/partial/company/alg/marketing/listmarketing.html',
        controller  : 'ListAlgMarketingController',
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
    $routeProvider.when('/company/alg/detail/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/alg/marketing/detailmarketing.html',
        controller  : 'DetailAlgMarketingController',
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
    $routeProvider.when('/company/alg/edit/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/alg/marketing/editmarketing.html',
        controller  : 'EditAlgMarketingController',
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
    $routeProvider.when('/company/alg/delete/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/alg/marketing/editmarketing.html',
        controller  : 'DeleteAlgMarketingController',
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