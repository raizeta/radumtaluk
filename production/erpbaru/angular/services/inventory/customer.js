'use strict';
myAppModule.factory('CustomerService', ["$http","$q","$window",function($http, $q, $window)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

	var GetCustomers = function()
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "";
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
    var GetCustomer = function($id)
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/" + $id;
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
    var CreateCustomer = function()
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "";
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
    var UpdateCustomer = function($id)
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "" + $id;
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
    var DeleteCustomer = function($id)
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "" + $id;
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
			GetCustomers:GetCustomers,
			GetCustomer:GetCustomer,
			CreateCustomer:CreateCustomer,
			UpdateCustomer:UpdateCustomer,
			DeleteCustomer:DeleteCustomer
		}
}]);