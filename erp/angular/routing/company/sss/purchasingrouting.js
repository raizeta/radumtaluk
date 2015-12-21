'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/sss/new/purchasing',
    {
        templateUrl : 'angular/partial/company/sss/purchasing/newpurchasing.html',
        controller  : 'NewSssPurchasingController',
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
    $routeProvider.when('/company/sss/list/purchasing',
    {
        templateUrl : 'angular/partial/company/sss/purchasing/listpurchasing.html',
        controller  : 'ListSssPurchasingController',
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
    $routeProvider.when('/company/sss/detail/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/sss/purchasing/detailpurchasing.html',
        controller  : 'DetailSssPurchasingController',
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
    $routeProvider.when('/company/sss/edit/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/sss/purchasing/editpurchasing.html',
        controller  : 'EditSssPurchasingController',
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
    $routeProvider.when('/company/sss/delete/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/sss/purchasing/editpurchasing.html',
        controller  : 'DeleteSssPurchasingController',
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