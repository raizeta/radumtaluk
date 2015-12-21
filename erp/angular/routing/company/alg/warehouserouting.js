'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/alg/new/warehouse',
    {
        templateUrl : 'angular/partial/company/alg/warehouse/newwarehouse.html',
        controller  : 'NewAlgWarehouseController',
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
    $routeProvider.when('/company/alg/list/warehouse',
    {
        templateUrl : 'angular/partial/company/alg/warehouse/listwarehouse.html',
        controller  : 'ListAlgWarehouseController',
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
    $routeProvider.when('/company/alg/detail/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/alg/warehouse/detailwarehouse.html',
        controller  : 'DetailAlgWarehouseController',
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
    $routeProvider.when('/company/alg/edit/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/alg/warehouse/editwarehouse.html',
        controller  : 'EditAlgWarehouseController',
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
    $routeProvider.when('/company/alg/delete/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/alg/warehouse/editwarehouse.html',
        controller  : 'DeleteAlgWarehouseController',
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
