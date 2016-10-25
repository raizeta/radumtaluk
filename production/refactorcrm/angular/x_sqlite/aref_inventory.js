'use strict';
myAppModule.factory('InventorySqliteFac',function($rootScope,$http,$q,$filter,$cordovaSQLite,UtilService)
{

    var SetInventory = function (datainventory,DIALOG_TITLE)
    {
        var deferred = $q.defer();
        var ID                      = datainventory.ID;
        var TGL                     = datainventory.TGL;
        var CUST_KD                 = datainventory.CUST_KD;
        var CUST_NM                 = datainventory.CUST_NM;
        var KD_BARANG               = datainventory.KD_BARANG; 
        var NM_BARANG               = datainventory.NM_BARANG;
        var SO_QTY                  = datainventory.SO_QTY;
        var SO_TYPE                 = datainventory.SO_TYPE; 
        var POS                     = datainventory.POS; 
        var USER_ID                 = datainventory.USER_ID;
        var STATUS                  = datainventory.STATUS;
        var WAKTU_INPUT_INVENTORY   = datainventory.WAKTU_INPUT_INVENTORY;
        var ID_GROUP                = datainventory.ID_GROUP;
        var DIALOG_TITLE            = DIALOG_TITLE;
        var ISON_SERVER             = 1;

        var isitable                = [ID,TGL,CUST_KD,CUST_NM,KD_BARANG,NM_BARANG,SO_QTY,SO_TYPE,POS,USER_ID,STATUS,WAKTU_INPUT_INVENTORY,ID_GROUP,DIALOG_TITLE,ISON_SERVER];
        var queryinsertinventory    = 'INSERT INTO Inventory (ID,TGL,CUST_KD,CUST_NM,KD_BARANG,NM_BARANG,SO_QTY,SO_TYPE,POS,USER_ID,STATUS,WAKTU_INPUT_INVENTORY,ID_GROUP,DIALOG_TITLE,ISON_SERVER) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,queryinsertinventory,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
            console.log("Inventory Berhasil Di Simpan Ke Local");
        }, 
        function(error) 
        {
            alert("Inventory Gagal Disimpan Ke Local: " + error.message);
            deferred.reject(error);
        });
        return deferred.promise;  
    }

    return{
            SetInventory:SetInventory
        }
});