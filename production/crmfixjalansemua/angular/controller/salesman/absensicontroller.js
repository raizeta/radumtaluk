'use strict';
myAppModule.controller("AbsensiController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","AbsensiService","LocationService","absen", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,$filter,$timeout,AbsensiService,LocationService,absen) 
{   

    $scope.activeabsensi = "active";
    $scope.userInfo = auth;

    var tanggalplan = $rootScope.tanggalharini;

	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    if(absen)
    {
        if(absen.AbsenMasuk == 1)
        {
           if(absen.AbsenKeluar == 0)
           {
                $scope.showbuttonabsensikeluar = true;
           }
           else
           {
               $scope.showbuttonnotifiabsen = true; 
           }
        }
        else
        {
            $scope.showbuttonabsensimasuk = true;
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
                }
                else if($scope.responseabsen.STATUS == 1)
                {
                    $scope.showbuttonnotifiabsen = true;
                }  
            }
        },
        function (error)
        {
            alert("Data Absensi Error");
        }); 
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
                var lanjutkeagenda = confirm("Absensi Sukses.Lanjut Ke Agenda?");
                if (lanjutkeagenda == true) 
                {
                    $location.path("/agenda/" + tanggalplan);
                }
                else
                {
                    $scope.loadingcontent = false;
                } 
            },10000);
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
            if($window.localStorage.getItem('LocalStorageAbsensi'))
            {
                var LocalStorageAbsensi     = JSON.parse($window.localStorage.getItem('LocalStorageAbsensi'));
                var AbsenID         = LocalStorageAbsensi.AbsenID;

                var detail = {};
                detail.WAKTU_KELUAR      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                detail.LATITUDE_KELUAR   = $scope.googlemaplat;
                detail.LONG_KELUAR       = $scope.googlemaplong;
                detail.UPDATE_BY         = auth.id;
                detail.UPDATE_AT         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                detail.STATUS            = 1;
                AbsensiService.updateAbsensi(AbsenID,detail)
                .then (function (response)
                {
                    $scope.showbuttonnotifiabsen = true;
                    $scope.loadingcontent = false;
                    alert("Terimakasih. Absensi Keluar Sukses");       
                },
                function (error)
                {
                    $scope.showbuttonabsensikeluar = true;
                    $scope.loadingcontent = false;
                    alert("Gagal Absensi Keluar.Try Again"); 
                });
            }  
        }
        else
        {
            $scope.showbuttonabsensikeluar = true;
            $scope.loadingcontent = false;
        } 
    }

}]);




