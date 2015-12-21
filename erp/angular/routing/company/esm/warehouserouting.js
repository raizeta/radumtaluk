'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/esm/new/warehouse',
    {
        templateUrl : 'angular/partial/company/esm/warehouse/newwarehouse.html',
        controller  : 'NewEsmWarehouseController',
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
    $routeProvider.when('/company/esm/list/warehouse',
    {
        templateUrl : 'angular/partial/company/esm/warehouse/listwarehouse.html',
        controller  : 'ListEsmWarehouseController',
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
    $routeProvider.when('/company/esm/detail/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/esm/warehouse/detailwarehouse.html',
        controller  : 'DetailEsmWarehouseController',
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
    $routeProvider.when('/company/esm/edit/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/esm/warehouse/editwarehouse.html',
        controller  : 'EditEsmWarehouseController',
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
    $routeProvider.when('/company/esm/delete/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/esm/warehouse/editwarehouse.html',
        controller  : 'DeleteEsmWarehouseController',
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