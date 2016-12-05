angular.module('starter')
.factory('ChartsCustomerFac',function($rootScope,$http,$q,$filter,$window,UtilService,ArrayObjectService)
{
	
	var GetCustomerCharts = function()
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsalescustomers";
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

    var GetCustomerStockCharts = function()
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsalesstockcustomers";
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

    var GetCustomerExpiredCharts = function(tahunbulan)
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsalesexpiredcustomers?MONTH=" + tahunbulan;
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

    var GetCustomerTargetCharts = function(tahunbulan)
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsalestargetcustomers?MONTH=" + tahunbulan;
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

    var GetCustomerKunjunganCharts = function(tahunbulan)
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsaleskunjungancustomers?MONTH=" + tahunbulan;
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

    var GetNewCustomerCharts = function(tahunbulan)
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "/chart/esmsalesnewcustomers?MONTH=" + tahunbulan;
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
			GetCustomerCharts:GetCustomerCharts,
			GetCustomerStockCharts:GetCustomerStockCharts,
			GetCustomerExpiredCharts:GetCustomerExpiredCharts,
			GetCustomerTargetCharts:GetCustomerTargetCharts,
			GetCustomerKunjunganCharts:GetCustomerKunjunganCharts,
			GetNewCustomerCharts:GetNewCustomerCharts
		}
});