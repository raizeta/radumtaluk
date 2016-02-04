'use strict';
myAppModule.factory('regionalService', ["$http","$q","$window",function($http, $q, $window)
{
	var geturl = function()
	{
		return "http://lukison.int/master";
	}

	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

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

	var singlelistkabupaten = function(idkabupaten)
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/kabupatens/search?="+ idkabupaten;
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Kabupaten Error');
        });

        return deferred.promise;
	}
	return{
			listpropinsi:listpropinsi,
			listkabupaten:listkabupaten,
			singlelistkabupaten:singlelistkabupaten
		}
}]);