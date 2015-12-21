'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/gosent/new/product',
    {
        templateUrl : 'angular/partial/company/gosent/product/newproduct.html',
        controller  : 'NewGosentProductController',
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
    $routeProvider.when('/company/gosent/list/product',
    {
        templateUrl : 'angular/partial/company/gosent/product/listproduct.html',
        controller  : 'ListGosentProductController',
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
    $routeProvider.when('/company/gosent/detail/product/:idproduct',
    {
        templateUrl : 'angular/partial/company/gosent/product/detailproduct.html',
        controller  : 'DetailGosentProductController',
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
    $routeProvider.when('/company/gosent/edit/product/:idproduct',
    {
        templateUrl : 'angular/partial/company/gosent/product/editproduct.html',
        controller  : 'EditGosentProductController',
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
    $routeProvider.when('/company/gosent/delete/product/:idproduct',
    {
        templateUrl : 'angular/partial/company/gosent/product/editproduct.html',
        controller  : 'DeleteGosentProductController',
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