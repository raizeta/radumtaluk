'use strict';
myAppModule.factory('ProductSqliteFac', 
function($rootScope,$http, $q, $window, $cordovaSQLite,UtilService)
{

	var GetProductsSqlite = function()
    {
		var deferred 		= $q.defer();
        var querybarang = "SELECT * FROM Brgpenjualan";
        $cordovaSQLite.execute($rootScope.db, querybarang, [])
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
		});

        return deferred.promise;  
    }

	var InsertProdutsSqlite = function(dataproduct)
    {
        var deferred        = $q.defer();

        var newID 	        = dataproduct.ID;
        var newKD_BARANG 	= dataproduct.KD_BARANG;
        var newNM_BARANG 	= dataproduct.NM_BARANG;
        var newIMAGE        = dataproduct.IMAGE;
        var newSTATUS       = dataproduct.STATUS;

        var queryinsertbarang = 'INSERT INTO Brgpenjualan (ID,KD_BARANG,NM_BARANG,IMAGE,STATUS) VALUES (?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,queryinsertbarang,[newID,newKD_BARANG,newNM_BARANG,newIMAGE,newSTATUS])
        .then(function(result) 
        {
            console.log("Barang Berhasil Disimpan Di Local!");
            deferred.resolve(result);
        }, 
        function(error) 
        {
            alert("Barang Gagal Disimpan Di Local: " + error.message);
        });
        return deferred.promise; 
    }
    var UpdateProdutsSqlite = function(isitable)
    {
        var deferred            = $q.defer();
        var queryupdateabsensi  = 'UPDATE Brgpenjualan SET STATUS = ? WHERE ID = ?';
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
				        

	return{
			GetProductsSqlite:GetProductsSqlite,
			InsertProdutsSqlite:InsertProdutsSqlite,
            UpdateProdutsSqlite:UpdateProdutsSqlite
		}
});