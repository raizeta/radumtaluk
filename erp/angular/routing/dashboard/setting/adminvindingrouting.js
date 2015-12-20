'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/setting/new/adminvinding',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminvinding/newadminvinding.html',
        controller  : 'NewSettingVindingController',
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
    $routeProvider.when('/dashboard/setting/list/adminvinding',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminvinding/listadminvinding.html',
        controller  : 'ListSettingVindingController',
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
    $routeProvider.when('/dashboard/setting/detail/adminvinding/:idadminvinding',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminvinding/detailadminvinding.html',
        controller  : 'DetailSettingVindingController',
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
    $routeProvider.when('/dashboard/setting/edit/adminvinding/:idadminvinding',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminvinding/editadminvinding.html',
        controller  : 'EditSettingVindingController',
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
    $routeProvider.when('/dashboard/setting/delete/adminvinding/:idadminvinding',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminvinding/editadminvinding.html',
        controller  : 'DeleteSettingVindingController',
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