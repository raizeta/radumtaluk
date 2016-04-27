'use strict';
myAppModule.controller("HistoryController", ["$scope", "$location","auth","$window","uiCalendarConfig","historyresolve",
function ($scope,$location,auth,$window,uiCalendarConfig,historyresolve) 
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
    
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    var mt = historyresolve.JadwalKunjungan;
    $scope.events = [];

    angular.forEach(mt, function(value, key)
    {
        var tanggal= value.TGL1;
        var data ={};
        data.title = value.NOTE;
        data.start = new Date(tanggal);
        data.allDay =true;
        data.url ="#/agenda/" + tanggal;
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

