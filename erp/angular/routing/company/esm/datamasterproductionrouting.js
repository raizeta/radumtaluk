'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/esm/new/datamasterproduction',
    {
        templateUrl : 'angular/partial/company/esm/datamasterproduction/newdatamasterproduction.html',
        controller  : 'NewEsmDatamasterproductionController',
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
    $routeProvider.when('/company/esm/list/datamasterproduction',
    {
        templateUrl : 'angular/partial/company/esm/datamasterproduction/listdatamasterproduction.html',
        controller  : 'ListEsmDatamasterproductionController',
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
    $routeProvider.when('/company/esm/detail/datamasterproduction/:iddatamasterproduction',
    {
        templateUrl : 'angular/partial/company/esm/datamasterproduction/detaildatamasterproduction.html',
        controller  : 'DetailEsmDatamasterproductionController',
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
    $routeProvider.when('/company/esm/edit/datamasterproduction/:iddatamasterproduction',
    {
        templateUrl : 'angular/partial/company/esm/datamasterproduction/editdatamasterproduction.html',
        controller  : 'EditEsmDatamasterproductionController',
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
    $routeProvider.when('/company/esm/delete/datamasterproduction/:iddatamasterproduction',
    {
        templateUrl : 'angular/partial/company/esm/datamasterproduction/editdatamasterproduction.html',
        controller  : 'DeleteEsmDatamasterproductionController',
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