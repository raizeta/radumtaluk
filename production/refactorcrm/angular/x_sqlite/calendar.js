'use strict';
myAppModule.factory('CalendarSqliteFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,UtilService)
{
    var GetCalendarByUser = function (auth)
    {
        var deferred = $q.defer();
        var querycalendar = "SELECT * FROM Scdlheader WHERE USER_ID = ?";
        $cordovaSQLite.execute($rootScope.db, querycalendar, [auth.id])
        .then(function(result) 
        {            
            if (result.rows.length > 0) 
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
            deferred.reject(error);
        });
        return deferred.promise;
    }

    var GetCalendarByUserAndDate = function (auth,tanggalplan)
    {
        var deferred = $q.defer();
        var querycalendar = "SELECT * FROM Scdlheader WHERE USER_ID = ? AND TGL1=?";
        $cordovaSQLite.execute($rootScope.db, querycalendar, [auth.id,tanggalplan])
        .then(function(result) 
        {            
            if (result.rows.length > 0) 
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
            deferred.reject(error);
        });
        return deferred.promise;
    }

    var SetCalendar = function (datacalendar)
    {
        var deferred            = $q.defer();
        var newID               = datacalendar.ID;
        var newTGL1             = datacalendar.TGL1;
        var newTGL2             = datacalendar.TGL2;
        var newSCDL_GROUP       = datacalendar.SCDL_GROUP;
        var newUSER_ID          = datacalendar.USER_ID;
        var newNOTE             = datacalendar.NOTE;
        var newSTATUS           = datacalendar.STATUS;

        var queryinsertscdlheader = 'INSERT INTO Scdlheader (ID,TGL1,TGL2,SCDL_GROUP,USER_ID,NOTE,STATUS) VALUES (?,?,?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,queryinsertscdlheader,[newID,newTGL1,newTGL2,newSCDL_GROUP,newUSER_ID,newNOTE,newSTATUS])
        .then(function(result) 
        {
            console.log("SCDL Header Berhasil Disimpan Di Local!");
            deferred.resolve(result);
        });

        return deferred.promise;
    }
    return{
            GetCalendarByUser:GetCalendarByUser,
            GetCalendarByUserAndDate:GetCalendarByUserAndDate,
            SetCalendar:SetCalendar
        }
});