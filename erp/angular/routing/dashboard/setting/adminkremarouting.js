'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/setting/new/adminkrema',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminkrema/newadminkrema.html',
        controller  : 'NewSettingKremaController',
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
    $routeProvider.when('/dashboard/setting/list/adminkrema',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminkrema/listadminkrema.html',
        controller  : 'ListSettingKremaController',
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
    $routeProvider.when('/dashboard/setting/detail/adminkrema/:idadminkrema',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminkrema/detailadminkrema.html',
        controller  : 'DetailSettingKremaController',
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
    $routeProvider.when('/dashboard/setting/edit/adminkrema/:idadminkrema',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminkrema/editadminkrema.html',
        controller  : 'EditSettingKremaController',
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
    $routeProvider.when('/dashboard/setting/delete/adminkrema/:idadminkrema',
    {
        templateUrl : 'angular/partial/dashboard/setting/adminkrema/editadminkrema.html',
        controller  : 'DeleteSettingKremaController',
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