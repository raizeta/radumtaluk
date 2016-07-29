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

    $scope.getabsensifunction = function ()
    {
        AbsensiService.getAbsensi(auth,tanggalplan)
        .then (function (response)
        {
            if(response.length == 0)
            {
                $scope.showbuttonabsensimasuk   = true;
            }
            else
            {
                var resultabsen = response.Salesmanabsensi[0];
                if(resultabsen.STATUS == 0)
                {
                    var absensimasuk = {};
                    absensimasuk.absensimasuk   = 1;
                    absensimasuk.absensitgl     = tanggalplan;
                    absensimasuk.absensiid      = resultabsen.ID;
                    absensimasuk.absensiuser    = resultabsen.USER_NM;

                    var absensimasuk = JSON.stringify(absensimasuk);
                    $window.localStorage.setItem('my-absen', absensimasuk);

                    $scope.showbuttonabsensikeluar  = true;
                }
                else
                {
                    var absensimasuk = {};
                    absensimasuk.absensimasuk   = 0;
                    absensimasuk.absensitgl     = tanggalplan;
                    absensimasuk.absensiid      = resultabsen.ID;
                    absensimasuk.absensiuser    = resultabsen.USER_NM;

                    var absensimasuk = JSON.stringify(absensimasuk);
                    $window.localStorage.setItem('my-absen', absensimasuk);

                    $scope.showbuttonnotifiabsen    = true; 
                }  
            }
        });
    }

    if($window.localStorage.getItem('my-absen'))
    {
        var resultabsen     = JSON.parse($window.localStorage.getItem('my-absen'));
        var absensimasuk    = resultabsen.absensimasuk;
        var absensitgl      = resultabsen.absensitgl;
        var absensiuser     = resultabsen.absensiuser;
        console.log(absensiuser);
        if(absensitgl == tanggalplan && absensiuser == auth.username)
        {
           if(absensimasuk == 1)
            {
                $scope.showbuttonabsensikeluar  = true; 
            }
            else if(absensimasuk == 0)
            {
                $scope.showbuttonabsensikeluar  = false;
                $scope.showbuttonabsensimasuk   = false;
                $scope.showbuttonnotifiabsen    = true;
            } 
        }
        else
        {
            $scope.showbuttonabsensimasuk   = true;
            $window.localStorage.removeItem('my-absen');
        }  
    }

    else
    {
        $scope.getabsensifunction();
    }

    $scope.absensimasuk = function () 
    {     
        $scope.showbuttonabsensimasuk    = false;
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
            var absensimasuk = {};
            absensimasuk.absensimasuk   = 1;
            absensimasuk.absensitgl     = tanggalplan;
            absensimasuk.absensiid      = response.ID;
            absensimasuk.absensiuser    = response.USER_NM;
            
            var absensimasuk = JSON.stringify(absensimasuk);
            $window.localStorage.setItem('my-absen', absensimasuk);

            $scope.showbuttonabsensikeluar   = true;
            $scope.showbuttonabsensimasuk    = false;

            alert("Kamu Telah Berhasil Melakukan Absensi Masuk");
            $location.path("/agenda/" + tanggalplan);
        }, 
        function (err)
        {
            alert("Gagal Absensi Masuk.Try Again");
            $scope.showbuttonabsensimasuk   = true;
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
            if($window.localStorage.getItem('my-absen'))
            {
                var resultabsen         = JSON.parse($window.localStorage.getItem('my-absen'));
                var absensiuser         = resultabsen.absensiuser;
                var idsalesmanabsensi   = resultabsen.absensiid;

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
                    var absensimasuk = {};
                    absensimasuk.absensimasuk   = 0;
                    absensimasuk.absensitgl     = tanggalplan;
                    absensimasuk.absensiid      = resultabsen.absensiid;
                    absensimasuk.absensiuser    = resultabsen.absensiuser;
                    
                    var absensimasuk = JSON.stringify(absensimasuk);
                    $window.localStorage.setItem('my-absen', absensimasuk);

                    $scope.showbuttonnotifiabsen        = true;  
                    $scope.buttonabsensimasuk           = true;
                    $scope.buttonabsensikeluar          = true;
                    $scope.showbuttonabsensikeluar      = false;

                    alert("Terimakasih. Absensi Keluar Sukses");       
                },
                function (err)
                {
                    alert("Gagal Absensi Keluar.Try Again");
                    $scope.buttonabsensikeluar   = true;
                });
            }
        });   
    }
}]);




