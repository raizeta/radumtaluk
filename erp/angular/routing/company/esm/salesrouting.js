'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/esm/new/sales',
    {
        templateUrl : 'angular/partial/company/esm/sales/newsales.html',
        controller  : 'NewEsmSalesController',
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
    $routeProvider.when('/company/esm/list/sales',
    {
        templateUrl : 'angular/partial/company/esm/sales/listsales.html',
        controller  : 'ListEsmSalesController',
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
    $routeProvider.when('/company/esm/detail/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/esm/sales/detailsales.html',
        controller  : 'DetailEsmSalesController',
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
    $routeProvider.when('/company/esm/edit/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/esm/sales/editsales.html',
        controller  : 'EditEsmSalesController',
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
    $routeProvider.when('/company/esm/delete/sales/:idsales',
    {
        templateUrl : 'angular/partial/company/esm/sales/editsales.html',
        controller  : 'DeleteEsmSalesController',
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