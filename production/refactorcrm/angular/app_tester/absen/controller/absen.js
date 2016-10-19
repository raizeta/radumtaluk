'use strict';
myAppModule.controller("AbsenController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,LocationFac,AbsensiFac,AbsensiCombFac) 
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
    
    AbsensiCombFac.getAbsensiCombine(auth,tanggalplan)
    .then(function(responseabsensi)
    {
        if( (angular.isArray(responseabsensi)) && (responseabsensi.length == 0))
        {
            $scope.showbuttonabsensimasuk = true;
        }
        else
        {
        	var idserverabsensi         = responseabsensi.ID;
            var statusabsensi           = responseabsensi.STATUS;
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
    },
    function (error)
    {
        alert("Gagal Mendapatkan Data Absensi Dari Server");
    });

    $scope.absensimasuk = function () 
    {     
        $scope.showbuttonabsensimasuk   = false;
        $scope.loadingcontent = true;

        AbsensiCombFac.setAbsensiCombine(auth,tanggalplan,$scope.googlemaplat,$scope.googlemaplong)
        .then (function (response)
        {
            $scope.showbuttonabsensikeluar  = true;
            $scope.idabsensi                = response.ID;
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
            AbsensiCombFac.updateAbsensiCombine(auth,$scope.idabsensi,$scope.googlemaplat,$scope.googlemaplong)
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



