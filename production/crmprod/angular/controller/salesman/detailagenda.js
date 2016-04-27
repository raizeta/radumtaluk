//http://localhost/radumta_folder/production/crmprod/#/agenda/2016-04-08
//angular/partial/salesman/agenda.html
myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http","auth","$window","SummaryService","NgMap","LocationService","$filter","sweet","$routeParams","$timeout","JadwalKunjunganService",
function ($rootScope,$scope, $location, $http,auth,$window,SummaryService,NgMap,LocationService,$filter,sweet,$routeParams,$timeout,JadwalKunjunganService) 
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
    $scope.data = 
    {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    
    

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
                console.log($scope.customers);
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

