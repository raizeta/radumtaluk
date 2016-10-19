'use strict';
myAppModule.factory('ActivitasSqliteFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,UtilService)
{

    var GetActivitas        = function()
    {
        var deferred = $q.defer();
        var querysot2type = 'SELECT * FROM Activitas WHERE UNTUK_DEVICE = ? AND STATUS = ?';
        $cordovaSQLite.execute($rootScope.db, querysot2type, ['ANDROID',1])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                var response = UtilService.SqliteToArray(result);
                deferred.resolve(response);
            }
            else
            {
                deferred.resolve([])
            }
        }); 
        return deferred.promise; 
    }
        
    var SetActivitas              = function(dataactivitas)
    {
        var deferred = $q.defer();

        var newID                 = dataactivitas.ID;
        var newSO_TYPE            = dataactivitas.SO_TYPE;
        var newUNTUK_DEVICE       = dataactivitas.UNTUK_DEVICE;
        var newSTATUS             = dataactivitas.STATUS;
        var newSO_ID              = dataactivitas.SO_ID;
        var newDIALOG_TITLE       = dataactivitas.DIALOG_TITLE;

        var queryinsertagendatoday = 'INSERT INTO Activitas (ID,SO_TYPE,UNTUK_DEVICE,STATUS,SO_ID,DIALOG_TITLE) VALUES (?,?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,queryinsertagendatoday,[newID,newSO_TYPE,newUNTUK_DEVICE,newSTATUS,newSO_ID,newDIALOG_TITLE])
        .then(function(result) 
        {
            console.log("Activitas Berhasil Disimpan Di Local!");
            deferred.resolve(result);
        }, 
        function(error) 
        {
            console.log("Activitas Gagal Disimpan Ke Local: " + error.message);
            deferred.rejected(error);
        });
        return deferred.promise;   
    }
    
    return{
            GetActivitas:GetActivitas,
            SetActivitas:SetActivitas
        }
});