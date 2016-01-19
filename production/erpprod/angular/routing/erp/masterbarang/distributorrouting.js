'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/erp/masterbarang/new/distributor',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/distributor/newdistributor.html',
		controller 	: 'NewDistributorController',
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
    $routeProvider.when('/erp/masterbarang/list/distributor',
    {
        templateUrl : 'angular/partial/erp/masterbarang/distributor/listdistributor.html',
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
	$routeProvider.when('/erp/masterbarang/detail/distributor/:iddistributor',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/distributor/detaildistributor.html',
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
	$routeProvider.when('/erp/masterbarang/edit/distributor/:iddistributor',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/distributor/editdistributor.html',
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
	$routeProvider.when('/erp/masterbarang/delete/distributor/:iddistributor',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/distributor/listdistributor.html',
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