'use strict';
myAppModule.controller("ConfigurationController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","configurationService","$cordovaSQLite","ProductService","WhosyncService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,configurationService,$cordovaSQLite,ProductService,WhosyncService) 
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
            if(value.note == 'SYNCPRODUCT')
            {
                $scope.showbuttonproduct = true;
            }
            if(value.note == 'SYNCSCDLHEADER')
            {
                $scope.showbuttonscdlheader = true;
            }
            if(value.note == 'SYNCAGENDA')
            {
                $scope.showbuttonagenda = true;
            }
            if(value.note == 'SYNCABSENSI')
            {
                $scope.showbuttonabsensi = true;
            }
            if(value.note == 'SYNCSOT2')
            {
                $scope.showbuttonsot2 = true;
            }
            if(value.note == 'SYNCSOTYPE')
            {
                $scope.showbuttonsotype = true;
            }
            if(value.note == 'SYNCALL')
            {
                $scope.showbuttonall = true;
            }
        });
    },
    function (error)
    {
        alert("Configuration Dari Server Error");
    });
    
    $scope.whosync = function(typesync)
    {
        var detail = {};
        detail.USER_ID      = auth.id;
        detail.TANGGAL_SYNC = $filter('date')(new Date(),'yyyy-MM-dd');
        detail.TYPE_SYNC    = typesync;
        detail.WAKTU_SYNC   = $filter('date')(new Date(),'yyyy-MM-dd HH:ss');
        detail.CREATE_AT    = $filter('date')(new Date(),'yyyy-MM-dd HH:ss');
        detail.CREATE_BY    = auth.id;
        WhosyncService.setWhoSync(detail)
        .then(function (response)
        {
            console.log(response);
        });
    }
    $scope.sinkronproduct = function()
    {
    	$scope.loadingcontent = true;
        var querybarang = "delete from Brgpenjualan";
        document.addEventListener("deviceready", function () 
        {
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
            })
            .finally(function()
            {
                $scope.loadingcontent = false;  
            });
        },false);

        var TYPE_SYNC = 'PRODUCT';
        $scope.whosync(TYPE_SYNC);  
    }
    $scope.sinkronscdlkalender = function()
    {
        $scope.loadingcontent = true;
        document.addEventListener("deviceready", function () 
        {
            var querybarang = "delete from Scdlheader";
            $cordovaSQLite.execute($rootScope.db, querybarang, [])
            .then(function(result) 
            {
                alert("Schedule Anda Telah Berhasil Disinkronkan Dengan Server");
            },
            function(error) 
            {
                alert("Schedule Anda Gagal Disinkronkan Dengan Server");
            })
            .finally(function()
            {
                $scope.loadingcontent = false;  
            });
        },false);

        var TYPE_SYNC = 'SCDLKALENDER';
        $scope.whosync(TYPE_SYNC);  
    }
    $scope.sinkronagenda = function()
    {
        $scope.loadingcontent = true;
        document.addEventListener("deviceready", function () 
        {
            var querybarang = "delete from Agenda";
            $cordovaSQLite.execute($rootScope.db, querybarang, [])
            .then(function(result) 
            {
                alert("Agenda Anda Telah Berhasil Disinkronkan Dengan Server");
            },
            function(error) 
            {
                alert("Agenda Anda Gagal Disinkronkan Dengan Server");
            })
            .finally(function()
            {
                $scope.loadingcontent = false;  
            });
        },false);

        var TYPE_SYNC = 'AGENDA';
        $scope.whosync(TYPE_SYNC);  
    }
    $scope.sinkronabsensi = function()
    {
        $scope.loadingcontent = true;
        document.addEventListener("deviceready", function () 
        {
            var querybarang = "delete from Absensi";
            $cordovaSQLite.execute($rootScope.db, querybarang, [])
            .then(function(result) 
            {
                alert("Absensi Anda Telah Berhasil Disinkronkan Dengan Server");
            },
            function(error) 
            {
                alert("Absensi Anda Gagal Disinkronkan Dengan Server");
            })
            .finally(function()
            {
                $scope.loadingcontent = false;  
            });
        },false);

        var TYPE_SYNC = 'ABSENSI';
        $scope.whosync(TYPE_SYNC);  
    }
    $scope.Sot2 = function()
    {
        $scope.loadingcontent = true;
        var querybarang = "delete from Sot2";
        document.addEventListener("deviceready", function () 
        {
            $cordovaSQLite.execute($rootScope.db, querybarang, [])
            .then(function(result) 
            {
                alert("Sot2 Anda Telah Berhasil Disinkronkan Dengan Server");
            },
            function(error) 
            {
                alert("Sot2 Anda Gagal Disinkronkan Dengan Server");
            })
            .finally(function()
            {
                $scope.loadingcontent = false;  
            });
        },false);

        var TYPE_SYNC = 'SOT2';
        $scope.whosync(TYPE_SYNC);  
    }
    $scope.Sot2Type = function()
    {
        $scope.loadingcontent = true;
        document.addEventListener("deviceready", function () 
        {
            var querybarang = "delete from Sot2Type";
            $cordovaSQLite.execute($rootScope.db, querybarang, [])
            .then(function(result) 
            {
                alert("Sot2Type Anda Telah Berhasil Disinkronkan Dengan Server");
            },
            function(error) 
            {
                alert("Sot2Type Anda Gagal Disinkronkan Dengan Server");
            })
            .finally(function()
            {
                $scope.loadingcontent = false;  
            });
        },false);
        var TYPE_SYNC = 'SOT2TYPE';
        $scope.whosync(TYPE_SYNC);  
    }
    $scope.sinkronall = function()
    {
         $scope.sinkronproduct();
         $scope.sinkronscdlkalender();
         $scope.sinkronagenda();
         $scope.sinkronabsensi();
    }          
}]);




