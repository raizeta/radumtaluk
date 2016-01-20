'use strict';
myAppModule.factory('apiService', ["$http","$q","$window",function($http, $q, $window)
{
	var geturl = function()
	{
		return "http://labtest3-api.int/master";
	}

	var listbarangumum = function()
	{
		var url = geturl();

		var deferred = $q.defer();
		var url =  url + "/barangumums?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa&expand=type,kategori,unit";
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

	var listkategori = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url +"/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
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

	var listtipebarang = function(page)
	{
		var url = geturl();
		var page = page;
		var deferred = $q.defer();
		var url = url + "/tipebarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa&page="+ page;
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

	var listsuplier = function()
	{
		var url = geturl();

		var deferred = $q.defer();
		var url = url + "/supliers?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
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

	var listbarangunit = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/unitbarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
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
			listbarangumum:listbarangumum,
			listkategori:listkategori,
			listtipebarang:listtipebarang,
			listsuplier:listsuplier,
			listbarangunit:listbarangunit
		}
}]);