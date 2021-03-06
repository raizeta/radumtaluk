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

    var tanggalplan = $rootScope.tanggalharini;
    AbsensiService.getAbsensi(auth,tanggalplan)
    .then (function (response)
    {
        if(response.length == 0)
        {
            //alert("Tolong Lakukan Absensi Terlebih Dahulu");
            sweetAlert("Oops...", "Tolong Lakukan Absensi Terlebih Dahulu!", "error");
            $location.path('/absensi');
        }
    });
    $scope.activehistory    = "active";
    $scope.loading          = true;
    
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    var mt = historyresolve.JadwalKunjungan;
    $scope.events = [];

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

        $scope.events.push(data);
    });

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
    $scope.eventSources = [$scope.events];
}]);

