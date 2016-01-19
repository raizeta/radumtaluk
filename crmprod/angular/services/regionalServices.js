'use strict';
myAppModule.factory('regionalService', ["$http","$q","$window",function($http, $q, $window)
{
	var listpropinsi = function()
	{
		var deferred = $q.defer();
		var url = "angular/json/propinsi.json";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })
        .error(function()
        {
            deferred.reject(error);
        });

        return deferred.promise;
	}
	var listkabupaten = function()
	{
		var deferred = $q.defer();
		var url = "angular/json/kabupaten.json";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })
        .error(function()
        {
            deferred.reject(error);
        });

        return deferred.promise;
	}

	return{
			listpropinsi:listpropinsi,
			listkabupaten:listkabupaten,
		}
}]);