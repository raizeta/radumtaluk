'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/gosent/new/warehouse',
    {
        templateUrl : 'angular/partial/company/gosent/warehouse/newwarehouse.html',
        controller  : 'NewGosentWarehouseController',
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
    $routeProvider.when('/company/gosent/list/warehouse',
    {
        templateUrl : 'angular/partial/company/gosent/warehouse/listwarehouse.html',
        controller  : 'ListGosentWarehouseController',
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
    $routeProvider.when('/company/gosent/detail/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/gosent/warehouse/detailwarehouse.html',
        controller  : 'DetailGosentWarehouseController',
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
    $routeProvider.when('/company/gosent/edit/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/gosent/warehouse/editwarehouse.html',
        controller  : 'EditGosentWarehouseController',
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
    $routeProvider.when('/company/gosent/delete/warehouse/:idwarehouse',
    {
        templateUrl : 'angular/partial/company/gosent/warehouse/editwarehouse.html',
        controller  : 'DeleteGosentWarehouseController',
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