//http://localhost/radumta_folder/production/crmprod/#/agenda/2016-04-08
//angular/partial/salesman/agenda.html
myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http","auth","$window","SummaryService","NgMap","LocationService","$filter","sweet","$routeParams","$timeout","JadwalKunjunganService","singleapiService","resolvegpslocation","configurationService","AbsensiService",
function ($rootScope,$scope, $location, $http,auth,$window,SummaryService,NgMap,LocationService,$filter,sweet,$routeParams,$timeout,JadwalKunjunganService,singleapiService,resolvegpslocation,configurationService,AbsensiService)
{
    $scope.userInfo = auth;
    var idtanggal = idtanggal;
    $scope.loading  = true;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var tanggalplanx = $rootScope.tanggalharini;
    AbsensiService.getAbsensi(auth,tanggalplanx)
    .then (function (response)
    {
        if(response.length == 0)
        {
            //alert("Tolong Lakukan Absensi Terlebih Dahulu");
            sweetAlert("Oops...", "Tolong Lakukan Absensi Terlebih Dahulu!", "error");

            $location.path('/absensi');
        }
    });
    $scope.data = 
    {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };

    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalplan     = $routeParams.idtanggal;
    $scope.detailjadwalkunjungan = function(customer)
    {
        if(tanggalplan < tanggalsekarang)
        {
            //alert("Wrong Time To Check In This Customer");
            sweetAlert("Oops...", "Wrong Time To Check In This Customer!", "error");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            //alert("Wait For The Right Time To Check In This Customer");
            sweetAlert("Oops...", "Wait For The Right Time To Check In This Customer!", "error");
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
                        //alert("You Have Check Out From This Customer.");
                        sweetAlert("Oops...", "You Have Check Out From This Customer!", "error");
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
                                    //alert("Di Luar Radius");
                                    sweetAlert("Oops...", "Out Of Ranges!", "error");
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
                    //alert("Kamu Sudah Absen Keluar.");
                    sweetAlert("Oops...", "Kamu Sudah Absen Keluar!", "error");
                }
            }
            else
            {
                alert("Anda Melakukan Tindakan Yang Melanggar Hukum");
            }   
        }
    } 

    if(tanggalsekarang == tanggalplan)
    {
        $scope.activeagendatoday = "active";
    }
    else
    {
        $scope.activehistory = "active";
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
            $scope.loading  = false;
            sweet.show({
                title: 'Confirm',
                text: 'Cheers...Kamu Belum Memiliki Agenda Untuk Saat Ini',
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yeah. I Like This!',
                closeOnConfirm: true,
                closeOnCancel: true
            }, 
            function(isConfirm) 
            {
                if (isConfirm) 
                {
                    $location.path('/history');
                    $scope.$apply();
                }
            });
        }
        else
        {
            var idgroupcustomer         = data.JadwalKunjungan[0].SCDL_GROUP;
            JadwalKunjunganService.GetSingleDetailKunjunganProsedur(idsalesman,idgroupcustomer,idtanggal)
            .then(function (result) 
            {
                $scope.customers = result;
                // if($window.localStorage.getItem('my-storage'))
                // {
                //     var xxx = JSON.parse($window.localStorage.getItem('my-storage'));
                //     $scope.storageiddetailkunjungan = xxx.iddetailkunjungan;
                // }
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
                $scope.totalalls    = result.totalalls;
                $scope.loading  = false;
            }, 
            function (err) 
            {          
                console.log(err);
            });
        });
    };    
}]);

