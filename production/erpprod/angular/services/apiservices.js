'use strict';
myAppModule.factory('apiService', ["$http","$q","$window",function($http, $q, $window)
{
	var geturl = function()
	{
		return "http://labtest3-api.int/master";
	}

	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

	var listbarangumum = function()
	{
		var url = geturl();
		var token = gettoken();

		var deferred = $q.defer();
		var url =  url + "/barangumums?expand=type,kategori,unit";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })
        .error(function()
        {
            deferred.reject(error);
            console.log('List Barang Umum Error');
        });

        return deferred.promise;
	}

	var listkategori = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url +"/kategoris";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Kategori Error');
        });

        return deferred.promise;
	}

	var listtipebarang = function(page)
	{
		var url = geturl();
		var token = gettoken();

		var page = page;
		var deferred = $q.defer();
		var url = url + "/tipebarangs"+ token;
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Tipe Barang Error');
        });

        return deferred.promise;
	}

	var listsuplier = function()
	{
		var url = geturl();

		var deferred = $q.defer();
		var url = url + "/supliers";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Suplier Error');
        });

        return deferred.promise;
	}

	var listbarangunit = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/unitbarangs";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Barang Unit Error');
        });

        return deferred.promise;
	}

	var listperusahaan = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/perusahaans";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Perusahaan Error');
        });

        return deferred.promise;
	}
	var listprovinsi = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/provinsis";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Provinsi Error');
        });

        return deferred.promise;
	}
	var listkabupaten = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/kabupatens";
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
	var listkecamatan = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = "angular/json/kecamatan.json";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  console.log(response);
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Kabupaten Error');
        });

        return deferred.promise;
	}


	var listcustomers = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/customers?expand=kats,katparents";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Customers Error');
        });

        return deferred.promise;
	}

	var listparentcustomerkategoris = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/customkategoris/search?CUST_KTG_PARENT=0";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Customers Error');
        });

        return deferred.promise;
	}

	var listchildcustomerkategoris = function(idparent)
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/customkategoris/search?CUST_KTG_PARENT="+ idparent;
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Customers Error');
        });

        return deferred.promise;
	}

	var listdistributor = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/distributors";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Distributor Error');
        });

        return deferred.promise;
	}

	var listemployee = function()
	{
		var url = geturl();
		
		var deferred = $q.defer();
		var url = url + "/employees";
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
		  deferred.resolve(response);
        })

        .error(function()
        {
            deferred.reject(error);
            console.log('List Employee Error');
        });

        return deferred.promise;
	}
	
	return{
			listbarangumum:listbarangumum,
			listkategori:listkategori,
			listtipebarang:listtipebarang,
			listsuplier:listsuplier,
			listbarangunit:listbarangunit,
			listperusahaan:listperusahaan,
			listprovinsi:listprovinsi,
			listkabupaten:listkabupaten,
			listcustomers:listcustomers,
			listdistributor:listdistributor,
			listparentcustomerkategoris:listparentcustomerkategoris,
			listchildcustomerkategoris:listchildcustomerkategoris,
			listemployee:listemployee,
			listkecamatan:listkecamatan
		}
}]);