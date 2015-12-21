'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/hrd/new/rekrutmen',
    {
        templateUrl : 'angular/partial/department/hrd/rekrutmen/newrekrutmen.html',
        controller  : 'NewHrdRekrutmenController',
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
    $routeProvider.when('/department/hrd/list/rekrutmen',
    {
        templateUrl : 'angular/partial/department/hrd/rekrutmen/listrekrutmen.html',
        controller  : 'ListHrdRekrutmenController',
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
    $routeProvider.when('/department/hrd/detail/rekrutmen/:idrekrutmen',
    {
        templateUrl : 'angular/partial/department/hrd/rekrutmen/detailrekrutmen.html',
        controller  : 'DetailHrdRekrutmenController',
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
    $routeProvider.when('/department/hrd/edit/rekrutmen/:idrekrutmen',
    {
        templateUrl : 'angular/partial/department/hrd/rekrutmen/editrekrutmen.html',
        controller  : 'EditHrdRekrutmenController',
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
    $routeProvider.when('/department/hrd/delete/rekrutmen/:idrekrutmen',
    {
        templateUrl : 'angular/partial/department/hrd/rekrutmen/editrekrutmen.html',
        controller  : 'DeleteHrdRekrutmenController',
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