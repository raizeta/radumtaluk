'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/orders/requestorder/list',
	{
		templateUrl	: 'angular/partial/orders/requestorder/listrequestorder.html',
		controller 	: 'ListRequestOrderController',
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
    $routeProvider.when('/orders/salesorder/list',
    {
        templateUrl : 'angular/partial/orders/salesorder/listsalesorder.html',
        controller  : 'ListSalesOrderController',
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
    $routeProvider.when('/orders/purchaseorder/list',
    {
        templateUrl : 'angular/partial/orders/purchaseorder/listpurchaseorder.html',
        controller  : 'ListPurchaseOrderController',
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