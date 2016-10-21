'use strict';
myAppModule.factory('PhtoSqliteFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,UtilService)
{
    
    var SetPhotoStart = function(ID_DETAIL)
    {
        var deferred = $q.defer();
        var STSSTART_PIC             = 1;  //GPS LAT LOCATION
        var ID                       = ID_DETAIL;

        var isitable        = [STSSTART_PIC,ID];
        var queryphoto      = 'UPDATE Agenda SET STSSTART_PIC = ? WHERE ID = ?';
        $cordovaSQLite.execute($rootScope.db,queryphoto,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
            console.log(result);
        },
        function(error) 
        {
            deferred.reject(error);
            console.log(error);
        });
        return deferred.promise; 

    }
    var SetPhotoEnd = function(ID_DETAIL)
    {
        var deferred = $q.defer();
        var STSEND_PIC               = 1;  
        var ID                       = ID_DETAIL;

        var isitable        = [STSEND_PIC,ID];
        var queryphoto      = 'UPDATE Agenda SET STSEND_PIC = ? WHERE ID = ?';
        $cordovaSQLite.execute($rootScope.db,queryphoto,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
            console.log(result);
        },
        function(error) 
        {
            deferred.reject(error);
            console.log(error);
        });
        return deferred.promise; 

    }

    return{
            SetPhotoStart:SetPhotoStart,
            SetPhotoEnd:SetPhotoEnd
        }
});