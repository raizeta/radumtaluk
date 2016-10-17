'use strict';
myAppModule.factory('ProductFac',
function($rootScope,$http,$q,UtilService)
{

	var GetSearchProductsActive = function()
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var url 			= globalurl + "master/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01&STATUS=1";
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                } 
            }
            else
            {
		        deferred.resolve(response.BarangPenjualan);
	    	}
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
    var GetSearchProductsAll = function()
    {
        var globalurl       = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = globalurl + "master/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01";
        var method          = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                } 
            }
            else
            {
                deferred.resolve(response.BarangPenjualan);
            }
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
    var GetProducts = function()
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var url 			= globalurl + "master/barangpenjualans";
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                } 
            }
            else
            {
		        deferred.resolve(response.BarangPenjualan);
	    	}
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
    var GetProduct = function($idproduct)
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var url 			= globalurl + "master/barangpenjualans/" + $idproduct;
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                } 
            }
            else
            {
		        deferred.resolve(response.BarangPenjualan);
	    	}
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
    var UpdateProduct = function($idproduct,status)
    {
        var data                = {};
        data.STATUS             = status;

        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();
        var url                 = globalurl + "master/barangpenjualans/" + $idproduct;

        var result              = UtilService.SerializeObject(data);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.put(url,serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });
        return deferred.promise;  
    }

	return{
			GetSearchProductsActive:GetSearchProductsActive,
            GetSearchProductsAll:GetSearchProductsAll,
			GetProducts:GetProducts,
			GetProduct:GetProduct,
            UpdateProduct:UpdateProduct
		}
});