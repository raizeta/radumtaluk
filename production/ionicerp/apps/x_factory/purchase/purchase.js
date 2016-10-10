angular.module('starter')
.factory('PurchaseFac',function($rootScope,$http,$q,$window,UtilService)
{
	var globalurl 		= UtilService.ApiUrl();
	var SearchPurchases = function(statuscode)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/lgerp/purchaseorders/search?STATUS=" + statuscode;
		var method ="GET";
		$http({method:method, url:url,cache:true})
        .success(function(response) 
        {
	        deferred.resolve(response.PurchaseOrder);
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
	var GetPurchases = function()
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/lgerp/purchaseorders";
		var method ="GET";
		$http({method:method, url:url,cache:true})
        .success(function(response) 
        {
	        deferred.resolve(response.PurchaseOrder);
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
    var GetPurchase = function($id)
    {
		var deferred 		= $q.defer();
		var url 			= globalurl + "/lgerp/purchaseorders/" + $id;
		var method 			= "GET";
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
    var CreatePurchase = function()
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/lgerp/purchaseorders";
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
    var UpdatePurchase = function($id)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/lgerp/purchaseorders/" + $id;
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
    var DeletePurchase = function($id)
    {
		var deferred 		= $q.defer();
		var url = globalurl + "/lgerp/purchaseorders/" + $id;
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
			SearchPurchases:SearchPurchases,
			GetPurchases:GetPurchases,
			GetPurchase:GetPurchase,
			CreatePurchase:CreatePurchase,
			UpdatePurchase:UpdatePurchase,
			DeletePurchase:DeletePurchase
		}
});