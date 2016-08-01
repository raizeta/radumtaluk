myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http","auth","$window","SummaryService","NgMap","LocationService","$filter","sweet","$routeParams","$timeout","JadwalKunjunganService","singleapiService","configurationService","AbsensiService","LastVisitService","CheckInService","resolvegpslocation","resolveabsensi",
function ($rootScope,$scope, $location, $http,auth,$window,SummaryService,NgMap,LocationService,$filter,sweet,$routeParams,$timeout,JadwalKunjunganService,singleapiService,configurationService,AbsensiService,LastVisitService,CheckInService,resolvegpslocation,resolveabsensi)
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
    $scope.viewtanggal = tanggalplan;

    if(tanggalsekarang == tanggalplan)
    {
        $scope.activeagendatoday = "active";
    }
    else
    {
        $scope.activehistory = "active";
    }


    if(resolveabsensi.length == 0)
    {
        alert("Tolong Lakukan Absensi Terlebih Dahulu");
        $location.path('/absensi');
    }
    else
    {
        var geocoder = new google.maps.Geocoder;
        LocationService.GetGpsLocation()
        .then(function(data)
        {
            $scope.gpslat   = data.latitude;
            $scope.gpslong  = data.longitude;
        });

        JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
        .then(function(data)
        {
            if(data.length == 0)
            {
                alert("Belum Ada Jadwal Hari Ini");
                $location.path('/history');
            }
            else
            {
                var idgroupcustomer         = data.JadwalKunjungan[0].SCDL_GROUP;
                JadwalKunjunganService.GetSingleDetailKunjunganProsedur(idsalesman,idgroupcustomer,tanggalplan)
                .then(function (result) 
                {
                    $scope.customers = result;
                    $scope.loading   = false;
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

                var resultabsen = resolveabsensi.Salesmanabsensi[0];
                if(resultabsen.STATUS == 0)
                {
                    if(customer.CHECKOUT == 1)
                    {
                        alert("Kamu Sudah Check Out");
                    }
                    else
                    {
                        var lanjutcheckin = confirm("Yakin Check In Di Customer?" + customer.CUST_NM);
                        if (lanjutcheckin == true) 
                        {
                            var detailkunjunganid = customer.ID;
                            singleapiService.singledetailkunjunganbyiddetail(detailkunjunganid)
                            .then (function (response)
                            {
                                var custlat  = response.DetailKunjungan[0].MAP_LAT;
                                var custlong = response.DetailKunjungan[0].MAP_LNG;

                                if(resolvegpslocation.statusgps == "EC:1")
                                {
                                    alert("GPS Tidak Hidup");
                                }
                                else if(resolvegpslocation.statusgps == "EC:2")
                                {
                                    alert("Lokasi Tidak Tersedia");
                                }
                                else if(resolvegpslocation.statusgps == "EC:3")
                                {
                                    alert("GPS Time OUt");
                                }
                                else if(resolvegpslocation.statusgps == "EC:3")
                                {
                                    alert("Masalah Unknown");
                                }

                                $scope.googlemaplat     = resolvegpslocation.latitude;    //get from gps
                                $scope.googlemaplong    = resolvegpslocation.longitude;

                                var longitude1     = $scope.googlemaplat;
                                var latitude1      = $scope.googlemaplong;

                                var longitude2     = custlat;
                                var latitude2      = custlong;

                                var jarak = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);
                                configurationService.getConfigRadius()
                                .then(function (response) 
                                {
                                    var configjarak = response.Configuration[3].value;
                                    if(jarak > configjarak)
                                    {
                                        alert("Di Luar Radius");
                                    }
                                    else
                                    {
                                        CheckInService.getCheckinStatus(tanggalplan,idsalesman)
                                        .then(function (result) 
                                        {
                                            if(result.length != 0)
                                            {
                                                $scope.loading   = false;
                                                var IDDETAILSCDL = customer.ID;
                                                var IDDETAILSTS  = result.StatusKunjungan[0].ID_DETAIL;
                                                if(IDDETAILSCDL == IDDETAILSTS)
                                                {
                                                    $location.path('/detailjadwalkunjungan/'+ detailkunjunganid);
                                                }
                                                else
                                                {
                                                    alert("Double Check In Dilarang");
                                                }  
                                            }
                                            else
                                            {
                                                $location.path('/detailjadwalkunjungan/'+ detailkunjunganid);
                                            } 
                                        });
                                        
                                    }
                                },
                                function (err)
                                {
                                    alert("Configuration Radius Error");
                                });  
                            });
                        }  
                    }
                }
                else if(resultabsen.STATUS == 1)
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
            var idgroupcustomer         = data.JadwalKunjungan[0].SCDL_GROUP;
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
            var idgroupcustomer         = data.JadwalKunjungan[0].SCDL_GROUP;
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
