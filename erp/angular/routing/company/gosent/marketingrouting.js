'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/gosent/new/marketing',
    {
        templateUrl : 'angular/partial/company/gosent/marketing/newmarketing.html',
        controller  : 'NewGosentMarketingController',
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
    $routeProvider.when('/company/gosent/list/marketing',
    {
        templateUrl : 'angular/partial/company/gosent/marketing/listmarketing.html',
        controller  : 'ListGosentMarketingController',
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
    $routeProvider.when('/company/gosent/detail/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/gosent/marketing/detailmarketing.html',
        controller  : 'DetailGosentMarketingController',
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
    $routeProvider.when('/company/gosent/edit/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/gosent/marketing/editmarketing.html',
        controller  : 'EditGosentMarketingController',
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
    $routeProvider.when('/company/gosent/delete/marketing/:idmarketing',
    {
        templateUrl : 'angular/partial/company/gosent/marketing/editmarketing.html',
        controller  : 'DeleteGosentMarketingController',
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