'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/setting/new/adminlg',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminlg/newadminlg.html',
        controller  : 'NewSettingLgController',
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
    $routeProvider.when('/dashboard/setting/list/adminlg',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminlg/listadminlg.html',
        controller  : 'ListSettingLgController',
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
    $routeProvider.when('/dashboard/setting/detail/adminlg/:idadminlg',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminlg/detailadminlg.html',
        controller  : 'DetailSettingLgController',
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
    $routeProvider.when('/dashboard/setting/edit/adminlg/:idadminlg',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminlg/editadminlg.html',
        controller  : 'EditSettingLgController',
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
    $routeProvider.when('/dashboard/setting/delete/adminlg/:idadminlg',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminlg/editadminlg.html',
        controller  : 'DeleteSettingLgController',
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