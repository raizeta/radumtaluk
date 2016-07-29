//http://localhost/radumta_folder/production/crmprod/#/agenda/2016-04-08
//angular/partial/salesman/agenda.html
myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http","auth","$window","SummaryService","NgMap","LocationService","$filter","sweet","$routeParams","$timeout","JadwalKunjunganService","singleapiService","resolvegpslocation","configurationService","AbsensiService","LastVisitService",
function ($rootScope,$scope, $location, $http,auth,$window,SummaryService,NgMap,LocationService,$filter,sweet,$routeParams,$timeout,JadwalKunjunganService,singleapiService,resolvegpslocation,configurationService,AbsensiService,LastVisitService)
{
    $scope.userInfo = auth;
    $scope.loading  = true;

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

    $scope.agendafunction = function ()
    {
        $scope.detailjadwalkunjungan = function(customer)
        {
            if(tanggalplan < tanggalsekarang)
            {
                alert("Tidak Bisa Lagi Check In");
                //sweetAlert("Oops...", "Wrong Time To Check In This Customer!", "error");
            }
            else if(tanggalplan > tanggalsekarang)
            {
                alert("Belum Bisa Check In");
                //sweetAlert("Oops...", "Wait For The Right Time To Check In This Customer!", "error");
            }
            else if(tanggalplan == tanggalsekarang)
            {
                if($window.localStorage.getItem('my-absen'))
                {
                    var xxx = JSON.parse($window.localStorage.getItem('my-absen'));
                    var absensimasuk = xxx.absensimasuk;
                    if(absensimasuk == 1)
                    {
                        if(customer.CHECKOUT == 1)
                        {
                            alert("Kamu Sudah Check Out");
                            //sweetAlert("Oops...", "Kamu Sudah Check Out!", "error");
                        }
                        else
                        {
                            var detailkunjunganid = customer.ID;
                            singleapiService.singledetailkunjunganbyiddetail(detailkunjunganid)
                            .then (function (response)
                            {
                                var custlat  = response.DetailKunjungan[0].MAP_LAT;
                                var custlong = response.DetailKunjungan[0].MAP_LNG;

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
                                        // sweetAlert("Oops...", "Di Luar Radius!", "error");
                                    }
                                    else
                                    {
                                        $location.path('/detailjadwalkunjungan/'+ detailkunjunganid);
                                    }
                                });  
                            });  
                        }
                    }
                    else if(absensimasuk == 0)
                    {
                        alert("Kamu Sudah Absen Keluar.");
                        // sweetAlert("Oops...", "Kamu Sudah Absen Keluar!", "error");
                    }
                }
                else
                {
                    alert("Tidak Diijinkan. Reason Unknown");
                }   
            }
        } 

        
        var idtanggal = $routeParams.idtanggal;

        $scope.viewtanggal = idtanggal;
        var idsalesman = auth.id;

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
                JadwalKunjunganService.GetSingleDetailKunjunganProsedur(idsalesman,idgroupcustomer,idtanggal)
                .then(function (result) 
                {
                    $scope.customers = result;
                    $scope.loading   = false;
                });  
            }      
        });

        $scope.summaryall = function()
        {
            $scope.loading = true;
            JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
            .then(function(data)
            {
                var idgroupcustomer         = data.JadwalKunjungan[0].SCDL_GROUP;
                SummaryService.datasummaryall(idsalesman,idtanggal,idgroupcustomer)
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
                LastVisitService.LastVisitSummaryAll(idtanggal,idgroupcustomer)
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
                    console.log(err);
                    $scope.loading  = false;
                });
                $scope.loading  = false;
            });
        };
    }

    if($window.localStorage.getItem('my-absen'))
    {
        var resultabsen     = JSON.parse($window.localStorage.getItem('my-absen'));
        var absensimasuk    = resultabsen.absensimasuk;
        var absensitgl      = resultabsen.absensitgl;
        var absensiuser     = resultabsen.absensiuser;
        if(absensitgl != tanggalsekarang || absensiuser != auth.username)
        {
            $window.localStorage.removeItem('my-absen');
            alert("Tolong Lakukan Absensi Terlebih Dahulu");
            $location.path('/absensi');
        }
        else
        {
            $scope.agendafunction();
        }
    }
    
    else
    {
        
        AbsensiService.getAbsensi(auth,tanggalsekarang)
        .then (function (response)
        {
            if(response.length == 0)
            {
                alert("Tolong Lakukan Absensi Terlebih Dahulu");
                $location.path('/absensi');
            }
            else
            {
                var resultabsen = response.Salesmanabsensi[0];
                if(resultabsen.STATUS == 0)
                {
                    var absensimasuk = {};
                    absensimasuk.absensimasuk   = 1;
                    absensimasuk.absensitgl     = tanggalsekarang;
                    absensimasuk.absensiid      = resultabsen.ID;
                    absensimasuk.absensiuser    = resultabsen.USER_NM;
                    var absensimasuk = JSON.stringify(absensimasuk);
                    $window.localStorage.setItem('my-absen', absensimasuk);

                    $scope.agendafunction();
                }
                else
                {
                    var absensimasuk = {};
                    absensimasuk.absensimasuk   = 0;
                    absensimasuk.absensitgl     = tanggalsekarang;
                    absensimasuk.absensiid      = resultabsen.ID;
                    absensimasuk.absensiuser    = resultabsen.USER_NM;
                    var absensimasuk = JSON.stringify(absensimasuk);
                    $window.localStorage.setItem('my-absen', absensimasuk);
                    
                    $scope.agendafunction(); 
                }  
            }
        });
    }
    
}]);

