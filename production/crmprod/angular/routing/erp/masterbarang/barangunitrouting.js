'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/erp/masterbarang/new/barangunit',
    {
        templateUrl : 'angular/partial/erp/masterbarang/barangunit/newbarangunit.html',
        controller  : 'NewBarangUnitController',
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
    $routeProvider.when('/erp/masterbarang/list/barangunit',
    {
        templateUrl : 'angular/partial/erp/masterbarang/barangunit/listbarangunit.html',
        controller  : 'ListBarangUnitController',
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
    $routeProvider.when('/erp/masterbarang/detail/barangunit/:idbarangunit',
    {
        templateUrl : 'angular/partial/erp/masterbarang/barangunit/detailbarangunit.html',
        controller  : 'DetailBarangUnitController',
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
    $routeProvider.when('/erp/masterbarang/edit/barangunit/:idbarangunit',
    {
        templateUrl : 'angular/partial/erp/masterbarang/barangunit/editbarangunit.html',
        controller  : 'EditBarangUnitController',
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
    $routeProvider.when('/erp/masterbarang/delete/barangunit/:idbarangunit',
    {
        templateUrl : 'angular/partial/erp/masterbarang/barangunit/editbarangunit.html',
        controller  : 'DeleteBarangUnitController',
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
