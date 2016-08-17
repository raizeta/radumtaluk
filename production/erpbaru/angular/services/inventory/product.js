'use strict';
myAppModule.factory('ProductService', ["$http","$q","$window",function($http, $q, $window)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

	var GetProducts = function()
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/barangumums?expand=type,kategori,unit";
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
    var GetProduct = function($id)
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/barangumums/" + $id;
		var method ="GET";
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
    var CreateProduct = function()
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/barangumums";
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
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/barangumums/" + $id;
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
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/barangumums/" + $id;
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
}]);