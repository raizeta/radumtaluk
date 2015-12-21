'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/alg/new/sales',
    {
        templateUrl : 'angular/partial/company/alg/sales/newsales.html',
        controller  : 'NewAlgSalesController',
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
    $routeProvider.when('/company/alg/list/sales',
    {
        templateUrl : 'angular/partial/company/alg/sales/listsales.html',
        controller  : 'ListAlgSalesController',
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
    $routeProvider.when('/company/alg/detail/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/alg/sales/detailsales.html',
        controller  : 'DetailAlgSalesController',
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
    $routeProvider.when('/company/alg/edit/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/alg/sales/editsales.html',
        controller  : 'EditAlgSalesController',
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
    $routeProvider.when('/company/alg/delete/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/alg/sales/editsales.html',
        controller  : 'DeleteAlgSalesController',
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
