'use strict';
myAppModule.factory('OutOfCaseSqliteFac',
function($rootScope,$http, $q, $filter,$cordovaSQLite,UtilService)
{

    var SetAgendaOutOfCase = function (dataagenda)
    {
        var deferred = $q.defer();
        var newID                       = dataagenda.ID;
        var newTGL                      = dataagenda.TGL;
        var newUSER_ID                  = dataagenda.USER_ID;
        var newCUST_ID                  = dataagenda.CUST_ID;
        var newCUST_NM                  = dataagenda.CUST_NM;
        var newLAG                      = '';  //GPS LAT LOCATION
        var newLAT                      = ''; //GPS LNG LOCATION
        var newMAP_LAT                  = ''; //ACTUAL LAT CUSTOMER DARI MASTER
        var newMAP_LNG                  = ''; //ACTUAL LAG CUSTOMER DARI MASTER
        var newCHECKIN_TIME             = '';
        var newCHECKOUT_TIME            = '';

        var newSTSCHECK_IN              = 0;
        var newSTSCHECK_OUT             = 0;
        var newSTSINVENTORY_EXPIRED     = 0;
        var newSTSINVENTORY_SELLIN      = 0;
        var newSTSINVENTORY_SELLOUT     = 0;
        var newSTSINVENTORY_STOCK       = 0;
        var newSTSINVENTORY_REQUEST     = 0;
        var newSTSINVENTORY_RETURN      = 0;


        var newSTSSTART_PIC             = 0;
        var newSTSEND_PIC               = 0;
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

    return{
            SetAgendaOutOfCase:SetAgendaOutOfCase,
        }
});