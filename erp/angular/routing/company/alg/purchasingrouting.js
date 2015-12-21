'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/alg/new/purchasing',
    {
        templateUrl : 'angular/partial/company/alg/purchasing/newpurchasing.html',
        controller  : 'NewAlgPurchasingController',
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
    $routeProvider.when('/company/alg/list/purchasing',
    {
        templateUrl : 'angular/partial/company/alg/purchasing/listpurchasing.html',
        controller  : 'ListAlgPurchasingController',
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
    $routeProvider.when('/company/alg/detail/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/alg/purchasing/detailpurchasing.html',
        controller  : 'DetailAlgPurchasingController',
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
    $routeProvider.when('/company/alg/edit/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/alg/purchasing/editpurchasing.html',
        controller  : 'EditAlgPurchasingController',
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
    $routeProvider.when('/company/alg/delete/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/alg/purchasing/editpurchasing.html',
        controller  : 'DeleteAlgPurchasingController',
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
