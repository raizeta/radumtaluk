'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/esm/new/factory',
    {
        templateUrl : 'angular/partial/company/esm/factory/newfactory.html',
        controller  : 'NewEsmFactoryController',
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
    $routeProvider.when('/company/esm/list/factory',
    {
        templateUrl : 'angular/partial/company/esm/factory/listfactory.html',
        controller  : 'ListEsmFactoryController',
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
    $routeProvider.when('/company/esm/detail/factory/:idfactory',
    {
        templateUrl : 'angular/partial/company/esm/factory/detailfactory.html',
        controller  : 'DetailEsmFactoryController',
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
    $routeProvider.when('/company/esm/edit/factory/:idfactory',
    {
        templateUrl : 'angular/partial/company/esm/factory/editfactory.html',
        controller  : 'EditEsmFactoryController',
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
    $routeProvider.when('/company/esm/delete/factory/:idfactory',
    {
        templateUrl : 'angular/partial/company/esm/factory/editfactory.html',
        controller  : 'DeleteEsmFactoryController',
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