'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/erp/masterbarang/new/suplier',
    {
        templateUrl : 'angular/partial/erp/masterbarang/suplier/newsuplier.html',
        controller  : 'NewSuplierController',
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
    $routeProvider.when('/erp/masterbarang/list/suplier',
    {
        templateUrl : 'angular/partial/erp/masterbarang/suplier/listsuplier.html',
        controller  : 'ListSuplierController',
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
    $routeProvider.when('/erp/masterbarang/detail/suplier/:idsuplier',
    {
        templateUrl : 'angular/partial/erp/masterbarang/suplier/detailsuplier.html',
        controller  : 'DetailSuplierController',
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
    $routeProvider.when('/erp/masterbarang/edit/suplier/:idsuplier',
    {
        templateUrl : 'angular/partial/erp/masterbarang/suplier/editsuplier.html',
        controller  : 'EditSuplierController',
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
    $routeProvider.when('/erp/masterbarang/delete/suplier/:idsuplier',
    {
        templateUrl : 'angular/partial/erp/masterbarang/suplier/editsuplier.html',
        controller  : 'DeleteSuplierController',
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