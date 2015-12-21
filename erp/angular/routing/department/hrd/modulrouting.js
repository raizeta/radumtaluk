'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/hrd/new/modul',
    {
        templateUrl : 'angular/partial/department/hrd/modul/newmodul.html',
        controller  : 'NewHrdModulController',
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
    $routeProvider.when('/department/hrd/list/modul',
    {
        templateUrl : 'angular/partial/department/hrd/modul/listmodul.html',
        controller  : 'ListHrdModulController',
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
    $routeProvider.when('/department/hrd/detail/modul/:idmodul',
    {
        templateUrl : 'angular/partial/department/hrd/modul/detailmodul.html',
        controller  : 'DetailHrdModulController',
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
    $routeProvider.when('/department/hrd/edit/modul/:idmodul',
    {
        templateUrl : 'angular/partial/department/hrd/modul/editmodul.html',
        controller  : 'EditHrdModulController',
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
    $routeProvider.when('/department/hrd/delete/modul/:idmodul',
    {
        templateUrl : 'angular/partial/department/hrd/modul/editmodul.html',
        controller  : 'DeleteHrdModulController',
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