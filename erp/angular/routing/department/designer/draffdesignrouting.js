'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/designer/new/draffdesign',
    {
        templateUrl : 'angular/partial/department/designer/draffdesign/newdraffdesign.html',
        controller  : 'NewDesignDraffController',
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
    $routeProvider.when('/department/designer/list/draffdesign',
    {
        templateUrl : 'angular/partial/department/designer/draffdesign/listdraffdesign.html',
        controller  : 'ListDesignDraffController',
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
    $routeProvider.when('/department/designer/detail/draffdesign/:iddraffdesign',
    {
        templateUrl : 'angular/partial/department/designer/draffdesign/detaildraffdesign.html',
        controller  : 'DetailDesignDraffController',
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
    $routeProvider.when('/department/designer/edit/draffdesign/:iddraffdesign',
    {
        templateUrl : 'angular/partial/department/designer/draffdesign/editdraffdesign.html',
        controller  : 'EditDesignDraffController',
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
    $routeProvider.when('/department/designer/delete/draffdesign/:iddraffdesign',
    {
        templateUrl : 'angular/partial/department/designer/draffdesign/editdraffdesign.html',
        controller  : 'DeleteDesignDraffController',
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