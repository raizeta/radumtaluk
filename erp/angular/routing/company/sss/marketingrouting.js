'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/sss/new/marketing',
    {
        templateUrl : 'angular/partial/company/sss/marketing/newmarketing.html',
        controller  : 'NewSssMarketingController',
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
    $routeProvider.when('/company/sss/list/marketing',
    {
        templateUrl : 'angular/partial/company/sss/marketing/listmarketing.html',
        controller  : 'ListSssMarketingController',
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
    $routeProvider.when('/company/sss/detail/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/sss/marketing/detailmarketing.html',
        controller  : 'DetailSssMarketingController',
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
    $routeProvider.when('/company/sss/edit/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/sss/marketing/editmarketing.html',
        controller  : 'EditSssMarketingController',
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
    $routeProvider.when('/company/sss/delete/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/sss/marketing/editmarketing.html',
        controller  : 'DeleteSssMarketingController',
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