'use strict';
myAppModule.controller("HistoryController", ["$rootScope","$scope", "$location","auth","$window","uiCalendarConfig","historyresolve","AbsensiService","$filter",
function ($rootScope,$scope,$location,auth,$window,uiCalendarConfig,historyresolve,AbsensiService,$filter) 
{  
    
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    $scope.activehistory    = "active";
    $scope.loading          = true;

    var tanggalplan = $rootScope.tanggalharini;
    if($window.localStorage.getItem('my-absen'))
    {
        var resultabsen     = JSON.parse($window.localStorage.getItem('my-absen'));
        var absensimasuk    = resultabsen.absensimasuk;
        var absensitgl      = resultabsen.absensitgl;
        var absensiuser     = resultabsen.absensiuser;
        if(absensitgl != tanggalplan || absensiuser != auth.username)
        {
            alert("Tolong Lakukan Absensi Terlebih Dahulu");
            $window.localStorage.removeItem('my-absen');
            $location.path('/absensi');
        }
    }
    else
    {
        AbsensiService.getAbsensi(auth,tanggalplan)
        .then (function (response)
        {
            if(response.length == 0)
            {
                alert("Tolong Lakukan Absensi Terlebih Dahulu");
                $location.path('/absensi');
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
                }  
            }
        });
    }

    

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    var mt = historyresolve.JadwalKunjungan;
    var agendakalender = [];

    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    angular.forEach(mt, function(value, key)
    {
        var tanggal= value.TGL1;
        var data ={};
        data.title = value.NOTE;
        data.start = new Date(tanggal);
        data.allDay =true;
        data.url ="#/agenda/" + tanggal;
        if(tanggal > tanggalsekarang)
        {
          data.color = '#378006';  
        }
        else if(tanggal < tanggalsekarang)
        {
            data.color = '#dd4b39';
        }
        else if(tanggal == tanggalsekarang)     
        {
            if($window.localStorage.getItem('my-absen'))
            {
                var xxx = JSON.parse($window.localStorage.getItem('my-absen'));
                var absensimasuk = xxx.absensimasuk;
                if(absensimasuk == 0)
                {
                    data.color = '#dd4b39';
                } 
            }
            else 
            {
                data.color = '#dd4b39';
            }  
        }

        agendakalender.push(data);
    });


    var data ={};
    data.title = 'JT6';
    data.start = new Date(tanggalplan);
    data.allDay =true;
    data.url ="#/agenda/" + tanggalplan;
    data.color = '#378006';

    agendakalender.push(data);  
        
    $scope.uiConfig = 
    {
      calendar:
      {
        height: 450,
        editable: false,
        header:
        {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },

        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    agendakalender= _.uniq(agendakalender, 'url');
    $scope.eventSources = [agendakalender];
}]);

