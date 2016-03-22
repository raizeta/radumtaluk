'use strict';
myAppModule.controller("HistoryController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig",
function ($rootScope,$scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig) 
{
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    

    var idsalesman = auth.id;


    

    var data = $.ajax
    ({
          url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var myData = data;
    var mt = JSON.parse(myData)['JadwalKunjungan'];
    // var tanggal = mt[0]['TGL1'];
    // var tanggal1 = mt[1]['TGL1'];
    // console.log(mt);
    // console.log(tanggal);
    
    $scope.events = [];

    angular.forEach(mt, function(value, key)
    {
        var tanggal= value.TGL1;
        var data ={};
        data.title = 'Visit Group Barat';
        data.start = new Date(tanggal);
        data.allDay =true;
        data.url ="#/agenda/" + tanggal;
        $scope.events.push(data);
    });
    console.log($scope.events);

    // $scope.events = 
    // [
    //   {
    //     title: 'Visit Group Barat',
    //     start: new Date(tanggal),
    //     allDay: true,
    //     url: '#/agenda' + idsalesman
    //   },
    //   {
    //     title: 'Visit Group Barat',
    //     start: new Date(tanggal1),
    //     allDay: true,
    //     url: '#/agenda' + idsalesman
    //   }
    // ];
    // console.log($scope.events);

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
    

    // var idsalesman = auth.id;
    // apiService.alllistagenda(idsalesman)
    // .then(function (result) 
    // {
    //     $scope.customers = result.JadwalKunjungan;
    //     console.log($scope.customers); 
    // });
}]);

