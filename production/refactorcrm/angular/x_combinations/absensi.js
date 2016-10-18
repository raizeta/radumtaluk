'use strict';
myAppModule.factory('AbsensiCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,AbsensiSqliteFac,AbsensiFac)
{
    var getAbsensiCombine  = function (auth,tanggalplan)
    {
    	var deferred        = $q.defer();
    	AbsensiSqliteFac.getAbsensiByTglAndUser(auth,tanggalplan)
        .then(function(result) 
        {
        	if(angular.isArray(result) && result.length > 0)
            {
        		deferred.resolve(result[0]);
            }
            else
            {
                AbsensiFac.getAbsensi(auth,tanggalplan)
                .then(function(responseserver)
                {
                    if(responseserver.length > 0)
                    {
                        var newID_SERVER        = responseserver[0].ID;
                        var newTGL              = responseserver[0].TGL;
                        var newUSER_ID          = auth.id;
                        var newUSER_NM          = auth.username;
                        var newWAKTU_MASUK      = responseserver[0].WAKTU_MASUK;
                        var newWAKTU_KELUAR     = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                        var newSTATUS_ABSENSI   = responseserver[0].STATUS;
                        var newISON_SERVER      = 1;

                        var isitable            = [newID_SERVER,newTGL,newUSER_ID,newUSER_NM,newWAKTU_MASUK,newWAKTU_KELUAR,newSTATUS_ABSENSI,newISON_SERVER];
                        AbsensiSqliteFac.setAbsensi(isitable)
                        .then (function (response)
                        {
                        	console.log("Sukses Save Absensi To Local");
                        	deferred.resolve(response);
                        });
                    }
                    else
                	{
                    	deferred.resolve([]);
                	}
                },
                function(error)
                {
                    deferred.reject(error);
                });
            }
        });
        return deferred.promise;
    }
    
    var setAbsensiCombine   = function(auth,tanggalplan,googlemaplat,googlemaplong)
    {
    	var deferred        	= $q.defer();
    	var detail 				= {};
        detail.TGL              = tanggalplan;
        detail.USER_ID          = auth.id;
        detail.USER_NM          = auth.username;
        detail.WAKTU_MASUK      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.LATITUDE_MASUK   = googlemaplat;
        detail.LONG_MASUK       = googlemaplong;
        detail.CREATE_BY        = auth.id;
        detail.CREATE_AT        = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

        AbsensiFac.setAbsensi(detail)
        .then(function(responseserver)
        {
            var newID_SERVER        = responseserver.ID;
            var newTGL              = responseserver.TGL;
            var newUSER_ID          = auth.id;
            var newUSER_NM          = auth.username;
            var newWAKTU_MASUK      = responseserver.WAKTU_MASUK;
            var newWAKTU_KELUAR     = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            var newSTATUS_ABSENSI   = 0;
            var newISON_SERVER      = 1;

            var isitable            = [newID_SERVER,newTGL,newUSER_ID,newUSER_NM,newWAKTU_MASUK,newWAKTU_KELUAR,newSTATUS_ABSENSI,newISON_SERVER];
            AbsensiSqliteFac.setAbsensi(isitable)
            .then (function (response)
            {
              console.log(response);  
            });
            deferred.resolve(responseserver);
        },
        function(error)
        {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    var updateAbsensiCombine    = function(auth,idabsensi,googlemaplat,googlemaplong)
    {
    	var deferred        	 = $q.defer();
    	var detail 				 = {};
        detail.WAKTU_KELUAR      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.LATITUDE_KELUAR   = googlemaplat;
        detail.LONG_KELUAR       = googlemaplong;
        detail.UPDATE_BY         = auth.id;
        detail.UPDATE_AT         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.STATUS            = 1;

        AbsensiFac.updateAbsensi(idabsensi,detail)
        .then (function (responseserver)
        {
            var updateISON_SERVER       = 1;
            var isitable                = [detail.UPDATE_AT, detail.STATUS, updateISON_SERVER,idabsensi];
            AbsensiSqliteFac.updateAbsensi(isitable)
            .then (function (response)
            {
                console.log("Sukses Update Absensi Local");
                deferred.resolve(response);
            });        
        },
        function (error)
        {
            deferred.reject(error);
        });
        return deferred.promise;
    }
            
    return{
            getAbsensiCombine:getAbsensiCombine,
            setAbsensiCombine:setAbsensiCombine,
            updateAbsensiCombine:updateAbsensiCombine
        }
});