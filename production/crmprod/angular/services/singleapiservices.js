'use strict';
myAppModule.factory('singleapiService', ["$rootScope","$http","$q","$window","$filter",
function($rootScope,$http, $q, $window,$filter)
{
	$http.defaults.useXDomain = true;
    var geturl = function()
	{
		return "http://api.lukisongroup.com/master";
	}

	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

	var singlelistcustomer = function(idcustomer)
	{
		var globalurl = geturl();
		var deferred = $q.defer();
		var url = globalurl + "/customers/"+ idcustomer;
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

	var singlelistgroupcustomer = function(groupcustomer)
	{
		var globalurl = geturl();
		var deferred = $q.defer();
		var url = globalurl + "/customers/search?SCDL_GROUP="+ groupcustomer;
		var method ="GET";
		$http({method:method, url:url})
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

	var detailkunjungan = function(iduser,idcustomer,tanggal)
	{
		var globalurl = geturl();
		var deferred = $q.defer();
		var url = globalurl + "/detailkunjungans/search?USER_ID="+ iduser + "&CUST_ID=" + idcustomer +"&TGL=" + tanggal;
		
		var method ="GET";
		$http({method:method, url:url})
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

	var historikunjungan = function(iduser)
	{
		var url = geturl();
		var deferred = $q.defer();
		var url = url + "/detailkunjungans/search?USER_ID="+ iduser ;
		var method ="GET";
		$http({method:method, url:url})
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

	var gambarkujungan = function(iddetail)
	{
		var url = geturl();
		var deferred = $q.defer();
		var url = url + "/gambars/search?ID_DETAIL="+ iddetail ;
		var method ="GET";
		$http({method:method, url:url})
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

    var singledetailkunjungan = function(userInfo,groupcustomer,tanggalplan,resolvegpslocation)
    {
        var globalurl = geturl();
        var deferred = $q.defer();
        var url = globalurl + "/detailkunjungans/search?USER_ID="+ userInfo + "&SCDL_GROUP=" + groupcustomer +"&TGL=" + tanggalplan;
        var method ="GET";
        $http({method:method, url:url})
        .success(function(response) 
        {
            var customers = [];
            angular.forEach(response.DetailKunjungan, function(value, key) 
            {
                var ab={};
                ab.ID               = value.ID;
                ab.CUST_ID          = value.CUST_ID;
                ab.CUST_NM          = value.CUST_NM;
                ab.MAP_LAT          = value.MAP_LAT;
                ab.MAP_LNG          = value.MAP_LNG;
                ab.TANGGAL          = tanggalplan;
                var idcustomer      = value.CUST_ID;

                var longitude1      = resolvegpslocation.latitude;
                var latitude1       = resolvegpslocation.longitude;
                var longitude2      = value.MAP_LAT;
                var latitude2       = value.MAP_LNG;
                var jarak           = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);
                var roundjarak      = $filter('setDecimal')(jarak,0);
                ab.JARAK            = roundjarak;

                var x = $.ajax
                ({
                    url: globalurl + "/statuskunjungans/search?ID_DETAIL="+ ab.ID,
                    type: "GET",
                    dataType:"json",
                    async: false
                }).responseJSON;

                if(x.code != 0)
                {
                    var x = x.StatusKunjungan[0];
                    $rootScope.hasilstart           = parseInt(x.START_PIC);
                    $rootScope.hasilend             = parseInt(x.END_PIC);
                    $rootScope.datainventorystock   = parseInt(x.INVENTORY_STOCK);
                    $rootScope.datainventorysellin  = parseInt(x.INVENTORY_SELLIN);
                    $rootScope.datainventorysellout = parseInt(x.INVENTORY_SELLOUT);
                    $rootScope.datainventoryexpired = parseInt(x.INVENTORY_EXPIRED);
                }
                else
                {
                    $rootScope.hasilstart           = 0;
                    $rootScope.hasilend             = 0;
                    $rootScope.datainventorystock   = 0;
                    $rootScope.datainventorysellin  = 0;
                    $rootScope.datainventorysellout = 0;
                    $rootScope.datainventoryexpired = 0;
                }

                $rootScope.jumlahstartdanend = $rootScope.hasilend + $rootScope.hasilstart + $rootScope.datainventorystock + $rootScope.datainventorysellin + $rootScope.datainventorysellout + $rootScope.datainventoryexpired;
                var persen = ($rootScope.jumlahstartdanend * 100)/6;
                ab.persen = persen;
                if(persen == 100)
                {
                    ab.wanted = true;
                }
                customers.push(ab);
                deferred.resolve(customers);
            });   
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

	var singledetailkunjunganbyiddetail = function(iddetail)
	{
		var globalurl = geturl();
		var deferred = $q.defer();
		var url = globalurl + "/detailkunjunganbyiddetails/search?ID=" + iddetail;
		
		var method ="GET";
		$http({method:method, url:url})
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
			singlelistcustomer:singlelistcustomer,
			singlelistgroupcustomer:singlelistgroupcustomer,
			detailkunjungan:detailkunjungan,
			historikunjungan:historikunjungan,
			gambarkujungan:gambarkujungan,
			singledetailkunjungan:singledetailkunjungan,
			singledetailkunjunganbyiddetail:singledetailkunjunganbyiddetail
		}
}]);