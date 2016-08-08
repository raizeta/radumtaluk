'use strict';
myAppModule.controller("AbsensiController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","LocationService","$cordovaSQLite","AbsensiService", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,$filter,$timeout,LocationService,$cordovaSQLite,AbsensiService) 
{   

    $scope.activeabsensi = "active";
    $scope.userInfo = auth;

    var tanggalplan = $filter('date')(new Date(),'yyyy-MM-dd');

	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    LocationService.GetGpsLocation()
    .then (function (responsegps)
    {
        $scope.googlemaplat     = responsegps.latitude;    //get from gps
        $scope.googlemaplong    = responsegps.longitude;  
    },
    function (error)
    {
        alert("GPS Tidak Hidup");
    });
    
    document.addEventListener("deviceready", function () 
    {
        var queryabsensi = 'SELECT * FROM Absensi WHERE TGL = ? AND USER_ID = ?';
        $cordovaSQLite.execute($rootScope.db, queryabsensi, [tanggalplan, auth.id])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                var idserverabsensi         = result.rows.item(0).ID_SERVER;
                var statusabsensi           = result.rows.item(0).STATUS_ABSENSI;
                if(statusabsensi == 0)
                {
                    $scope.showbuttonabsensikeluar  = true;
                    $scope.idabsensi                = idserverabsensi;
                }
                else
                {
                    $scope.showbuttonnotifiabsen = true;   
                }
            }
            else
            {
                AbsensiService.getAbsensi(auth,tanggalplan)
                .then(function(responseabsensi)
                {
                    $scope.responseabsen = responseabsensi;
                    if($scope.responseabsen.length == 0)
                    {
                        $scope.showbuttonabsensimasuk = true;
                    }
                    else
                    {
                        if($scope.responseabsen.STATUS == 0)
                        {
                            $scope.showbuttonabsensikeluar = true;
                            $scope.idabsensi = responseabsensi.ID;
                        }
                        else if($scope.responseabsen.STATUS == 1)
                        {
                            $scope.showbuttonnotifiabsen = true;
                        }

                        var newID_SERVER        = responseabsensi.ID;
                        var newTGL              = responseabsensi.TGL;
                        var newUSER_ID          = auth.id;
                        var newUSER_NM          = auth.username;
                        var newWAKTU_MASUK      = responseabsensi.WAKTU_MASUK;
                        var newWAKTU_KELUAR     = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                        var newSTATUS_ABSENSI   = $scope.responseabsen.STATUS;
                        var newISON_SERVER      = 1;

                        var queryinsertabsensi = 'INSERT INTO Absensi (ID_SERVER,TGL,USER_ID,USER_NM,WAKTU_MASUK,WAKTU_KELUAR,STATUS_ABSENSI,ISON_SERVER) VALUES (?,?,?,?,?,?,?,?)';
                        $cordovaSQLite.execute($rootScope.db,queryinsertabsensi,[newID_SERVER,newTGL,newUSER_ID,newUSER_NM,newWAKTU_MASUK,newWAKTU_KELUAR,newSTATUS_ABSENSI,newISON_SERVER])
                        .then(function(result) 
                        {
                            console.log("Absensi Berhasil Disimpan Di Local!");
                        }, 
                        function(error) 
                        {
                            console.log("Absensi Gagal Disimpan Di Local: " + error.message);
                        });  
                    }  
                },
                function (error)
                {
                    alert("Data Absensi Dari Server Error");
                });
            }
        },

        function(error) 
        {
            alert("Gagal Mendapatkan Data Absensi Dari Local: " + error.message);
        });
    });

    $scope.absensimasuk = function () 
    {     
        $scope.showbuttonabsensimasuk   = false;
        $scope.loadingcontent = true;

        var detail = {};
        detail.TGL              = tanggalplan;
        detail.USER_ID          = auth.id;
        detail.USER_NM          = auth.username;
        detail.WAKTU_MASUK      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.LATITUDE_MASUK   = $scope.googlemaplat;
        detail.LONG_MASUK       = $scope.googlemaplong;
        detail.CREATE_BY        = auth.id;
        detail.CREATE_AT        = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

        AbsensiService.setAbsensi(detail)
        .then (function (response)
        {
            $scope.loadingcontent = true;
            $timeout(function()
            {
                $scope.showbuttonabsensikeluar = true;
                $scope.idabsensi = response.ID;

                var newID_SERVER        = response.ID;
                var newTGL              = response.TGL;
                var newUSER_ID          = auth.id;
                var newUSER_NM          = auth.username;
                var newWAKTU_MASUK      = response.WAKTU_MASUK;
                var newWAKTU_KELUAR     = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                var newSTATUS_ABSENSI   = 0;
                var newISON_SERVER      = 1;

                var queryinsertabsensi = 'INSERT INTO Absensi (ID_SERVER,TGL,USER_ID,USER_NM,WAKTU_MASUK,WAKTU_KELUAR,STATUS_ABSENSI,ISON_SERVER) VALUES (?,?,?,?,?,?,?,?)';
                $cordovaSQLite.execute($rootScope.db,queryinsertabsensi,[newID_SERVER,newTGL,newUSER_ID,newUSER_NM,newWAKTU_MASUK,newWAKTU_KELUAR,newSTATUS_ABSENSI,newISON_SERVER])
                .then(function(result) 
                {
                    var lanjutkeagenda = confirm("Absensi Sukses Disimpan Di Local.Lanjut Ke Agenda?");
                    if (lanjutkeagenda == true) 
                    {
                        $location.path("/agenda/" + tanggalplan);
                    }
                    else
                    {
                        $scope.loadingcontent = false;
                    }
                });
            },5000);
        }, 
        function (error)
        {
            $scope.showbuttonabsensimasuk   = true;
            $scope.loadingcontent = false;
            alert("Gagal Absensi Masuk.Try Again");    
        });
    }

    $scope.absensikeluar = function () 
    { 
        $scope.showbuttonabsensikeluar = false;
        $scope.loadingcontent = true;

        var yakinabsenkeluar = confirm("Yakin Untuk Absen Keluar?");
        if (yakinabsenkeluar == true) 
        {
            var detail = {};
            detail.WAKTU_KELUAR      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            detail.LATITUDE_KELUAR   = $scope.googlemaplat;
            detail.LONG_KELUAR       = $scope.googlemaplong;
            detail.UPDATE_BY         = auth.id;
            detail.UPDATE_AT         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            detail.STATUS            = 1;
            AbsensiService.updateAbsensi($scope.idabsensi,detail)
            .then (function (response)
            {
                alert("Terimakasih. Absensi Keluar Berhasi Di Update Di Server"); 
                $scope.showbuttonnotifiabsen = true;
                $scope.loadingcontent = false;

                var updateISON_SERVER      = 1;
                var queryupdateabsensi = 'UPDATE Absensi SET WAKTU_KELUAR = ?, STATUS_ABSENSI = ?, ISON_SERVER = ? WHERE ID_SERVER = ?';
                $cordovaSQLite.execute($rootScope.db, queryupdateabsensi, [detail.UPDATE_AT, detail.STATUS, updateISON_SERVER, $scope.idabsensi])
                .then(function(result) 
                {
                    console.log("Terimakasih. Absensi Keluar Berhasi Di Update Di Local");
                },
                function(error) 
                {
                    alert("Update Absen Keluar Gagal Disimpan Di Local: " + error.message);
                });
                       
            },
            function (error)
            {
                $scope.showbuttonabsensikeluar = true;
                $scope.loadingcontent = false;
                alert("Absensi Keluar Gagal Disimpan Ke Server.Try Again"); 
            });
 
        }
        else
        {
            $scope.showbuttonabsensikeluar = true;
            $scope.loadingcontent = false;
        } 
    } 

}]);
