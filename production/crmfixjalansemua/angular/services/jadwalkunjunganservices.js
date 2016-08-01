'use strict';
myAppModule.factory('JadwalKunjunganService', ["$rootScope","$http","$q","$filter","$window","LocationService",
function($rootScope,$http, $q, $filter, $window,LocationService)
{
	var LSListHistory,LSListAgenda;
    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
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
            if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                } 
            }
            else
            {
                LSListHistory = 
                {
                    LSListHistoryTgl : tanggalsekarang,
                    LSListHistory : response.JadwalKunjungan
                }
                var ListHistory = JSON.stringify(LSListHistory);
                $window.localStorage.setItem('LSListHistory', ListHistory);
                deferred.resolve(response.JadwalKunjungan); 
            }
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
            if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                } 
            }
            else
            {
               deferred.resolve(response.JadwalKunjungan[0]); 
            }
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
        var url = globalurl + "/statuskunjunganprosedurs/search?USER_ID="+ userInfo +"&TGL=" + tanggalplan + "&SCDL_GROUP=" + groupcustomer + "&access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
        var method ="GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
                LocationService.GetGpsLocation()
                .then(function(responsegps)
                {
                    var customers = [];
                    angular.forEach(response.StatusKunjunganProsedur, function(value, key) 
                    {
                        var customer={};
                        customer.ID               = value.ID;
                        customer.CUST_ID          = value.CUST_ID;
                        customer.CUST_NM          = value.CUST_NM;
                        customer.MAP_LAT          = value.MAP_LAT;
                        customer.MAP_LNG          = value.MAP_LNG;
                        customer.TANGGAL          = tanggalplan;
                        customer.CHECKIN_TIME     = $filter('date')(value.CHECKIN_TIME,'dd-MM-yyyy HH:mm:ss');
                        customer.CHECKOUT_TIME    = $filter('date')(value.CHECKOUT_TIME,'dd-MM-yyyy HH:mm:ss');

                        customer.START_PIC              = ((value.START_PIC == null         || value.START_PIC == 0) ? 0 : 1);
                        customer.END_PIC                = ((value.END_PIC == null           || value.END_PIC == 0) ? 0 : 1);
                        customer.CHECK_IN               = ((value.CHECK_IN == null          || value.CHECK_IN == 0) ? 0 : 1);
                        customer.CHECK_OUT              = ((value.CHECK_OUT == null         || value.CHECK_OUT == 0) ? 0 : 1);
                        customer.INVENTORY_STOCK        = ((value.INVENTORY_STOCK == null   || value.INVENTORY_STOCK == 0) ? 0 : 1);
                        customer.INVENTORY_SELLIN       = ((value.INVENTORY_SELLIN == null  || value.INVENTORY_SELLIN == 0) ? 0 : 1);
                        customer.INVENTORY_SELLOUT      = ((value.INVENTORY_SELLOUT == null || value.INVENTORY_SELLOUT == 0) ? 0 : 1);
                        customer.INVENTORY_EXPIRED      = ((value.INVENTORY_EXPIRED == null || value.INVENTORY_EXPIRED == 0) ? 0 : 1);

                        if(customer.CHECK_OUT  == 1)
                        {
                            customer.imagecheckout = "asset/admin/dist/img/customer.jpg";
                        }
                        if((customer.CHECK_OUT  == 0 || customer.CHECK_OUT  == null) && customer.CHECK_IN  == 1)
                        {
                            customer.imagecheckout = "asset/admin/dist/img/customerlogo.jpg";
                        }
                        if(customer.CHECK_IN  == 0 || customer.CHECK_IN  == null)
                        {
                            customer.imagecheckout = "asset/admin/dist/img/normal.jpg";
                        }
                        var idcustomer      = value.CUST_ID;
                        
                        var longitude1      = responsegps.longitude;
                        var latitude1       = responsegps.latitude;
                        
                        var longitude2      = value.MAP_LNG;
                        var latitude2       = value.MAP_LAT;
                        
                        
                        var jarak           = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);
                        //var roundjarak      = $filter('setDecimal')(jarak,0);
                        if(jarak < 1000)
                        {
                            customer.JARAKMETER = $filter('setDecimal')(jarak,0) + " meter";
                        }
                        else
                        {
                            customer.JARAKMETER = $filter('setDecimal')(jarak/1000,1) + " km";
                        }
                        customer.JARAK            = $filter('setDecimal')(jarak/1000,0);


                        var totalstatus = customer.START_PIC + customer.END_PIC + customer.INVENTORY_STOCK + customer.INVENTORY_SELLIN + customer.INVENTORY_SELLOUT + customer.INVENTORY_SELLOUT + customer.CHECK_IN + customer.CHECK_OUT;
                        var persen = (totalstatus * 100)/8;
                        customer.persen = persen;
                        if(persen == 100)
                        {
                            customer.wanted = true;
                        }
                        customers.push(customer);
                    });

                    if(tanggalsekarang == tanggalplan)
                    {
                        LSListAgenda = 
                        {
                            LSListAgendaTgl     : tanggalsekarang,
                            LSListAgenda        : customers
                        }
                        var ListAgenda = JSON.stringify(LSListAgenda);
                        $window.localStorage.setItem('LSListAgenda', ListAgenda);
                    }
                    
                    deferred.resolve(customers);  
                });  
            }  
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
            if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                } 
            }
            else
            {
                var result = response.StatusKunjungan[0];
                var resultstatus = {};
                resultstatus.statusstartpic              = ((result.START_PIC == null         || result.START_PIC == 0) ? 0 : 1);
                resultstatus.statusendpic                = ((result.END_PIC == null           || result.END_PIC == 0) ? 0 : 1);
                resultstatus.statusinventorystock        = ((result.INVENTORY_STOCK == null   || result.INVENTORY_STOCK == 0) ? 0 : 1);
                resultstatus.statusinventorysellin       = ((result.INVENTORY_SELLIN == null  || result.INVENTORY_SELLIN == 0) ? 0 : 1);
                resultstatus.statusinventorysellout      = ((result.INVENTORY_SELLOUT == null || result.INVENTORY_SELLOUT == 0) ? 0 : 1);
                resultstatus.statusinventoryexpired      = ((result.INVENTORY_EXPIRED == null || result.INVENTORY_EXPIRED == 0) ? 0 : 1);
                resultstatus.statusinventoryreturn       = ((result.INVENTORY_RETURN == null  || result.INVENTORY_RETURN == 0) ? 0 : 1);
                resultstatus.statusinventoryrequest      = ((result.REQUEST == null  || result.REQUEST == 0) ? 0 : 1);
                
                deferred.resolve(resultstatus); 
            }
              
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

    function getLocalStorageHistory() 
    {
        return LSListHistory;
    }

    function getLocalStorageAgenda() 
    {
        return LSListAgenda;
    }

    function init() 
    {
        if ($window.localStorage.getItem('LSListHistory')) 
        {
            LSListHistory = JSON.parse($window.localStorage.getItem('LSListHistory'));
        }
        if ($window.localStorage.getItem('LSListAgenda')) 
        {
            LSListAgenda = JSON.parse($window.localStorage.getItem('LSListAgenda'));
        }
    }
    init();

	return{
			GetListHistory:GetListHistory,
            GetGroupCustomerByTanggalPlan:GetGroupCustomerByTanggalPlan,
			GetSingleDetailKunjunganProsedur:GetSingleDetailKunjunganProsedur,
            GetJustStatusKunjungan:GetJustStatusKunjungan,
            getLocalStorageHistory:getLocalStorageHistory,
            getLocalStorageAgenda:getLocalStorageAgenda
		}
}]);