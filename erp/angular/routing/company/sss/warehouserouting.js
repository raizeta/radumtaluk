'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/sss/new/warehouse',
    {
        templateUrl : 'angular/partial/company/sss/warehouse/newwarehouse.html',
        controller  : 'NewSssWarehouseController',
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
    $routeProvider.when('/company/sss/list/warehouse',
    {
        templateUrl : 'angular/partial/company/sss/warehouse/listwarehouse.html',
        controller  : 'ListSssWarehouseController',
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
    $routeProvider.when('/company/sss/detail/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/sss/warehouse/detailwarehouse.html',
        controller  : 'DetailSssWarehouseController',
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
    $routeProvider.when('/company/sss/edit/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/sss/warehouse/editwarehouse.html',
        controller  : 'EditSssWarehouseController',
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
    $routeProvider.when('/company/sss/delete/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/sss/warehouse/editwarehouse.html',
        controller  : 'DeleteSssWarehouseController',
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