'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/menu',
	{
		templateUrl	: 'angular/partial/dashboard/menu.html',
		controller 	: 'MenuController',
		resolve: 
		{
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
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
    $routeProvider.when('/inventory',
    {
        templateUrl : 'angular/partial/dashboard/inventory.html',
        controller  : 'InventoryController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
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
    $routeProvider.when('/chart',
    {
        templateUrl : 'angular/partial/dashboard/chart.html',
        controller  : 'ChartController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
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
    $routeProvider.when('/requestorder',
    {
        templateUrl : 'angular/partial/dashboard/requestorder.html',
        controller  : 'RequestOrderController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
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
    $routeProvider.when('/chat',
    {
        templateUrl : 'angular/partial/dashboard/chat.html',
        controller  : 'ChatController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
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

    $routeProvider.otherwise({redirectTo:'/error/404'});

}]);
