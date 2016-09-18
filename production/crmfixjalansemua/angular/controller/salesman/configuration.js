'use strict';
myAppModule.controller("ConfigurationController", ["$rootScope","$scope", "$location","$http","auth","$window","configurationService","$cordovaSQLite","ProductService", 
function ($rootScope,$scope,$location,$http,auth,$window,configurationService,$cordovaSQLite,ProductService) 
{   
    $scope.activeconfig  = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    configurationService.getConfigRadius()
    .then (function (response)
    {
        angular.forEach(response,function(value,key)
        {
            if(value.note == 'CHECKIN')
            {
                $scope.showbuttonproduct = true;
            }
        });
    },
    function (error)
    {
        alert("Configuration Dari Server Error");
    });

    $scope.sinkronproduct = function()
    {
    	$scope.loadingcontent = true;
        var querybarang = "delete from Brgpenjualan";
        $cordovaSQLite.execute($rootScope.db, querybarang, [])
        .then(function(result) 
        {
            alert("Product Berhasil Di Hapus");
            ProductService.GetDataBarangsSqlite()
            .then(function(response)
            {
                angular.forEach(response,function(value,key)
                {
                    alert(value.KD_BARANG);
                })
                $scope.showbuttonproduct = false;
            },
            function(error)
            {
                alert("Product Gagal Di Sinkronisasi");
            })
            .finally(function()
            {
                $scope.loadingcontent = false;
            });
        },
        function(error) 
        {
            alert("Tidak Bisa Menghapus Product");
        });
        
    }          
}]);




