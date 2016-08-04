myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http","auth","$window","SummaryService","NgMap","LocationService","$filter","sweet","$routeParams","$timeout","JadwalKunjunganService","singleapiService","configurationService","LastVisitService","CheckInService","absen","agenda",
function ($rootScope,$scope, $location, $http,auth,$window,SummaryService,NgMap,LocationService,$filter,sweet,$routeParams,$timeout,JadwalKunjunganService,singleapiService,configurationService,LastVisitService,CheckInService,absen,agenda)
{
    $scope.userInfo = auth;
    $scope.loading  = true;
    var idsalesman = auth.id;
    $scope.data = 
    {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalplan     = $routeParams.idtanggal;

    if(tanggalsekarang == tanggalplan)
    {
        $scope.activeagendatoday = "active";
    }
    else
    {
        $scope.activehistory = "active";
    }

                
    var geocoder = new google.maps.Geocoder;
    LocationService.GetGpsLocation()
    .then(function(data)
    {
        $scope.datagpslocation = data;
        $scope.gpslat   = data.latitude;
        $scope.gpslong  = data.longitude;
    });

    CheckInService.getCheckinStatus(tanggalplan,idsalesman)
    .then(function (result) 
    {
        if(result.length == 0)
        {
            $scope.masihcheckinid =  null; 
        }
        else
        {
            $scope.masihcheckinid =  result.ID_DETAIL;
        }
    });
    
    //###################################################### USING LOCAL STORAGE)##############################################//
    // if(tanggalsekarang == tanggalplan)
    // {
    //     if(agenda)
    //     {
    //         if(agenda.length == 0)
    //         {
    //             alert("Belum Ada Jadwal Hari Ini");
    //             $location.path('/history');
    //         }
    //         else
    //         {
    //             $scope.customers = agenda;
    //             $scope.loading   = false;
    //         }  
    //     }
    //     else
    //     {
    //         JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
    //         .then(function(response)
    //         {
    //             if(response.length == 0)
    //             {
    //                 alert("Belum Ada Jadwal Hari Ini");
    //                 $location.path('/history');
    //             }
    //             else
    //             {
    //                 var idgroupcustomer         = response.SCDL_GROUP;
    //                 JadwalKunjunganService.GetSingleDetailKunjunganProsedur(idsalesman,idgroupcustomer,tanggalplan)
    //                 .then(function (result) 
    //                 {
    //                     $scope.customers = result;
    //                     $scope.loading   = false;
    //                 },
    //                 function (error)
    //                 {
    //                     var forcereload = confirm("Cors Agenda Error. Reload Again");
    //                     if (forcereload == true) 
    //                     {
    //                         $scope.loading   = true;
    //                         $timeout(function()
    //                         {
    //                             $window.location.reload();
    //                         },10000);
    //                     }
    //                     else
    //                     {
    //                         $scope.loading   = false;
    //                     }
    //                 });  
    //             }      
    //         });  
    //     }
    // }
    // else
    // {
    //     JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
    //     .then(function(response)
    //     {
    //         if(response.length == 0)
    //         {
    //             alert("Belum Ada Jadwal Hari Ini");
    //             $location.path('/history');
    //         }
    //         else
    //         {
    //             var idgroupcustomer         = response.SCDL_GROUP;
    //             JadwalKunjunganService.GetSingleDetailKunjunganProsedur(idsalesman,idgroupcustomer,tanggalplan)
    //             .then(function (result) 
    //             {
    //                 $scope.customers = result;
    //                 $scope.loading   = false;
    //             },
    //             function (error)
    //             {
    //                 var forcereload = confirm("Cors Agenda Error. Reload Again");
    //                 if (forcereload == true) 
    //                 {
    //                     $scope.loading   = true;
    //                     $timeout(function()
    //                     {
    //                         $window.location.reload();
    //                     },10000);
    //                 }
    //                 else
    //                 {
    //                     $scope.loading   = false;
    //                 }
    //             });  
    //         }      
    //     });  
    // }

    // ###############WITHOUT LOCAL STORAGE #####################################################//
    JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
    .then(function(response)
    {
        if(response.length == 0)
        {
            alert("Belum Ada Jadwal Hari Ini");
            $location.path('/history');
        }
        else
        {
            var idgroupcustomer         = response.SCDL_GROUP;
            JadwalKunjunganService.GetSingleDetailKunjunganProsedur(idsalesman,idgroupcustomer,tanggalplan)
            .then(function (result) 
            {
                $scope.customers = result;
                $scope.loading   = false;
            },
            function (error)
            {
                var forcereload = confirm("Cors Agenda Error. Reload Again");
                if (forcereload == true) 
                {
                    $scope.loading   = true;
                    $timeout(function()
                    {
                        $window.location.reload();
                    },10000);
                }
                else
                {
                    $scope.loading   = false;
                }
            });  
        }      
    });

    $scope.detailjadwalkunjungan = function(customer)
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Tidak Bisa Lagi Check In");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Belum Bisa Check In");
        }
        else if(tanggalplan == tanggalsekarang)
        {
            if(absen)
            {
                if(absen.AbsenKeluar == 0)
                {
                    if(customer.CHECK_OUT == 1 || customer.CHECK_OUT == "1")
                    {
                        alert("Kamu Sudah Check Out");
                    }
                    else
                    {
                        var lanjutcheckin = confirm("Yakin Check In Di Customer " + customer.CUST_NM +"?");
                        if (lanjutcheckin == true) 
                        {
                            if($window.localStorage.getItem('LocalStorageChekIn'))
                            {
                                var LocalStorageChekIn = JSON.parse($window.localStorage.getItem('LocalStorageChekIn'));
                                if(LocalStorageChekIn.iddetailkunjungan != customer.ID)
                                {
                                    alert("Dilarang Double Check In");
                                }
                                else
                                {
                                    $location.path('/detailjadwalkunjungan/'+ customer.ID);
                                }
                            }
                            else
                            {
                                if($scope.masihcheckinid != null)
                                {
                                    if($scope.masihcheckinid == customer.ID)
                                    {
                                        $location.path('/detailjadwalkunjungan/'+ customer.ID);
                                    }
                                    else
                                    {
                                        alert("Double Checkin Dilarang");
                                    } 
                                }
                                else
                                {
                                    $location.path('/detailjadwalkunjungan/'+ customer.ID);
                                }    
                            } 
                        }  
                    }
                }
                else if(absen.AbsenKeluar == 1)
                {
                    alert("Sudah Absen Keluar");
                }  
            }         
        }
    } 

    $scope.summaryall = function()
    {
        $scope.loading = true;
        JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
        .then(function(data)
        {
            var idgroupcustomer         = data.SCDL_GROUP;
            SummaryService.datasummaryall(idsalesman,tanggalplan,idgroupcustomer)
            .then(function (result) 
            {
                $scope.siteres      = result.siteres;

                console.log($scope.siteres);
                $scope.totalalls    = result.totalalls;
                $scope.loading  = false;
            }, 
            function (err) 
            {          
                console.log(err);
            });
        });
    };

    $scope.lastvisitsummary = function()
    {
        $scope.loading = true;
        JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
        .then(function(data)
        {
            var idgroupcustomer         = data.SCDL_GROUP;
            LastVisitService.LastVisitSummaryAll(tanggalplan,idgroupcustomer)
            .then(function (result) 
            {
                $scope.sitereslv          = result.siteres;
                $scope.totalallslv        = result.totalalls;
                $scope.datapengunjung   = result.pengunjung;
                console.log($scope.datapengunjung);
                $scope.loading  = false;
            }, 
            function (err) 
            {          
                $scope.loading  = false;
            });
        });
    };
 
}]);
