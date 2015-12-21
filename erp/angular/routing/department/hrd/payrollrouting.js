'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/department/hrd/new/payroll',
    {
        templateUrl : 'angular/partial/department/hrd/payroll/newpayroll.html',
        controller  : 'NewHrdPayrollController',
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
    $routeProvider.when('/department/hrd/list/payroll',
    {
        templateUrl : 'angular/partial/department/hrd/payroll/listpayroll.html',
        controller  : 'ListHrdPayrollController',
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
    $routeProvider.when('/department/hrd/detail/payroll/:idpayroll',
    {
        templateUrl : 'angular/partial/department/hrd/payroll/detailpayroll.html',
        controller  : 'DetailHrdPayrollController',
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
    $routeProvider.when('/department/hrd/edit/payroll/:idpayroll',
    {
        templateUrl : 'angular/partial/department/hrd/payroll/editpayroll.html',
        controller  : 'EditHrdPayrollController',
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
    $routeProvider.when('/department/hrd/delete/payroll/:idpayroll',
    {
        templateUrl : 'angular/partial/department/hrd/payroll/editpayroll.html',
        controller  : 'DeleteHrdPayrollController',
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