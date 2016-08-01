'use strict';
myAppModule.controller("AbsensiController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","apiService","ngToast","sweet","$filter","$timeout","AbsensiService","resolvegpslocation","resolveabsensi", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,apiService,ngToast,sweet,$filter,$timeout,AbsensiService,resolvegpslocation,resolveabsensi) 
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

    $scope.googlemaplat     = resolvegpslocation.latitude;    //get from gps
    $scope.googlemaplong    = resolvegpslocation.longitude;  //get from gps

    if(resolveabsensi.length == 0)
    {
        $scope.showbuttonabsensimasuk = true;
    }
    else
    {
        var resultabsen = resolveabsensi.Salesmanabsensi[0];
        if(resultabsen.STATUS == 0)
        {
            $scope.showbuttonabsensikeluar = true;
        }
        else if(resultabsen.STATUS == 1)
        {
            $scope.showbuttonnotifiabsen = true;
        }  
    }

    $scope.absensimasuk = function () 
    {     
        $scope.showbuttonabsensimasuk   = false;
        $scope.loading = true;

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
        function (err)
        {
            $scope.showbuttonabsensimasuk   = true;
            alert("Gagal Absensi Masuk.Try Again");    
        });
    }

    $scope.absensikeluar = function () 
    { 
        $scope.showbuttonabsensikeluar = false;

        var yakinabsenkeluar = confirm("Yakin Untuk Absen Keluar?");
        if (yakinabsenkeluar == true) 
        {

            var idsalesmanabsensi = resolveabsensi.Salesmanabsensi[0].ID;

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
                alert("Terimakasih. Absensi Keluar Sukses");       
            },
            function (err)
            {
                $scope.showbuttonabsensikeluar = true;
                alert("Gagal Absensi Keluar.Try Again"); 
            });

        }
        else
        {
            $scope.showbuttonabsensikeluar = true;
        } 
    }
}]);




