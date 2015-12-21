'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/hrd/new/personalia',
    {
        templateUrl : 'angular/partial/department/hrd/personalia/newpersonalia.html',
        controller  : 'NewHrdPersonaliaController',
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
    $routeProvider.when('/department/hrd/list/personalia',
    {
        templateUrl : 'angular/partial/department/hrd/personalia/listpersonalia.html',
        controller  : 'ListHrdPersonaliaController',
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
    $routeProvider.when('/department/hrd/detail/personalia/:idpersonalia',
    {
        templateUrl : 'angular/partial/department/hrd/personalia/detailpersonalia.html',
        controller  : 'DetailHrdPersonaliaController',
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
    $routeProvider.when('/department/hrd/edit/personalia/:idpersonalia',
    {
        templateUrl : 'angular/partial/department/hrd/personalia/editpersonalia.html',
        controller  : 'EditHrdPersonaliaController',
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
    $routeProvider.when('/department/hrd/delete/personalia/:idpersonalia',
    {
        templateUrl : 'angular/partial/department/hrd/personalia/editpersonalia.html',
        controller  : 'DeleteHrdPersonaliaController',
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