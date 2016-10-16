'use strict';
myAppModule.factory('ProductFac',
function($rootScope,$http,$q,UtilService)
{

	var GetProducts = function()
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

	return{
			GetProducts:GetProducts
		}
});