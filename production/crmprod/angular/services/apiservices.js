'use strict';
myAppModule.factory('apiService', ["$http","$q","$window",function($http, $q, $window)
{
	var listbarangumum = function()
	{
		var deferred = $q.defer();
		var url = "http://api.lukisongroup.com/master/barangumums?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa&expand=type,kategori,unit";
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
		var deferred = $q.defer();
		var url = "http://api.lukisongroup.com/master/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
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

	var listtipebarang = function()
	{
		var deferred = $q.defer();
		var url = "http://api.lukisongroup.com/master/tipebarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
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
		var deferred = $q.defer();
		var url = "http://api.lukisongroup.com/master/supliers?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
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
		var deferred = $q.defer();
		var url = "http://api.lukisongroup.com/master/unitbarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
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

	var listcustomer = function()
	{
		var deferred = $q.defer();
		var url = "http://lukison.int/master/customers";
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
			listbarangunit:listbarangunit,
			listcustomer:listcustomer
		}
}]);