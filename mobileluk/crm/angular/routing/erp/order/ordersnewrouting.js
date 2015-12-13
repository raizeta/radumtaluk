'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/orders/requestorder/new',
	{
		templateUrl	: 'angular/partial/erp/order/requestorder/newrequestorder.html',
		controller 	: 'NewRequestOrderController',
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
    $routeProvider.when('/orders/salesorder/new',
    {
        templateUrl : 'angular/partial/erp/order/salesorder/newsalesorder.html',
        controller  : 'NewSalesOrderController',
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
    $routeProvider.when('/orders/purchaseorder/new',
    {
        templateUrl : 'angular/partial/erp/order/purchaseorder/newpurchaseorder.html',
        controller  : 'NewPurchaseOrderController',
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