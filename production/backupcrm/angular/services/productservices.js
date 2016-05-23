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

	var GetDataBarangs = function()
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01&STATUS=1";
		var method ="GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        var result = [];
	        angular.forEach(response.BarangPenjualan, function(value, key)
	        {
	            var KD_BARANG = value.KD_BARANG;
	            result.push(KD_BARANG);
	        });
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
    
    var GetObjectDataBarangs = function()
    {
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01&STATUS=1";
		var method ="GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        var result = [];
	        angular.forEach(response.BarangPenjualan, function(value, key)
	        {
	            var product = {};
	            product.KD_BARANG = value.KD_BARANG;
	            product.NM_BARANG = value.NM_BARANG;
	            result.push(product);
	        });
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
    
    var GetDataBarangsInventory = function(idcustomer,tanggalplan,sotype)
    {
		
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan + "&SO_TYPE=" + sotype;
		var method ="GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        var baranginventory = [];
	        angular.forEach(response.ProductInventory, function(value, key)
	        {
	            var KD_BARANG = value.KD_BARANG;
	            baranginventory.push(KD_BARANG);
	        });
	        deferred.resolve(baranginventory);
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
			GetDataBarangs:GetDataBarangs,
			GetObjectDataBarangs:GetObjectDataBarangs,
			GetDataBarangsInventory:GetDataBarangsInventory
		}
}]);