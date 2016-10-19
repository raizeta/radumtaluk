'use strict';
myAppModule.controller("SalesTrackController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,UtilService) 
{   
    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.activesalestrack = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var totalday = UtilService.getTotalHariDalamSebulan(tanggalsekarang);
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
    var tahunmasuk      = $filter('date')(tanggalsekarang,'yyyy');
    var bulanmasuk      = $filter('date')(tanggalsekarang,'MM');
    $scope.events   	= [];
    for(var i=0; i < totalday; i++)
    {
		var responsetanggal     = new Date(tahunmasuk,bulanmasuk - 1,i + 1);
		var stringresponse		= $filter('date')(responsetanggal,'yyyy-MM-dd')
		// if(responsetanggal.getDay() != 2) //jika hari tidak hari selasa maka push ke array
		var data                = {};
        data.title              = 'ABSENSI';
        data.start              = stringresponse;
        data.allDay             = true;
        data.url                = "#/salestrack/" + stringresponse;
        if(stringresponse > tanggalsekarang)
        {
          data.color = '#378006';  
        }
        else if(stringresponse < tanggalsekarang)
        {
            data.color = '#dd4b39';
        }
        else if(stringresponse == tanggalsekarang)
        {
            data.color = '#ff4bcc';
        }
        $scope.events.push(data);	

    }
    $scope.eventSources = [$scope.events];
});

myAppModule.controller("SalesTrackDetailController",
function ($scope,$location,$window,$filter,$routeParams,auth,SalesTrackFac) 
{
	var idtanggal              = $routeParams.idtanggal;
    $scope.activesalestrack = "active";
    $scope.userInfo         = auth;
    var tanggalplan         = $filter('date')(idtanggal,'yyyy-MM-dd');
	$scope.logout  = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    SalesTrackFac.getSalesTrackAbsensi(tanggalplan)
    .then(function(response)
    {
        $scope.salestracks = response;
    });
});

myAppModule.controller("SalesTrackDetailUserController",
function ($scope,$location,$window,$filter,$routeParams,auth,SalesTrackFac) 
{
    var idtanggal               = $routeParams.idtanggal;
    var iduser                  = $routeParams.iduser;
    $scope.activesalestrack     = "active";
    $scope.userInfo             = auth;
    var tanggalplan             = $filter('date')(idtanggal,'yyyy-MM-dd');
    $scope.tanggalplanurl       = tanggalplan;
    $scope.logout  = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    SalesTrackFac.getSalesTrack(tanggalplan,iduser)
    .then(function(response)
    {
        console.log(response);
        $scope.salestracks = response;
    });
});

myAppModule.controller("SalesTrackDetailUserCustomerController",
function ($scope,$location,$window,$filter,$routeParams,auth,SummaryService) 
{
    var idtanggal               = $routeParams.idtanggal;
    var iduser                  = $routeParams.iduser;
    var CUST_ID                 = $routeParams.idcustomer;
    $scope.activesalestrack     = "active";
    $scope.userInfo             = auth;
    var tanggalplan             = $filter('date')(idtanggal,'yyyy-MM-dd');
    $scope.logout  = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    SummaryService.datasummarypercustomer(idtanggal,CUST_ID,iduser)
    .then(function (data)
    {
        $scope.BarangSummary = data.InventorySummary;
        $scope.loading = false;
        console.log($scope.BarangSummary);
    });
});