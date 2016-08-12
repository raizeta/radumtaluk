'use strict';
myAppModule.factory('SOT2Services', ["$rootScope","$http","$q","$filter","$window","$cordovaSQLite",
function($rootScope,$http, $q, $filter, $window,$cordovaSQLite)
{
    var getUrl = function()
    {
        return "http://api.lukisongroup.com/master";
    }
    var gettoken = function()
    {
        return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
    }
    
    var getSOT2Quantity = function (CUST_KD,tanggalplan,sotype)
    {
        var deferred = $q.defer();
        var queryabsensi = 'SELECT * FROM Sot2 WHERE CUST_KD = ? AND TGL = ? AND SO_TYPE = ?';
        $cordovaSQLite.execute($rootScope.db, queryabsensi, [CUST_KD,tanggalplan,sotype])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                var datasot2 = [];
                var l = result.rows.length;
                for (var i=0; i < l; i++) 
                {
                    var KD_BARANG = result.rows.item(i).KD_BARANG;
                    datasot2.push(KD_BARANG);
                }
                var resultdatasot2 = $rootScope.unique(datasot2);
                deferred.resolve(resultdatasot2);
            }
            else
            {
                deferred.resolve([]);
            }
        },

        function(error) 
        {
            deferred.resolve(error.message);
        });
        return deferred.promise;  
    }

    var getSOT2Type = function (SO_ID)
    {
        var url = getUrl();
        var deferred = $q.defer();
        
        var querysot2type = 'SELECT * FROM Sot2Type WHERE UNTUK_DEVICE = ? AND STATUS = ?';
        $cordovaSQLite.execute($rootScope.db, querysot2type, ['ANDROID',1])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                var resulttypeaktifitas = [];
                var l = result.rows.length;
                for (var i=0; i < l; i++) 
                {
                    var detailresult = {};
                    detailresult.ID_SERVER          = result.rows.item(i).ID_SERVER;
                    detailresult.SO_TYPE            = result.rows.item(i).SO_TYPE;
                    detailresult.UNTUK_DEVICE       = result.rows.item(i).UNTUK_DEVICE;
                    detailresult.STATUS             = result.rows.item(i).STATUS;
                    detailresult.SO_ID              = result.rows.item(i).SO_ID;
                    detailresult.DIALOG_TITLE       = result.rows.item(i).DIALOG_TITLE;

                    resulttypeaktifitas.push(detailresult);
                }

                deferred.resolve(resulttypeaktifitas);
            }
            else
            {
                $http.get(url + "/tipesalesaktivitas/search?UNTUK_DEVICE=ANDROID&STATUS=1")
                .success(function(response,status, headers, config) 
                {
                    if(angular.isDefined(response.statusCode))
                    {
                        deferred.resolve([]);
                    }
                    else
                    {
                        angular.forEach(response.Tipesalesaktivitas, function(value, key)
                        {
                            var newID_SERVER          = value.ID;
                            var newSO_TYPE            = value.SO_TYPE;
                            var newUNTUK_DEVICE       = value.UNTUK_DEVICE;
                            var newSTATUS             = value.STATUS;
                            var newSO_ID              = value.SO_ID;
                            var newDIALOG_TITLE       = value.DIALOG_TITLE;

                            var queryinsertagendatoday = 'INSERT INTO Sot2Type (ID_SERVER,SO_TYPE,UNTUK_DEVICE,STATUS,SO_ID,DIALOG_TITLE) VALUES (?,?,?,?,?,?)';
                            $cordovaSQLite.execute($rootScope.db,queryinsertagendatoday,[newID_SERVER,newSO_TYPE,newUNTUK_DEVICE,newSTATUS,newSO_ID,newDIALOG_TITLE])
                            .then(function(result) 
                            {
                                console.log("Sot2Type Berhasil Disimpan Di Local!");
                            }, 
                            function(error) 
                            {
                                console.log("Sot2Type Gagal Disimpan Ke Local: " + error.message);
                            });
                        });

                        deferred.resolve(response.Tipesalesaktivitas);   
                    }  
                },
                function (error)
                {
                    deferred.rejected(error);
                });
            }
        },
        function(error) 
        {
            deferred.resolve(error.message);
        });

        return deferred.promise;  
    }

    var getSOT2Summary = function (tanggalplan,userid,resolveobjectbarangsqlite,resolvesot2type)
    {
        var deferred = $q.defer();
        var querysummary = 'SELECT * FROM Sot2 WHERE TGL = ? AND USER_ID = ?';
        $cordovaSQLite.execute($rootScope.db, querysummary, [tanggalplan,userid])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                var summarypercustomer = [];
                var l = result.rows.length;
                for (var i=0; i < l; i++) 
                {
                    var summary = {};
                    summary.KD_BARANG           = result.rows.item(i).KD_BARANG;
                    summary.NM_BARANG           = result.rows.item(i).NM_BARANG;
                    summary.CUST_KD             = result.rows.item(i).CUST_KD;
                    summary.CUST_NM             = result.rows.item(i).CUST_NM;
                    summary.SO_TYPE             = result.rows.item(i).SO_TYPE;
                    summary.SO_QTY              = result.rows.item(i).SO_QTY;
                    summary.DIALOG_TITLE        = result.rows.item(i).DIALOG_TITLE;
                    summarypercustomer.push(summary);
                }
                var productdas      = resolveobjectbarangsqlite;

                var typepenjualan   = resolvesot2type;

                var x = [];
                for(i=0;i < productdas.length ; i ++)
                {
                    for(j=0;j < typepenjualan.length ; j ++)
                    {
                        var detail = {};
                        detail.KD_BARANG            = productdas[i].KD_BARANG;
                        detail.NM_BARANG            = productdas[i].NM_BARANG;
                        detail.KD_TYPE              = typex[j].SO_TYPE;
                        detail.SO_ID                = typex[j].SO_ID;
                        detail.DIALOG_TITLE         = typex[j].DIALOG_TITLE;
                        detail.QTY                  = 0;
                        x.push(detail);
                    }

                }

                console.log(x);
                deferred.resolve(summarypercustomer);
            }
            else
            {
                var productdas      = resolveobjectbarangsqlite;
                var typepenjualan   = resolvesot2type;

                var x = [];
                for(var i=0; i < productdas.length ; i ++)
                {
                    for(var j=0; j < typepenjualan.length ; j ++)
                    {
                        var detail = {};
                        detail.KD_BARANG            = productdas[i].KD_BARANG;
                        detail.NM_BARANG            = productdas[i].NM_BARANG;
                        detail.KD_TYPE              = typepenjualan[j].SO_TYPE;
                        detail.SO_ID                = typepenjualan[j].SO_ID;
                        detail.DIALOG_TITLE         = typepenjualan[j].DIALOG_TITLE;
                        detail.QTY                  = 0;
                        x.push(detail);
                    }

                }

                console.log(x);
                deferred.resolve([]);
            }
        },

        function(error) 
        {
            deferred.resolve(error.message);
        });
        return deferred.promise;  
    }
    
    return{
            getSOT2Quantity:getSOT2Quantity,
            getSOT2Type:getSOT2Type,
            getSOT2Summary:getSOT2Summary
        }
}]);