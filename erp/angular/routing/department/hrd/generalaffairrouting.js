'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/hrd/new/generalaffair',
    {
        templateUrl : 'angular/partial/department/hrd/generalaffair/newgeneralaffair.html',
        controller  : 'NewHrdGeneralAffairController',
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
    $routeProvider.when('/department/hrd/list/generalaffair',
    {
        templateUrl : 'angular/partial/department/hrd/generalaffair/listgeneralaffair.html',
        controller  : 'ListHrdGeneralAffairController',
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
    $routeProvider.when('/department/hrd/detail/generalaffair/:idgeneralaffair',
    {
        templateUrl : 'angular/partial/department/hrd/generalaffair/detailgeneralaffair.html',
        controller  : 'DetailHrdGeneralAffairController',
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
    $routeProvider.when('/department/hrd/edit/generalaffair/:idgeneralaffair',
    {
        templateUrl : 'angular/partial/department/hrd/generalaffair/editgeneralaffair.html',
        controller  : 'EditHrdGeneralAffairController',
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
    $routeProvider.when('/department/hrd/delete/generalaffair/:idgeneralaffair',
    {
        templateUrl : 'angular/partial/department/hrd/generalaffair/editgeneralaffair.html',
        controller  : 'DeleteHrdGeneralAffairController',
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