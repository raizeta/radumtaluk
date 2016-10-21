'use strict';
myAppModule.factory('AgendaSqliteFac',
function($rootScope,$http, $q, $filter,$cordovaSQLite,UtilService)
{
    
    var GetAgendaByUserAndDate = function (auth,tanggalplan)
    {
        var deferred = $q.defer();
        var queryagendatoday = "SELECT * FROM Agenda WHERE USER_ID = ? AND TGL = ?";
        $cordovaSQLite.execute($rootScope.db, queryagendatoday, [auth.id,tanggalplan])
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
        function(error)
        {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    
    var SetAgenda = function (dataagenda)
    {
        var deferred = $q.defer();
        var newID                       = dataagenda.ID;
        var newTGL                      = dataagenda.TGL;
        var newUSER_ID                  = dataagenda.USER_ID;
        var newCUST_ID                  = dataagenda.CUST_ID;
        var newCUST_NM                  = dataagenda.CUST_NM;
        var newLAG                      = dataagenda.LAG;  //GPS LAT LOCATION
        var newLAT                      = dataagenda.LAT; //GPS LNG LOCATION
        var newMAP_LAT                  = dataagenda.MAP_LAT; //ACTUAL LAT CUSTOMER DARI MASTER
        var newMAP_LNG                  = dataagenda.MAP_LNG; //ACTUAL LAG CUSTOMER DARI MASTER
        var newCHECKIN_TIME             = dataagenda.CHECKIN_TIME;
        var newCHECKOUT_TIME            = dataagenda.CHECKOUT_TIME;

        if(dataagenda.CHECKIN_TIME)
        {
            
            if(dataagenda.CHECKOUT_TIME)
            {
               var newSTSCHECK_OUT          = 1;
               var newSTSCHECK_IN           = 1; 
            }
            else
            {
                var newSTSCHECK_OUT         = 0;
                var newSTSCHECK_IN          = 1;
            }
        }
        else
        {
            if(dataagenda.CHECKOUT_TIME)
            {
                var newSTSCHECK_OUT          = 1;
                var newSTSCHECK_IN           = 1;
                var newCHECKIN_TIME          = dataagenda.CHECKOUT_TIME;
            }
            else
            {
                var newSTSCHECK_OUT          = 0;
                var newSTSCHECK_IN           = 0;
            }
        }

        var newSTSINVENTORY_EXPIRED     = dataagenda.STSINVENTORY_EXPIRED;
        var newSTSINVENTORY_SELLIN      = dataagenda.STSINVENTORY_SELLIN;
        var newSTSINVENTORY_SELLOUT     = dataagenda.STSINVENTORY_SELLOUT;
        var newSTSINVENTORY_STOCK       = dataagenda.STSINVENTORY_STOCK;
        var newSTSINVENTORY_REQUEST     = dataagenda.STSINVENTORY_REQUEST;
        var newSTSINVENTORY_RETURN      = dataagenda.STSINVENTORY_RETURN;


        var newSTSSTART_PIC             = dataagenda.STSSTART_PIC;
        var newSTSEND_PIC               = dataagenda.STSEND_PIC;
        var newSCDL_GROUP               = dataagenda.SCDL_GROUP;
        var newSTSISON_SERVER           = 1;

        var isitable = [newID,newTGL,newUSER_ID,newCUST_ID,newCUST_NM,newLAG,newLAT,newMAP_LAT,newMAP_LNG,newCHECKIN_TIME,newCHECKOUT_TIME,newSTSCHECK_IN,newSTSCHECK_OUT,newSTSINVENTORY_EXPIRED,newSTSINVENTORY_SELLIN,newSTSINVENTORY_SELLOUT,newSTSINVENTORY_STOCK,newSTSINVENTORY_REQUEST,newSTSINVENTORY_RETURN,newSTSSTART_PIC,newSTSEND_PIC,newSCDL_GROUP,newSTSISON_SERVER];
        var queryinsertagendatoday = 'INSERT INTO Agenda (ID,TGL,USER_ID,CUST_ID,CUST_NM,LAG,LAT,MAP_LAT,MAP_LNG,CHECKIN_TIME,CHECKOUT_TIME,STSCHECK_IN,STSCHECK_OUT,STSINVENTORY_EXPIRED,STSINVENTORY_SELLIN,STSINVENTORY_SELLOUT,STSINVENTORY_STOCK,STSINVENTORY_REQUEST,STSINVENTORY_RETURN,STSSTART_PIC,STSEND_PIC,SCDL_GROUP,STSISON_SERVER) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,queryinsertagendatoday,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
            console.log("Agenda Berhasil Di Simpan Ke Local");
        }, 
        function(error) 
        {
            alert("Customer Untuk Agenda Today Gagal Disimpan Ke Local: " + error.message);
            deferred.reject(error);
        });
        return deferred.promise; 
    }

    var GetCheckInStatus = function (auth,tanggalplan)
    {
        var deferred = $q.defer();
        var queryagendatoday = "SELECT * FROM Agenda WHERE USER_ID = ? AND TGL = ? AND STSCHECK_IN = ? AND STSCHECK_OUT= ?";
        $cordovaSQLite.execute($rootScope.db, queryagendatoday, [auth.id,tanggalplan,1,0])
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
        function(error)
        {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    return{
            GetAgendaByUserAndDate:GetAgendaByUserAndDate,
            SetAgenda:SetAgenda,
            GetCheckInStatus:GetCheckInStatus
        }
});