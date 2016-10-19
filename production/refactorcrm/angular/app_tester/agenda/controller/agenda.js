'use strict';
myAppModule.controller("AgendaController",
function ($rootScope,$scope,$location,auth,$window,$filter,$routeParams,$timeout,$cordovaGeolocation,CalendarCombFac,AgendaCombFac,ListKunjunganFac,OutOfCaseFac)
{
    $scope.userInfo         = auth;
    var tanggalsekarang     = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalplan         = $filter('date')($routeParams.idtanggal,'yyyy-MM-dd');
    $scope.tanggalplan      = tanggalplan;
    if(tanggalsekarang == tanggalplan)
    {
        $scope.activeagendatoday = "active";
    }
    else
    {
        $scope.activehistory = "active";
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var watchOptions    = {timeout :1000,enableHighAccuracy: false};
    var watch           = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(null,function(err) 
    {
        console.log(err);
    },
    function(position) 
    {
        var gpslat      = position.coords.latitude;
        var gpslong     = position.coords.longitude;
        $scope.gpslat   = gpslat;
        $scope.gpslong  = gpslong;
        console.log(gpslat + " " + gpslong);
    });
    
    CalendarCombFac.GetCalendarByUserAndDateCombine(auth,tanggalplan)
    .then(function(response)
    {
        if(response.length == 0)
        {
            if(tanggalsekarang == tanggalplan)
            {
                $scope.showbuttonoutofcase = true;
            }
        }
        else
        {
            var SCDL_GROUP         = response.SCDL_GROUP;
            AgendaCombFac.GetCalendarCombine(auth,tanggalplan,SCDL_GROUP)
            .then(function (responseagendatoday) 
            {
                if(responseagendatoday.length > 0)
                {
                    $scope.customers        = responseagendatoday;
                }
                else
                {
                    alert("Belum Ada Customer Yang Terdaftar");
                }
            },
            function (error)
            {
                alert("Gagal Mendapatkan Agenda");
            })
            .finally(function(response)
            {
                $scope.loadingcontent   = false;  
            });  
        }
    });

    $scope.OutofCase = function()
    {
        $scope.showbuttonoutofcase = false;
        $scope.loadingcontent = true;
        var detail = {};
        detail.TGL1         = $filter('date')(new Date(),'yyyy-MM-dd');
        detail.TGL2         = $filter('date')(new Date(),'yyyy-MM-dd');
        detail.SCDL_GROUP   = 'OUTOFCASE';
        detail.USER_ID      = auth.id;
        detail.NOTE         = 'OUTOFCASE';
        detail.STATUS       = 1;
        detail.CREATE_BY    = auth.id;
        detail.CREATE_AT    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.UPDATE_BY    = auth.id;
        detail.STT_UBAH     = 1;
        detail.UPDATE_AT    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

        OutOfCaseFac.SetHeaderOutOfCases(detail)
        .then (function (response)
        {
            var berhasil = confirm("Tambahkan Customer?");
            if (berhasil == true) 
            {
                $location.path('/outofcase');
            }
        },
        function (error)
        {
            alert("Gagal Menyimpan Agenda Out OF Case");
        })
        .finally(function()
        {
            $scope.loadingcontent = false;  
        });     
    }
    $scope.detailjadwalkunjungan = function(agenda)
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Tidak Bisa Lagi Check In");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Belum Bisa Check In");
        }
        else if(tanggalplan == tanggalsekarang)
        {
            $location.path('/action/' + agenda.ID);
        }
    }
});



