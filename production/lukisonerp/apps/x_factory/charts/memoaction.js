angular.module('starter')
.factory('SalesMemoFac',function($rootScope,$http,$q,$filter,$window,UtilService,ArrayObjectService)
{

	var GetMemoByDate = function(tanggalplan)
    {
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsalesmdmemos/search?TGL=" + tanggalplan;
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response.Salesmemo);
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
			GetMemoByDate:GetMemoByDate
		}
});