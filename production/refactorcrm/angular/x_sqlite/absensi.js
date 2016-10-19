'use strict';
myAppModule.factory('AbsensiSqliteFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,UtilService)
{
    var getAbsensiByTglAndUser  = function (auth,tanggalplan)
    {
        var userid          = auth.id;
        var deferred        = $q.defer();
        var queryabsensi    = 'SELECT * FROM Absensi WHERE TGL = ? AND USER_ID = ?';
        $cordovaSQLite.execute($rootScope.db, queryabsensi, [tanggalplan, userid])
        .then(function(result) 
        {
        	if(result.rows.length > 0)
    		{
        		var response = UtilService.SqliteToArray(result);
            	deferred.resolve(response);
    		}
        	else
    		{
        		deferred.resolve([]);
    		}
        },
        function (error)
        {
            deferred.rejected(error); 
        });
        return deferred.promise;
    }
    var getAbsensis         = function ()
    {
        var deferred        = $q.defer();
        var queryabsensi    = 'SELECT * FROM Absensi';
        $cordovaSQLite.execute($rootScope.db, queryabsensi,[])
        .then(function(result) 
        {
            deferred.resolve(result);
        },
        function (error)
        {
            deferred.rejected(error); 
        });
        return deferred.promise;
    }
    
    var setAbsensi              = function (isitable)
    {
        var deferred             = $q.defer();
        var queryinsertabsensi   = 'INSERT INTO Absensi (ID,TGL,USER_ID,USER_NM,WAKTU_MASUK,LATITUDE_MASUK,LONG_MASUK,WAKTU_KELUAR,LATITUDE_KELUAR,LONG_KELUAR,STATUS,ISON_SERVER) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,queryinsertabsensi,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
        },
        function (error)
        {
            deferred.rejected(error);
        });
        return deferred.promise; 
    }

    var updateAbsensi = function (isitable)
    {
        var deferred            = $q.defer();
        var queryupdateabsensi  = 'UPDATE Absensi SET WAKTU_KELUAR = ?, LATITUDE_KELUAR = ?, LONG_KELUAR = ?, STATUS = ?, ISON_SERVER = ? WHERE ID = ?';
        $cordovaSQLite.execute($rootScope.db,queryupdateabsensi,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
        },
        function(error) 
        {
            deferred.rejected(error);
        });
        return deferred.promise; 
    }

    var getAbsensiStatus = function (tanggalplan,userid)
    {
        var deferred        = $q.defer();
        var queryabsensi    = 'SELECT * FROM Absensi WHERE TGL = ? AND USER_ID = ?';
        $cordovaSQLite.execute($rootScope.db, queryabsensi, [tanggalplan, userid])
        .then(function(result) 
        {
            var resultabsensi = {};
            if (result.rows.length > 0) 
            {
                var statusabsensi           = result.rows.item(0).STATUS_ABSENSI;
                if(statusabsensi == 0)
                {
                    resultabsensi.statusabsensi = 0;
                }
                else
                {
                    resultabsensi.statusabsensi = 1;
                }
            }
            else
            {
                resultabsensi.statusabsensi = 3;
            }
            deferred.resolve(resultabsensi);
        });
        return deferred.promise;
    }

    return{
            getAbsensiByTglAndUser:getAbsensiByTglAndUser,
            getAbsensis:getAbsensis,
            setAbsensi:setAbsensi,
            updateAbsensi:updateAbsensi,
            getAbsensiStatus:getAbsensiStatus
        }
});