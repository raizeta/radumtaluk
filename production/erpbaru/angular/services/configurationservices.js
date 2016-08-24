'use strict';
myAppModule.factory('configurationService', ["$http","$q","$window",function($http, $q, $window)
{
	var globalurl       = $rootScope.linkurl.linkurl;
	var getConfigRadius = function()
	{ 
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