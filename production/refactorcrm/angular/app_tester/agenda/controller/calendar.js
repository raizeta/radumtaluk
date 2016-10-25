'use strict';
myAppModule.controller("CalendarController",
function ($rootScope,$scope,$location,auth,$window,$filter,$timeout,rescalendar,CalendarCombFac)
{
    $scope.activecalendar = "active";
    $scope.userInfo         = auth;
    var tanggalsekarang     = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
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

    $scope.events   = [];
    angular.forEach(rescalendar,function(value,key)
    {
        var responsetanggal     = value.TGL1;
        var data                = {};
        data.title              = value.NOTE;
        data.start              = new Date(responsetanggal);
        data.allDay             = true;
        data.url                = "#/agenda/" + responsetanggal;
        if(responsetanggal > tanggalsekarang)
        {
          data.color = '#378006';  
        }
        else if(responsetanggal < tanggalsekarang)
        {
            data.color = '#dd4b39';
        }
        else if(responsetanggal == tanggalsekarang)
        {
            data.color = '#ff4bcc';
        }
        $scope.events.push(data);
    });
      
    var calendarhariini     = _.findWhere(rescalendar,{TGL1:tanggalsekarang});
    if(!calendarhariini)
    {
        CalendarCombFac.GetCalendarByUserAndDateCombine(auth,tanggalsekarang)
        .then(function(response)
        {
            if(angular.isArray(response) && response.length == 0)
            {
                alert("Belum Ada Jadwal Untuk Hari Ini");  
            }
            else
            {
                var responsetanggal     = response.TGL1;
                var data                = {};
                data.title              = response.NOTE;
                data.start              = new Date(responsetanggal);
                data.allDay             = true;
                data.url                = "#/agenda/" + responsetanggal;
                if(responsetanggal > tanggalsekarang)
                {
                  data.color = '#378006';  
                }
                else if(responsetanggal < tanggalsekarang)
                {
                    data.color = '#dd4b39';
                }
                else if(responsetanggal == tanggalsekarang)
                {
                    data.color = '#ff4bcc';
                }
                $scope.events.push(data);
            }
        });
    }
    $scope.eventSources = [$scope.events];
});



