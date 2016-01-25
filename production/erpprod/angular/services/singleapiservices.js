'use strict';
myAppModule.factory('singleapiService', ["$http","$q","$window",function($http, $q, $window)
{
	var deferred = $q.defer();
	var geturl = function()
	{
		return "http://lukison.int/master";
	}

	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

	var singlelistbarangumum = function(idbarangumum)
	{
		var url = geturl();
		var idbarangumum = idbarangumum;
		var deferred = $q.defer();

		var url = url +"/barangumums/"+ idbarangumum +"?expand=type,kategori,unit";
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

	var singlelistkategori = function(idkategori)
	{
		var url = geturl();
		var idkategori = idkategori;
		var deferred = $q.defer();
		var url = url +"/kategoris/"+ idkategori;
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

	var singlelisttipebarang = function(idtipebarang)
	{
		var url = geturl();
		var idtipebarang = idtipebarang;
		var deferred = $q.defer();
		var url = url +"/tipebarangs/"+ idtipebarang;
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

	var singlelistsuplier = function(idsuplier)
	{
		var url = geturl();
		var idsuplier = idsuplier;
		var deferred = $q.defer();
		var url = url +"/supliers/"+ idsuplier;
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

	var singlelistbarangunit = function(idbarangunit)
	{
		var url = geturl();
		var idbarangunit = idbarangunit;
		var deferred = $q.defer();
		var url = url +"/unitbarangs/"+ idbarangunit;
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
			singlelistbarangumum:singlelistbarangumum,
			singlelistkategori:singlelistkategori,
			singlelisttipebarang:singlelisttipebarang,
			singlelistsuplier:singlelistsuplier,
			singlelistbarangunit:singlelistbarangunit
		}
}]);