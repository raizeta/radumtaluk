'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/salesman/new/barangumum',
	{
		templateUrl	: 'angular/partial/salesman/newbarangumum.html',
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
    $routeProvider.when('/salesman/new/kategori',
    {
        templateUrl : 'angular/partial/salesman/newkategori.html',
        controller  : 'NewKategoriController',
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
    $routeProvider.when('/salesman/new/suplier',
    {
        templateUrl : 'angular/partial/salesman/newsuplier.html',
        controller  : 'NewSuplierController',
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

    $routeProvider.when('/salesman/new/tipebarang',
    {
        templateUrl : 'angular/partial/salesman/newtipebarang.html',
        controller  : 'NewTipeBarangController',
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

    $routeProvider.when('/salesman/new/barangunit',
    {
        templateUrl : 'angular/partial/salesman/newbarangunit.html',
        controller  : 'NewBarangUnitController',
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
