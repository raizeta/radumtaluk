'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/orders/requestorder/edit/:idrequestorder',
	{
		templateUrl	: 'angular/partial/orders/requestorder/editrequestorder.html',
		controller 	: 'EditRequestOrderController',
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
    $routeProvider.when('/orders/salesorder/edit/:idsalesorder',
    {
        templateUrl : 'angular/partial/orders/salesorder/editsalesorder.html',
        controller  : 'EditSalesOrderController',
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
    $routeProvider.when('/orders/purchaseorder/edit/:idpurchaseorder',
    {
        templateUrl : 'angular/partial/orders/purchaseorder/editpurchaseorder.html',
        controller  : 'EditPurchaseOrderController',
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