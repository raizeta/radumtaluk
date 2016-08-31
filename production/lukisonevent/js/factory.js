angular.module('starter')
.factory('ProductService', ["$rootScope","$http","$q","$window",
function($rootScope,$http, $q, $window)
{
	var globalurl 		= $rootScope.linkurl.linkurl;
	var GetProducts = function()
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/productevents/search?STATUS=1";
		var method ="GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response.ProductEvent);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }

    var GetProduct = function($id)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/productevents/" + $id;
		var method ="GET";
		$http({method:method, url:url,cache:true})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var CreateProduct = function()
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/productevents";
		var method ="POST";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(result);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var UpdateProduct = function($id)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/productevents/" + $id;
		var method ="PUT";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var DeleteProduct = function($id)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/productevents/" + $id;
		var method ="DELETE";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
	return{
			GetProducts:GetProducts,
			GetProduct:GetProduct,
			CreateProduct:CreateProduct,
			UpdateProduct:UpdateProduct,
			DeleteProduct:DeleteProduct
		}
}])
.factory('OrderService', ["$rootScope","$http","$q","$window",
function($rootScope,$http, $q, $window)
{
	var globalurl 		= $rootScope.linkurl.linkurl;
	var deferred 		= $q.defer();
	var GetOrders = function()
    {
		var url = globalurl + "/orders/search?STATUS=1";
		var method ="GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response.Orders);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var GetOrder = function($id)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/orders/" + $id;
		var method ="GET";
		$http({method:method, url:url,cache:true})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var CreateOrder = function(detail)
    {
		var result              = $rootScope.seriliazeobject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

		var url = globalurl + "/orders";
		var method ="POST";
		$http.post(url,serialized,config)
        .success(function(response,status,headers,config) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var UpdateOrder = function($id)
    {
		var url = globalurl + "/orders/" + $id;
		var method ="PUT";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var DeleteOrder = function($id)
    {
		var url = globalurl + "/orders/" + $id;
		var method ="DELETE";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
	return{
			GetOrders:GetOrders,
			GetOrder:GetOrder,
			CreateOrder:CreateOrder,
			UpdateOrder:UpdateOrder,
			DeleteOrder:DeleteOrder
		}
}])
.factory('OrderDetailService', ["$rootScope","$http","$q","$window",
function($rootScope,$http, $q, $window)
{
	var globalurl 		= $rootScope.linkurl.linkurl;
	var deferred 		= $q.defer();
	var GetOrderDetails = function()
    {
		var url = globalurl + "/orderdetails/search?STATUS=1";
		var method ="GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response.Orderdetail);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var GetOrderDetail = function($id)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/orderdetails/" + $id;
		var method ="GET";
		$http({method:method, url:url,cache:true})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var CreateOrderDetail = function(detail)
    {
		var result              = $rootScope.seriliazeobject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

		var url = globalurl + "/orderdetails";
		var method ="POST";
		$http.post(url,serialized,config)
        .success(function(response,status,headers,config) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var UpdateOrderDetail = function($id)
    {
		var url = globalurl + "/orderdetails/" + $id;
		var method ="PUT";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
    var DeleteOrderDetail = function($id)
    {
		var url = globalurl + "/orderdetails/" + $id;
		var method ="DELETE";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
        })
        .error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });	

        return deferred.promise;  
    }
	return{
			GetOrderDetails:GetOrderDetails,
			GetOrderDetail:GetOrderDetail,
			CreateOrderDetail:CreateOrderDetail,
			UpdateOrderDetail:UpdateOrderDetail,
			DeleteOrderDetail:DeleteOrderDetail
		}
}]);