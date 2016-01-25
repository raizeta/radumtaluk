'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/erp/masterbarang/new/customer',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/customer/newcustomer.html',
		controller 	: 'NewCustomerController',
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
    $routeProvider.when('/erp/masterbarang/list/customer',
    {
        templateUrl : 'angular/partial/erp/masterbarang/customer/listcustomer.html',
        controller  : 'ListDistributorController',
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
	$routeProvider.when('/erp/masterbarang/detail/customer/:idcustomer',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/customer/detailcustomer.html',
		controller 	: 'DetailDistributorController',
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
	$routeProvider.when('/erp/masterbarang/edit/customer/:idcustomer',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/customer/editcustomer.html',
		controller 	: 'EditDistributorController',
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
	$routeProvider.when('/erp/masterbarang/delete/customer/:idcustomer',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/customer/listcustomer.html',
		controller 	: 'DeleteDistributorController',
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