'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/designer/new/matrialpromotion',
    {
        templateUrl : 'angular/partial/department/designer/matrialpromotion/newmatrialpromotion.html',
        controller  : 'NewDesignMatrialController',
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
    $routeProvider.when('/department/designer/list/matrialpromotion',
    {
        templateUrl : 'angular/partial/department/designer/matrialpromotion/listmatrialpromotion.html',
        controller  : 'ListDesignMatrialController',
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
    $routeProvider.when('/department/designer/detail/matrialpromotion/:idmatrialpromotion',
    {
        templateUrl : 'angular/partial/department/designer/matrialpromotion/detailmatrialpromotion.html',
        controller  : 'DetailDesignMatrialController',
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
    $routeProvider.when('/department/designer/edit/matrialpromotion/:idmatrialpromotion',
    {
        templateUrl : 'angular/partial/department/designer/matrialpromotion/editmatrialpromotion.html',
        controller  : 'EditDesignMatrialController',
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
    $routeProvider.when('/department/designer/delete/matrialpromotion/:idmatrialpromotion',
    {
        templateUrl : 'angular/partial/department/designer/matrialpromotion/editmatrialpromotion.html',
        controller  : 'DeleteDesignMatrialController',
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