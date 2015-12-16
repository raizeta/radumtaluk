'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/erp/masterbarang/new/tipebarang',
    {
        templateUrl : 'angular/partial/erp/masterbarang/tipebarang/newtipebarang.html',
        controller  : 'NewTipeBarangController',
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
    $routeProvider.when('/erp/masterbarang/list/tipebarang',
    {
        templateUrl : 'angular/partial/erp/masterbarang/tipebarang/listtipebarang.html',
        controller  : 'ListTipeBarangController',
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
    $routeProvider.when('/erp/masterbarang/detail/tipebarang/:idtipebarang',
    {
        templateUrl : 'angular/partial/erp/masterbarang/tipebarang/detailtipebarang.html',
        controller  : 'DetailTipeBarangController',
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
    $routeProvider.when('/erp/masterbarang/edit/tipebarang/:idtipebarang',
    {
        templateUrl : 'angular/partial/erp/masterbarang/tipebarang/edittipebarang.html',
        controller  : 'EditTipeBarangController',
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
    $routeProvider.when('/erp/masterbarang/delete/tipebarang/:idtipebarang',
    {
        templateUrl : 'angular/partial/erp/masterbarang/tipebarang/edittipebarang.html',
        controller  : 'DeleteTipeBarangController',
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