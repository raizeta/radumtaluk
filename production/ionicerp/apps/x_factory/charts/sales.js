angular.module('starter')
.factory('ChartsSalesFac',function($rootScope,$http,$q,$filter,$window,UtilService,ArrayObjectService)
{
	var globalurl 		= UtilService.ApiUrl();
	var GetVisitStock = function(statuscode)
    {
		var deferred 		= $q.defer();
		var month 			= $filter('date')(new Date(),'MM');
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsalesmds?MONTH=" + month;
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

	return{
			GetVisitStock:GetVisitStock
		}
});