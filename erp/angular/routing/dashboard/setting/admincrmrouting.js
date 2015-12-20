'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/setting/new/admincrm',
    {
        templateUrl : 'angular/partial/dashboard/setting/admincrm/newadmincrm.html',
        controller  : 'NewSettingCrmController',
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
    $routeProvider.when('/dashboard/setting/list/admincrm',
    {
        templateUrl : 'angular/partial/dashboard/setting/admincrm/listadmincrm.html',
        controller  : 'ListSettingCrmController',
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
    $routeProvider.when('/dashboard/setting/detail/admincrm/:idadmincrm',
    {
        templateUrl : 'angular/partial/dashboard/setting/admincrm/detailadmincrm.html',
        controller  : 'DetailSettingCrmController',
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
    $routeProvider.when('/dashboard/setting/edit/admincrm/:idadmincrm',
    {
        templateUrl : 'angular/partial/dashboard/setting/admincrm/editadmincrm.html',
        controller  : 'EditSettingCrmController',
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
    $routeProvider.when('/dashboard/setting/delete/admincrm/:idadmincrm',
    {
        templateUrl : 'angular/partial/dashboard/setting/admincrm/editadmincrm.html',
        controller  : 'DeleteSettingCrmController',
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