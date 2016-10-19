'use strict';
myAppModule.factory('CustomerFac',function($http,$q,$window,UtilService)
{
	var GetGroupCustomers = function()
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customergroups";
		var method 		= "GET";
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
	var GetSingleGroupCustomer = function(groupcustomer)
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customers/search?SCDL_GROUP="+ groupcustomer;
		var method 		= "GET";
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
	var GetCustomers = function()
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customers/search?STATUS=1";
		var method 		= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
		  	deferred.resolve(response.Customer);
        })
        .error(function()
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

	var GetSingleCustomer = function(idcustomer)
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customers/"+ idcustomer;
		var method 		= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
		  	deferred.resolve(response);
        })
        .error(function()
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
			GetGroupCustomers:GetGroupCustomers,
			GetSingleCustomer:GetSingleCustomer,
			GetSingleGroupCustomer:GetSingleGroupCustomer,
			GetCustomers:GetCustomers
		}
});