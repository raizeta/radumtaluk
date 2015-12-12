'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/erp/order/list/requestorder',
	{
		templateUrl	: 'angular/partial/erp/order/requestorder/listrequestorder.html',
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
    $routeProvider.when('/erp/order/list/salesorder',
    {
        templateUrl : 'angular/partial/erp/order/salesorder/listsalesorder.html',
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
    $routeProvider.when('/erp/order/list/purchaseorder',
    {
        templateUrl : 'angular/partial/erp/order/purchaseorder/listpurchaseorder.html',
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