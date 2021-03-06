myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http","auth","$window","SummaryService","NgMap","LocationService","$filter","sweet","$routeParams","$timeout","JadwalKunjunganService","singleapiService","configurationService","LastVisitService","CheckInService",
function ($rootScope,$scope, $location, $http,auth,$window,SummaryService,NgMap,LocationService,$filter,sweet,$routeParams,$timeout,JadwalKunjunganService,singleapiService,configurationService,LastVisitService,CheckInService)
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
        console.log(result);
        if(result.length == 0)
        {
            $scope.masihcheckinid =  null; 
        }
        else
        {
            $scope.masihcheckinid =  result.ID_DETAIL;
        }
    });
    

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

            if(customer.CHECK_OUT == 1 || customer.CHECK_OUT == "1")
            {
                alert("Kamu Sudah Check Out");
            }
            else
            {
                var lanjutcheckin = confirm("Yakin Check In Di Customer " + customer.CUST_NM +"?");
                if (lanjutcheckin == true) 
                {
                    $location.path('/detailjadwalkunjungan/' + customer.ID)
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
