'use strict';
myAppModule.factory('ManagerFac',function($rootScope,$http,$q,$window,UtilService)
{
	var getManagerMemo = function()
	{
		var deferred      = $q.defer();
        var getUrl        = UtilService.ApiUrl();
		var url           = getUrl + "master/salesmanmemos";
		var method        = "GET";
		$http({method:method, url:url})
		.success(function(response) 
		{
			if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else if(angular.isDefined(response.Salesmanmemo))
            {
                deferred.resolve(response.Salesmanmemo); 
            }
		})
		.error(function(err,status)
        {
        	deferred.reject(err);
        });
		return deferred.promise;
	}
	var setManagerMemo = function(detail)
	{
		var url                 = UtilService.ApiUrl();
        var deferred            = $q.defer();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "master/salesmanmemos",serialized,config)
        .success(function(response,status,headers,config) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
                deferred.resolve(response); 
            }
        })
        .error(function(err)
        {
            deferred.reject(err);
        });

        return deferred.promise;
	}
    var getManagers = function(username,password,autouuid)
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();

        var autouuid        = autouuid;
        var urluuid         = getUrl + "login/uuids/search?POSITION_ACCESS=1";
        $http.get(urluuid)
        .success(function(response,status, headers, config) 
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
                deferred.resolve(response.user); 
            }
        })
        .error(function(err)
        {
            deferred.reject("username_salah");
        });


        return deferred.promise;
    }
	return{
			getManagerMemo:getManagerMemo,
			setManagerMemo:setManagerMemo,
            getManagers:getManagers
		}
});