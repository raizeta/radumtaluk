'use strict';
myAppModule.factory('ListKunjunganFac',
function($rootScope,$http,$q,$filter,$window,UtilService)
{
	var LSListHistory,LSListAgenda;
    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');

	var GetAllAgendaByUser = function(auth)
	{
		var iduser            = auth.id;
		var globalurl         = UtilService.ApiUrl();
		var deferred          = $q.defer();
		var url               = globalurl + "master/jadwalkunjungans/search?USER_ID=" + iduser;
		var method            = "GET";
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

	var GetGroupCustomerByTanggalPlan = function(auth,tanggalplan)
    { 
        var idsalesman      = auth.id;
        var globalurl       = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = globalurl + "master/jadwalkunjungans/search?USER_ID="+ idsalesman + "&TGL1=" + tanggalplan;
        var method          = "GET";
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

	var GetSingleDetailKunjunganProsedur = function(auth,tanggalplan,SCDL_GROUP)
    {
        var idsalesman      = auth.id;
        
        var globalurl   = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var url         = globalurl + "master/statuskunjunganprosedurs/search?USER_ID="+ idsalesman +"&TGL=" + tanggalplan + "&SCDL_GROUP=" + SCDL_GROUP;
        var method      = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response,status,headers,config) 
        {

            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }

            else
            {  
                deferred.resolve(response.StatusKunjunganProsedur);  
            }  
        })
        .error(function(err,status)
        {
            deferred.reject(err);
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
        .success(function(response,status,headers,config) 
        {
            console.log(headers());
            if(angular.isDefined(headers()['last-modified']))
            {
                console.log("Dari Cache");
            }

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

	return{
			GetAllAgendaByUser:GetAllAgendaByUser,
            GetGroupCustomerByTanggalPlan:GetGroupCustomerByTanggalPlan,
			GetSingleDetailKunjunganProsedur:GetSingleDetailKunjunganProsedur,
            GetJustStatusKunjungan:GetJustStatusKunjungan
		}
});