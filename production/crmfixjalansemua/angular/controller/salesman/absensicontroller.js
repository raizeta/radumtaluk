'use strict';
myAppModule.controller("AbsensiController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","apiService","ngToast","sweet","$filter","$timeout","AbsensiService","LocationService", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,apiService,ngToast,sweet,$filter,$timeout,AbsensiService,LocationService) 
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
            var resultabsen = $scope.responseabsen.Salesmanabsensi[0];
            if(resultabsen.STATUS == 0)
            {
                $scope.showbuttonabsensikeluar = true;
            }
            else if(resultabsen.STATUS == 1)
            {
                $scope.showbuttonnotifiabsen = true;
            }  
        }
    },
    function (error)
    {
        alert("Data Absensi Error");
    });

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
            $scope.showbuttonabsensikeluar = true;
            var lanjutkeagenda = confirm("Absensi Sukses.Lanjut Ke Agenda?");
            if (lanjutkeagenda == true) 
            {
                $location.path("/agenda/" + tanggalplan);
            } 
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
            AbsensiService.getAbsensi(auth,tanggalplan)
            .then(function(response)
            {
                if(response.length != 0)
                {
                    var resultabsen = response.Salesmanabsensi[0];
                    var idsalesmanabsensi = resultabsen.ID;
                    var detail = {};
                    detail.WAKTU_KELUAR      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    detail.LATITUDE_KELUAR   = $scope.googlemaplat;
                    detail.LONG_KELUAR       = $scope.googlemaplong;
                    detail.UPDATE_BY         = auth.id;
                    detail.UPDATE_AT         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    detail.STATUS            = 1;
                    AbsensiService.updateAbsensi(idsalesmanabsensi,detail)
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
            },
            function (error)
            {
                alert("Data Absensi Error");
            });
        }
        else
        {
            $scope.showbuttonabsensikeluar = true;
            $scope.loadingcontent = false;
        } 
    }

}]);




