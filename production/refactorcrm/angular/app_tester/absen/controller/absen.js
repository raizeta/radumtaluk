'use strict';
myAppModule.controller("AbsenController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,LocationFac,AbsensiFac) 
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

    var options = {maximumAge:3000,timeout:60000, enableHighAccuracy: false};
    LocationFac.GetGpsLocation(options)
    .then(function(data)
    {
        $scope.googlemaplat   = data.latitude;
        $scope.googlemaplong  = data.longitude;
    });
    
    AbsensiFac.getAbsensi(auth,tanggalplan)
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
        }  
    },
    function (error)
    {
        alert("Gagal Mendapatkan Data Absensi Dari Server");
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

        AbsensiFac.setAbsensi(detail)
        .then (function (response)
        {
            $scope.showbuttonabsensikeluar = true;
        }, 
        function (error)
        {
            $scope.showbuttonabsensimasuk   = true;
            alert("Gagal Absensi Masuk.Try Again");    
        })
        .finally(function()
    	{
    		$scope.loadingcontent = false;
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

            AbsensiFac.updateAbsensi($scope.idabsensi,detail)
            .then (function (response)
            {
                alert("Terimakasih. Absensi Keluar Berhasil"); 
                $scope.showbuttonnotifiabsen = true;      
            },
            function (error)
            {
                $scope.showbuttonabsensikeluar = true;
                alert("Absensi Keluar Gagal.Try Again"); 
            })
            .finally(function()
        	{
        		$scope.loadingcontent = false;
        	});
        }
        else
        {
            $scope.showbuttonabsensikeluar = true;
            $scope.loadingcontent = false;
        } 
    }
});



