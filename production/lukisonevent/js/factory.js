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
}]);