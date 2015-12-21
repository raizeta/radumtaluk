'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/sss/new/sales',
    {
        templateUrl : 'angular/partial/company/sss/sales/newsales.html',
        controller  : 'NewSssSalesController',
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
    $routeProvider.when('/company/sss/list/sales',
    {
        templateUrl : 'angular/partial/company/sss/sales/listsales.html',
        controller  : 'ListSssSalesController',
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
    $routeProvider.when('/company/sss/detail/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/sss/sales/detailsales.html',
        controller  : 'DetailSssSalesController',
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
    $routeProvider.when('/company/sss/edit/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/sss/sales/editsales.html',
        controller  : 'EditSssSalesController',
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
    $routeProvider.when('/company/sss/delete/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/sss/sales/editsales.html',
        controller  : 'DeleteSssSalesController',
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