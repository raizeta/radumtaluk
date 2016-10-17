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
		console.log(tanggalsekarang);
		var responsetanggal     = new Date(tahunmasuk,bulanmasuk - 1,i + 1);
		var stringresponse		= $filter('date')(responsetanggal,'yyyy-MM-dd')
		if(responsetanggal.getDay() != 2)
		{
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
    }
    $scope.eventSources = [$scope.events];
});

myAppModule.controller("SalesTrackDetailController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,UtilService) 
{
	$scope.activesalestrack = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
});

