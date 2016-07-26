'use strict';
myAppModule.controller("AbsensiController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","apiService","ngToast","sweet","$filter","$timeout","AbsensiService","resolvegpslocation", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,apiService,ngToast,sweet,$filter,$timeout,AbsensiService,resolvegpslocation) 
{   
    $scope.activeabsensi = "active";
    $scope.showbuttonabsensikeluar  = false;
    $scope.showbuttonabsensimasuk   = false;
    $scope.showbuttonnotifiabsen    = false;
    $scope.userInfo = auth;
    var tanggalplan = $rootScope.tanggalharini;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    $scope.googlemaplat     = resolvegpslocation.latitude;    //get from gps
    $scope.googlemaplong    = resolvegpslocation.longitude;  //get from gps

    AbsensiService.getAbsensi(auth,tanggalplan)
    .then (function (response)
    {
        if(response.length == 0)
        {
            $scope.showbuttonabsensikeluar  = false;
            $scope.showbuttonabsensimasuk   = true;
        }
        else
        {
            var idsalesmanabsensikeluar = response.Salesmanabsensi[0].STATUS;
            if(idsalesmanabsensikeluar == 0)
            {
                $scope.showbuttonabsensimasuk   = false;
                $scope.showbuttonabsensikeluar  = true;  
            } 
            else if(idsalesmanabsensikeluar == 1)
            {
                $scope.showbuttonabsensikeluar  = false;
                $scope.showbuttonabsensimasuk   = false;
                $scope.showbuttonnotifiabsen    = true;
            } 
        }
    });

    $scope.absensimasuk = function () 
    {     
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
            $scope.showbuttonabsensikeluar   = true;
            $scope.showbuttonabsensimasuk    = false;
            alert("Kamu Telah Berhasil Melakukan Absensi Masuk");
            //sweetAlert("Terimakasih", "Kamu Telah Berhasil Melakukan Absensi Masuk", "success");
            $location.path("/agenda/" + tanggalplan);

            var absensimasuk = {};
            absensimasuk.absensimasuk   = 1;
            var absensimasuk = JSON.stringify(absensimasuk);
            $window.localStorage.setItem('my-absen', absensimasuk);
        });
    }

    $scope.absensikeluar = function () 
    { 
        sweet.show({
            title: 'Yakin Untuk Absen Keluar?',
            text: 'Persiksa Agenda Hari Ini Apakah Sudah Complete!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yakin',
            closeOnConfirm: true
        }, 
        function() 
        {
            AbsensiService.getAbsensi(auth,tanggalplan)
            .then (function (response)
            {
                var idsalesmanabsensi = response.Salesmanabsensi[0].ID;
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
                    $scope.buttonabsensimasuk   = true;
                    $scope.buttonabsensikeluar  = true;
                    $scope.showbuttonabsensikeluar  = false;
                    alert("Terimakasih. Absensi Keluar Sukses");
                    //sweetAlert("Terimakasih", "Kamu Telah Berhasil Melakukan Absensi Keluar", "success");
                    var absensimasuk = {};
                    absensimasuk.absensimasuk   = 0;
                    var absensimasuk = JSON.stringify(absensimasuk);
                    $window.localStorage.setItem('my-absen', absensimasuk);
                    $scope.showbuttonnotifiabsen    = true;
                    
                });
            }); 
        });   
    }
}]);




