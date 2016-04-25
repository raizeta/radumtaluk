'use strict';
myAppModule.factory('JadwalKunjunganService', ["$rootScope","$http","$q","$filter","$window","LocationService",
function($rootScope,$http, $q, $filter, $window,LocationService)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}	
	var GetListHistory = function(userinfo)
	{
		var iduser = userinfo.id;
		var globalurl = getUrl();
		var deferred = $q.defer();
		var url = globalurl + "/jadwalkunjungans/search?USER_ID=" + iduser;
		var method ="GET";
		$http({method:method, url:url,cache:false})
		.success(function(response,status,headers) 
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

	var GetGroupCustomerByTanggalPlan = function(userInfo,tanggalplan)
    { 
        var idsalesman      = userInfo.id;
        var globalurl       = getUrl();
        var deferred        = $q.defer();
        var url = globalurl + "/jadwalkunjungans/search?USER_ID="+ idsalesman + "&TGL1=" + tanggalplan;
        var method ="GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            console.log(response);
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

	var GetSingleDetailKunjunganProsedur = function(userInfo,groupcustomer,tanggalplan,resolvegpslocation)
    {
        var globalurl = getUrl();
        var deferred = $q.defer();
        var url = globalurl + "/statuskunjunganprosedurs/search?USER_ID="+ userInfo +"&TGL=" + tanggalplan + "&SCDL_GROUP=" + groupcustomer;
        var method ="GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            console.log(response);
            LocationService.GetGpsLocation()
            .then(function(responsegps)
            {
                var customers = [];
                angular.forEach(response.StatusKunjunganProsedur, function(value, key) 
                {
                    var ab={};
                    ab.ID               = value.ID;
                    ab.CUST_ID          = value.CUST_ID;
                    ab.CUST_NM          = value.CUST_NM;
                    ab.MAP_LAT          = value.MAP_LAT;
                    ab.MAP_LNG          = value.MAP_LNG;
                    ab.TANGGAL          = tanggalplan;
                    var idcustomer      = value.CUST_ID;
                    
                    var longitude1      = responsegps.latitude;
                    var latitude1       = responsegps.longitude;

                    var longitude2      = value.MAP_LAT;
                    var latitude2       = value.MAP_LNG;
                    var jarak           = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);
                    var roundjarak      = $filter('setDecimal')(jarak,0);
                    ab.JARAK            = roundjarak;

                    var statusstartpic              = ((value.START_PIC == null         || value.START_PIC == 0) ? 0 : 1);
                    var statusendpic                = ((value.END_PIC == null           || value.END_PIC == 0) ? 0 : 1);
                    var statuscheckin               = ((value.CHECK_IN == null          || value.CHECK_IN == 0) ? 0 : 1);
                    var statuscheckout              = ((value.CHECK_OUT == null         || value.CHECK_OUT == 0) ? 0 : 1);
                    var statusinventorystock        = ((value.INVENTORY_STOCK == null   || value.INVENTORY_STOCK == 0) ? 0 : 1);
                    var statusinventorysellin       = ((value.INVENTORY_SELLIN == null  || value.INVENTORY_SELLIN == 0) ? 0 : 1);
                    var statusinventorysellout      = ((value.INVENTORY_SELLOUT == null || value.INVENTORY_SELLOUT == 0) ? 0 : 1);
                    var statusinventoryexpired      = ((value.INVENTORY_EXPIRED == null || value.INVENTORY_EXPIRED == 0) ? 0 : 1);


                    var totalstatus = statusstartpic + statusendpic + statusinventorystock + statusinventorysellin + statusinventorysellout + statusinventoryexpired + statuscheckin + statuscheckout;
                    var persen = (totalstatus * 100)/8;
                    ab.persen = persen;
                    if(persen == 100)
                    {
                        ab.wanted = true;
                    }
                    customers.push(ab);
                });
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
    var GetJustStatusKunjungan = function(ID_DETAIL)
    {
        var globalurl = getUrl();
        var deferred = $q.defer();
        var url = globalurl + "/statuskunjungans/search?ID_DETAIL="+ ID_DETAIL;
        var method ="GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            deferred.resolve(response.StatusKunjungan[0]);  
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
			GetListHistory:GetListHistory,
            GetGroupCustomerByTanggalPlan:GetGroupCustomerByTanggalPlan,
			GetSingleDetailKunjunganProsedur:GetSingleDetailKunjunganProsedur,
            GetJustStatusKunjungan:GetJustStatusKunjungan
		}
}]);