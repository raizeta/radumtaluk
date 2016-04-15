'use strict';
myAppModule.controller("HistoryController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig",
function ($rootScope,$scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig) 
{
        
    $scope.activehistory = "active";

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var url = $rootScope.linkurl;

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    

    var idsalesman = auth.id;
    var data = $.ajax
    ({
          url: url + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var myData = data;
    var mt = JSON.parse(myData)['JadwalKunjungan'];

    $scope.events = [];

    angular.forEach(mt, function(value, key)
    {
        if(value.SCDL_GROUP == 1)
        {
            var title = "GB";
        }
        else if(value.SCDL_GROUP == 2)
        {
            var title = "GT";
        }
        else if(value.SCDL_GROUP == 3)
        {
            var title = "GS";
        }
        else if(value.SCDL_GROUP == 4)
        {
            var title = "GU";
        }

        var tanggal= value.TGL1;
        var data ={};
        data.title = title;
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
        editable: true,
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

