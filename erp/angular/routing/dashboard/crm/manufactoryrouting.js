'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/crm/new/manufactory',
    {
        templateUrl : 'angular/partial/dashboard/crm/manufactory/newmanufactory.html',
        controller  : 'NewManufactoryController',
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
    $routeProvider.when('/dashboard/crm/list/manufactory',
    {
        templateUrl : 'angular/partial/dashboard/crm/manufactory/listmanufactory.html',
        controller  : 'ListManufactoryController',
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
    $routeProvider.when('/dashboard/crm/detail/manufactory/:idmanufactory',
    {
        templateUrl : 'angular/partial/dashboard/crm/manufactory/detailmanufactory.html',
        controller  : 'DetailManufactoryController',
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
    $routeProvider.when('/dashboard/crm/edit/manufactory/:idmanufactory',
    {
        templateUrl : 'angular/partial/dashboard/crm/manufactory/editmanufactory.html',
        controller  : 'EditManufactoryController',
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
    $routeProvider.when('/dashboard/crm/delete/manufactory/:idmanufactory',
    {
        templateUrl : 'angular/partial/dashboard/crm/manufactory/editmanufactory.html',
        controller  : 'DeleteManufactoryController',
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