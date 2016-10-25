'use strict';
myAppModule.controller("SummaryController",
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
        data.url                = "#/summary/" + responsetanggal;
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

    $scope.eventSources = [$scope.events];
});

myAppModule.controller("SummaryPerDateController",
function ($rootScope,$scope,$location,$routeParams,auth,$window,$filter,$timeout,SummarySqliteFac,ProductCombRes,ActivitasCombRes)
{
    $scope.activecalendar   = "active";
    $scope.userInfo         = auth;
    var tanggalsummary      = $filter('date')(new Date($routeParams.idtanggal),'yyyy-MM-dd');
    $scope.tanggaldiview    = tanggalsummary;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var resolvebarang       = ProductCombRes;
    var resolveaktifitas    = ActivitasCombRes;

    SummarySqliteFac.GetSummaryAllCustomers(auth,tanggalsummary,resolvebarang,resolveaktifitas)
    .then(function(response)
    {
        if(angular.isArray(response) && response.length > 0)
        {
            
            $scope.combinations = response;
            var z = '';
            var totalinventory = '<td>TOTAL</td>';
            angular.forEach($scope.combinations[0].products, function(value,key)
            {
                var xxx = value;
                angular.forEach(xxx.penjualan, function(value,key)
                {
                    z = z + '<td align="center">' + value.DIALOG_TITLE + '</td>';
                    totalinventory = totalinventory + '<td align="center">' + value.TOTALQTY + '</td>';
                });
            });
            $scope.indonesia = z;
            $scope.loadingcontent  = false;
            $scope.totalinventory = totalinventory;  
        }
        
    });
});

myAppModule.controller("SummaryPerDatePerCustController",
function ($rootScope,$scope,$location,$routeParams,auth,$window,$filter,$timeout,SummarySqliteFac,ProductCombRes,ActivitasCombRes)
{
    $scope.activecalendar   = "active";
    $scope.userInfo         = auth;
    var tanggalsummary      = $filter('date')(new Date($routeParams.idtanggal),'yyyy-MM-dd');
    var kdcustomer          = $routeParams.idcustomer;
    console.log(kdcustomer);
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var resolvebarang       = ProductCombRes;
    var resolveaktifitas    = ActivitasCombRes;

    SummarySqliteFac.GetSummaryAllCustomers(auth,tanggalsummary,resolvebarang,resolveaktifitas)
    .then(function(response)
    {
        if(angular.isArray(response) && response.length > 0)
        {
            $scope.combinations = response;
            var z = '';
            var totalinventory = '<td>TOTAL</td>';
            angular.forEach($scope.combinations[0].products, function(value,key)
            {
                var xxx = value;
                angular.forEach(xxx.penjualan, function(value,key)
                {
                    z = z + '<td align="center">' + value.DIALOG_TITLE + '</td>';
                    totalinventory = totalinventory + '<td align="center">' + value.TOTALQTY + '</td>';
                });
            });
            $scope.indonesia = z;
            $scope.loadingcontent  = false;
            $scope.totalinventory = totalinventory;  
        }
        
    });
});



