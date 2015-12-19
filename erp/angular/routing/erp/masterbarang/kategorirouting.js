'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/erp/masterbarang/new/kategori',
    {
        templateUrl : 'angular/partial/erp/masterbarang/kategori/newkategori.html',
        controller  : 'NewKategoriController',
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
    $routeProvider.when('/erp/masterbarang/list/kategori',
    {
        templateUrl : 'angular/partial/erp/masterbarang/kategori/listkategori.html',
        controller  : 'ListKategoriController',
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
    $routeProvider.when('/erp/masterbarang/detail/kategori/:idkategori',
    {
        templateUrl : 'angular/partial/erp/masterbarang/kategori/detailkategori.html',
        controller  : 'DetailKategoriController',
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
    $routeProvider.when('/erp/masterbarang/edit/kategori/:idkategori',
    {
        templateUrl : 'angular/partial/erp/masterbarang/kategori/editkategori.html',
        controller  : 'EditKategoriController',
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
    $routeProvider.when('/erp/masterbarang/delete/kategori/:idkategori',
    {
        templateUrl : 'angular/partial/erp/masterbarang/kategori/editkategori.html',
        controller  : 'DeleteKategoriController',
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