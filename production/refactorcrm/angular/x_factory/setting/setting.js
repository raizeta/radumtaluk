'use strict';
myAppModule.factory('SettingFac',function($http,$q,UtilService)
{

	var GetSetting = function()
	{ 
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var url 			= globalurl + "master/configurations/search?statusaktif=1";
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
    		if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else if(angular.isDefined(response.Configuration))
            {
                deferred.resolve(response.Configuration); 
            }
        })
        .error(function(err,status)
        {
        	deferred.reject(err);
        });	

        return deferred.promise;
	}
	var SetWhoSync = function(detail)
    {
        var url 				= UtilService.ApiUrl();
        var deferred 			= $q.defer();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "master/whosyncs",serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err)
        {
            deferred.reject(err);
        });
        return deferred.promise;
    }
	return{
			GetSetting:GetSetting,
			SetWhoSync:SetWhoSync
		}
});