'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/dashboard/crm/new/salesman',
    {
        templateUrl : 'angular/partial/dashboard/crm/salesman/newsalesman.html',
        controller  : 'NewSalesmanController',
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
    $routeProvider.when('/dashboard/crm/list/salesman',
    {
        templateUrl : 'angular/partial/dashboard/crm/salesman/listsalesman.html',
        controller  : 'ListSalesmanController',
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
    $routeProvider.when('/dashboard/crm/detail/salesman/:idsalesman',
    {
        templateUrl : 'angular/partial/dashboard/crm/salesman/detailsalesman.html',
        controller  : 'DetailSalesmanController',
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
    $routeProvider.when('/dashboard/crm/edit/salesman/:idsalesman',
    {
        templateUrl : 'angular/partial/dashboard/crm/salesman/editsalesman.html',
        controller  : 'EditSalesmanController',
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
    $routeProvider.when('/dashboard/crm/delete/salesman/:idsalesman',
    {
        templateUrl : 'angular/partial/dashboard/crm/salesman/editsalesman.html',
        controller  : 'DeleteSalesmanController',
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