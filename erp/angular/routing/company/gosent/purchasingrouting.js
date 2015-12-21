'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/gosent/new/purchasing',
    {
        templateUrl : 'angular/partial/company/gosent/purchasing/newpurchasing.html',
        controller  : 'NewGosentPurchasingController',
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
    $routeProvider.when('/company/gosent/list/purchasing',
    {
        templateUrl : 'angular/partial/company/gosent/purchasing/listpurchasing.html',
        controller  : 'ListGosentPurchasingController',
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
    $routeProvider.when('/company/gosent/detail/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/gosent/purchasing/detailpurchasing.html',
        controller  : 'DetailGosentPurchasingController',
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
    $routeProvider.when('/company/gosent/edit/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/gosent/purchasing/editpurchasing.html',
        controller  : 'EditGosentPurchasingController',
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
    $routeProvider.when('/company/gosent/delete/purchasing/:idpurchasing',
    {
        templateUrl : 'angular/partial/company/gosent/purchasing/editpurchasing.html',
        controller  : 'DeleteGosentPurchasingController',
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