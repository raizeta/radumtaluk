'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/crm/new/distributor',
    {
        templateUrl : 'angular/partial/dashboard/crm/distributor/newdistributor.html',
        controller  : 'NewDistributorController',
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
    $routeProvider.when('/dashboard/crm/list/distributor',
    {
        templateUrl : 'angular/partial/dashboard/crm/distributor/listdistributor.html',
        controller  : 'ListDistributorController',
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
    $routeProvider.when('/dashboard/crm/detail/distributor/:iddistributor',
    {
        templateUrl : 'angular/partial/dashboard/crm/distributor/detaildistributor.html',
        controller  : 'DetailDistributorController',
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
    $routeProvider.when('/dashboard/crm/edit/distributor/:iddistributor',
    {
        templateUrl : 'angular/partial/dashboard/crm/distributor/editdistributor.html',
        controller  : 'EditDistributorController',
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
    $routeProvider.when('/dashboard/crm/delete/distributor/:iddistributor',
    {
        templateUrl : 'angular/partial/dashboard/crm/distributor/editdistributor.html',
        controller  : 'DeleteDistributorController',
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