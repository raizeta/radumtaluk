'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/hrd/new/absensi',
    {
        templateUrl : 'angular/partial/department/hrd/absensi/newabsensi.html',
        controller  : 'NewHrdAbsensiController',
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
    $routeProvider.when('/department/hrd/list/absensi',
    {
        templateUrl : 'angular/partial/department/hrd/absensi/listabsensi.html',
        controller  : 'ListHrdAbsensiController',
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
    $routeProvider.when('/department/hrd/detail/absensi/:idabsensi',
    {
        templateUrl : 'angular/partial/department/hrd/absensi/detailabsensi.html',
        controller  : 'DetailHrdAbsensiController',
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
    $routeProvider.when('/department/hrd/edit/absensi/:idabsensi',
    {
        templateUrl : 'angular/partial/department/hrd/absensi/editabsensi.html',
        controller  : 'EditHrdAbsensiController',
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
    $routeProvider.when('/department/hrd/delete/absensi/:idabsensi',
    {
        templateUrl : 'angular/partial/department/hrd/absensi/editabsensi.html',
        controller  : 'DeleteHrdAbsensiController',
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