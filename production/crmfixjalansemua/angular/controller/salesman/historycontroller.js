'use strict';
myAppModule.controller("HistoryController", ["$rootScope","$scope", "$location","$filter","$timeout","$window","auth","uiCalendarConfig","JadwalKunjunganService","history","absen",
function ($rootScope,$scope,$location,$filter,$timeout,$window,auth,uiCalendarConfig,JadwalKunjunganService,history,absen) 
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
    if(history)
    {
        if(history.length != 0)
        {
            var responselisthistory = history;
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
                    if(absen)
                    {
                        if(absen.AbsenMasuk == 1)
                        {
                           if(absen.AbsenKeluar == 0)
                           {
                                data.color = '#0000ff';
                           }
                           else
                           {
                               data.color = '#dd4b39'; 
                           }
                        } 
                    }
                    else 
                    {
                        data.color = '#dd4b39';
                    }  
                }

                $scope.events.push(data);
            }); 
        }
        else
        {
            alert("List History Kosong");
        }
        $scope.eventSources = [$scope.events];
        
    }
    else
    {
        JadwalKunjunganService.GetListHistory(auth)
        .then (function (response)
        {

            if(response.length != 0)
            {
                var responselisthistory = response;
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
                        if(absen)
                        {
                            if(absen.AbsenMasuk == 1)
                            {
                               if(absen.AbsenKeluar == 0)
                               {
                                    data.color = '#0000ff';
                               }
                               else
                               {
                                   data.color = '#dd4b39'; 
                               }
                            } 
                        }
                        else 
                        {
                            data.color = '#dd4b39';
                        }  
                    }

                    $scope.events.push(data);
                }); 
            }
            else
            {
                alert("List History Kosong");
            }
            $scope.eventSources = [$scope.events];    
        },
        function (error)
        {
            console.log(error);
            alert("Error Get List History");
        });  
    }
      
}]);

