'use strict';
myAppModule.factory('configurationService', ["$http","$q","$window",function($http, $q, $window)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}
	
	var getConfigRadius = function()
	{ 
		var globalurl 		= getUrl();
		var deferred 		= $q.defer();
		var url = globalurl + "/configurations";
		var method ="GET";
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
			getConfigRadius:getConfigRadius
		}
}]);