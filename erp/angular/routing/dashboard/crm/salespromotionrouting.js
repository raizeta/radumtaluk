'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/crm/new/salespromotion',
    {
        templateUrl : 'angular/partial/dashboard/crm/salespromotion/newsalespromotion.html',
        controller  : 'NewSalesPromotionController',
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
    $routeProvider.when('/dashboard/crm/list/salespromotion',
    {
        templateUrl : 'angular/partial/dashboard/crm/salespromotion/listsalespromotion.html',
        controller  : 'ListSalesPromotionController',
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
    $routeProvider.when('/dashboard/crm/detail/salespromotion/:idsalespromotion',
    {
        templateUrl : 'angular/partial/dashboard/crm/salespromotion/detailsalespromotion.html',
        controller  : 'DetailSalesPromotionController',
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
    $routeProvider.when('/dashboard/crm/edit/salespromotion/:idsalespromotion',
    {
        templateUrl : 'angular/partial/dashboard/crm/salespromotion/editsalespromotion.html',
        controller  : 'EditSalesPromotionController',
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
    $routeProvider.when('/dashboard/crm/delete/salespromotion/:idsalespromotion',
    {
        templateUrl : 'angular/partial/dashboard/crm/salespromotion/editsalespromotion.html',
        controller  : 'DeleteSalesPromotionController',
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