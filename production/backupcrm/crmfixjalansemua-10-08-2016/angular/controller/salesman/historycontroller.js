'use strict';
myAppModule.controller("HistoryController", ["$rootScope","$scope", "$location","$filter","$timeout","$window","auth","uiCalendarConfig","JadwalKunjunganService","$cordovaSQLite",
function ($rootScope,$scope,$location,$filter,$timeout,$window,auth,uiCalendarConfig,JadwalKunjunganService,$cordovaSQLite) 
{  
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    $scope.activehistory    = "active";
    $scope.loadingcontent          = true;

    var tanggalplan = $rootScope.tanggalharini;
    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');

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

    document.addEventListener("deviceready", function () 
    {
        var queryscdlheader = "SELECT * FROM Scdlheader WHERE USER_ID = ?";
        $cordovaSQLite.execute($rootScope.db, queryscdlheader, [auth.id])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                var l = result.rows.length;
                for (var i=0; i < l; i++) 
                {
                    var tanggalscdlheader= result.rows.item(i).TGL1;
                    var data ={};
                    data.title = result.rows.item(i).NOTE;
                    data.start = new Date(tanggalscdlheader);
                    data.allDay =true;
                    data.url ="#/agenda/" + tanggalscdlheader;
                    if(tanggalscdlheader > tanggalsekarang)
                    {
                      data.color = '#378006';  
                    }
                    else if(tanggalscdlheader < tanggalsekarang)
                    {
                        data.color = '#dd4b39';
                    }
                    else if(tanggalscdlheader == tanggalsekarang)
                    {
                        data.color = '#ff4bcc';
                    }
                    $scope.events.push(data);
                }
            }
            else
            {
                JadwalKunjunganService.GetListHistory(auth)
                .then (function (responselisthistory)
                {
                    if(responselisthistory.length != 0)
                    {
                        angular.forEach(responselisthistory, function(value, key)
                        {
                            var newID_SERVER        = value.ID;
                            var newTGL1             = value.TGL1;
                            var newSCDL_GROUP       = value.SCDL_GROUP;
                            var newUSER_ID          = value.USER_ID;
                            var newNOTE             = value.NOTE;
                            var newSTATUS_HEADER    = value.STATUS;

                            var queryinsertscdlheader = 'INSERT INTO Scdlheader (ID_SERVER,TGL1,SCDL_GROUP,USER_ID,NOTE,STATUS_HEADER) VALUES (?,?,?,?,?,?)';
                            $cordovaSQLite.execute($rootScope.db,queryinsertscdlheader,[newID_SERVER,newTGL1,newSCDL_GROUP,newUSER_ID,newNOTE,newSTATUS_HEADER])
                            .then(function(result) 
                            {
                                console.log("SCDL Header Berhasil Disimpan Di Local!");
                            }, 
                            function(error) 
                            {
                                console.log("SCDL Header Gagal Disimpan Ke Local: " + error.message);
                            });

                            var tanggalscdlheader= value.TGL1;
                            var data ={};
                            data.title      = value.NOTE;
                            data.start      = new Date(tanggalscdlheader);
                            data.allDay     = true;
                            data.url        = "#/agenda/" + tanggalscdlheader;
                            if(tanggalscdlheader > tanggalsekarang)
                            {
                              data.color = '#378006';  
                            }
                            else if(tanggalscdlheader < tanggalsekarang)
                            {
                                data.color = '#dd4b39';
                            }
                            else if(tanggalscdlheader == tanggalsekarang)
                            {
                                data.color = '#ff4bcc';
                            } 

                            $scope.events.push(data);
                        });
                    }
                    else
                    {
                        alert("Data SCDL Header di Server Masih Kosong");
                    }
                },
                function (error)
                {
                    $scope.loadingcontent          = false;
                    alert("Gagal Mendapatkan SCDL Header Dari Server");
                });          
            }
        },
        function(error) 
        {
            $scope.loadingcontent          = false;
            console.log("Gagal Mendapatkan Data SCDL Header Dari Local" + error.message);
        });
    });

    
    $scope.loadscdlheaderhariini = function()
    {
        document.addEventListener("deviceready", function () 
        {
            var queryscdlheader = "SELECT * FROM Scdlheader WHERE USER_ID = ? AND TGL1 = ?";
            $cordovaSQLite.execute($rootScope.db, queryscdlheader, [auth.id,tanggalsekarang])
            .then(function(result) 
            {
                if (result.rows.length > 0) 
                {
                    console.log("Data SCDL Hari Ini Sudah Ada Di Local");
                }
                else
                {
                    JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalsekarang)
                    .then (function (responselisthistory)
                    {
                        if(responselisthistory.length != 0)
                        {
                            angular.forEach(responselisthistory, function(value, key)
                            {
                                var tanggalscdlheader = value.TGL1;
                                var data = {};
                                data.title      = value.NOTE;
                                data.start      = new Date(tanggalscdlheader);
                                data.allDay     = true;
                                data.url        = "#/agenda/" + tanggalscdlheader;
                                data.color      = '#ff4bcc'; 

                                $scope.events.push(data);

                                var newID_SERVER        = value.ID;
                                var newTGL1             = value.TGL1;
                                var newSCDL_GROUP       = value.SCDL_GROUP;
                                var newUSER_ID          = value.USER_ID;
                                var newNOTE             = value.NOTE;
                                var newSTATUS_HEADER    = value.STATUS;

                                var queryinsertscdlheader = 'INSERT INTO Scdlheader (ID_SERVER,TGL1,SCDL_GROUP,USER_ID,NOTE,STATUS_HEADER) VALUES (?,?,?,?,?,?)';
                                $cordovaSQLite.execute($rootScope.db,queryinsertscdlheader,[newID_SERVER,newTGL1,newSCDL_GROUP,newUSER_ID,newNOTE,newSTATUS_HEADER])
                                .then(function(result) 
                                {
                                    console.log("SCDL Header Tanggal Hari Ini Berhasil Disimpan Di Local!");
                                }, 
                                function(error) 
                                {
                                    console.log("SCDL Header Tanggal Hari Ini Gagal Disimpan Ke Local: " + error.message);
                                });
                            }); 
                        }
                        else
                        {
                            alert("SCDL Header Hari Ini Masih Kosong");
                        }
                    },
                    function (error)
                    {
                        $scope.loadingcontent          = false;
                        alert("Gagal Mendapatkan SCDL Header Hari Ini Dari Server");
                    });          
                }
            },
            function(error) 
            {
                console.log("Gagal Mendapatkan SCDL Header Hari Ini Dari Local: " + error.message);
                $scope.loadingcontent          = false;
            });
        }); 
    }
    
    $timeout(function()
    {
        $scope.loadscdlheaderhariini();
        $scope.loadingcontent          = false;
    },5000);
    
    

}]);

