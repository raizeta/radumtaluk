'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/esm/new/purchasing',
    {
        templateUrl : 'angular/partial/company/esm/purchasing/newpurchasing.html',
        controller  : 'NewEsmPurchasingController',
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
    $routeProvider.when('/company/esm/list/purchasing',
    {
        templateUrl : 'angular/partial/company/esm/purchasing/listpurchasing.html',
        controller  : 'ListEsmPurchasingController',
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
    $routeProvider.when('/company/esm/detail/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/esm/purchasing/detailpurchasing.html',
        controller  : 'DetailEsmPurchasingController',
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
    $routeProvider.when('/company/esm/edit/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/esm/purchasing/editpurchasing.html',
        controller  : 'EditEsmPurchasingController',
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
    $routeProvider.when('/company/esm/delete/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/esm/purchasing/editpurchasing.html',
        controller  : 'DeleteEsmPurchasingController',
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