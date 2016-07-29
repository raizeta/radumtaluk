'use strict';
myAppModule.controller("HistoryController", ["$rootScope","$scope", "$location","$filter","$window","auth","uiCalendarConfig","AbsensiService","historyresolve",
function ($rootScope,$scope,$location,$filter,$window,auth,uiCalendarConfig,AbsensiService,historyresolve) 
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

    var calendardate = new Date();
    var d = calendardate.getDate();
    var m = calendardate.getMonth();
    var y = calendardate.getFullYear();

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
    $scope.events = [];
    $scope.eventSources = [$scope.events];

    AbsensiService.getAbsensi(auth,tanggalplan)
    .then(function(response)
    {
        if(response.length != 0)
        {
            var resultabsen = response.Salesmanabsensi[0];
            if(historyresolve.length != 0)
            {
                var responselisthistory = historyresolve.JadwalKunjungan;
                var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
                angular.forEach(responselisthistory, function(value, key)
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
                        if(resultabsen.STATUS == 1)
                        {
                            data.color = '#dd4b39';
                        }
                        else if(resultabsen.STATUS == 0)
                        {
                            data.color = '#3232ff';
                        } 
                    }

                    $scope.events.push(data);
                });
                $scope.eventSources = [$scope.events];
            }  
        }
        else
        {
            alert("Tolong Lakukan Absensi Terlebih Dahulu");
            $location.path('/absensi');
        }
    },
    function (error)
    {
        alert("Data Absensi Error");
    });
}]);

