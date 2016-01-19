'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider,$locationProvider)
{
	$routeProvider.when('/erp/masterbarang/new/barangumum',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/barangumum/newbarangumum.html',
		controller 	: 'NewBarangUmumController',
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
    $routeProvider.when('/erp/masterbarang/list/barangumum',
    {
        templateUrl : 'angular/partial/erp/masterbarang/barangumum/listbarangumum.html',
        controller  : 'ListBarangUmumController',
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
	$routeProvider.when('/erp/masterbarang/detail/barangumum/:idbarangumum',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/barangumum/detailbarangumum.html',
		controller 	: 'DetailBarangUmumController',
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
	$routeProvider.when('/erp/masterbarang/edit/barangumum/:idbarangumum',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/barangumum/editbarangumum.html',
		controller 	: 'EditBarangUmumController',
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
	$routeProvider.when('/erp/masterbarang/delete/barangumum/:idbarangumum',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/barangumum/listbarangumum.html',
		controller 	: 'DeleteBarangUmumController',
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