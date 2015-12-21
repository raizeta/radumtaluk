'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/accounting/new/sales',
    {
        templateUrl : 'angular/partial/department/accounting/sales/newsales.html',
        controller  : 'NewAccountingSalesController',
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
    $routeProvider.when('/department/accounting/list/sales',
    {
        templateUrl : 'angular/partial/department/accounting/sales/listsales.html',
        controller  : 'ListAccountingSalesController',
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
    $routeProvider.when('/department/accounting/detail/sales/:idsales',
    {
        templateUrl : 'angular/partial/department/accounting/sales/detailsales.html',
        controller  : 'DetailAccountingSalesController',
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
    $routeProvider.when('/department/accounting/edit/sales/:idsales',
    {
        templateUrl : 'angular/partial/department/accounting/sales/editsales.html',
        controller  : 'EditAccountingSalesController',
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
    $routeProvider.when('/department/accounting/delete/sales/:idsales',
    {
        templateUrl : 'angular/partial/department/accounting/sales/editsales.html',
        controller  : 'DeleteAccountingSalesController',
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