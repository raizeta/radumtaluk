//http://localhost/radumta_folder/production/crmprod/#/agenda/2016-04-08
//angular/partial/salesman/agenda.html
myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig","$routeParams","resolvegpslocation","resolvelistagenda","$timeout",
function ($rootScope,$scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig,$routeParams,resolvegpslocation,resolvelistagenda,$timeout) 
{
    $scope.userInfo = auth;
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

    var idtanggal = $routeParams.idtanggal;

    $scope.viewtanggal = idtanggal;
    var idsalesman = auth.id;

    var geocoder = new google.maps.Geocoder;
    $scope.lat  = resolvegpslocation.latitude;
    $scope.long = resolvegpslocation.longitude;

    var idtanggal = idtanggal;
    $scope.loading  = true;

    var resultresolvelistagenda = resolvelistagenda.JadwalKunjungan;
    // if(resultresolvelistagenda)
    // {
    //     var idgroupcustomer         = resultresolvelistagenda[0].SCDL_GROUP;
    //     singleapiService.singledetailkunjungan(idsalesman,idgroupcustomer,idtanggal,resolvegpslocation)
    //     .then(function (result) 
    //     {
    //         $scope.customers = result;
    //     });
        
    //     var panggildatasummary = function()
    //     {
    //         apiService.datasummaryall(idsalesman,idtanggal,idgroupcustomer)
    //         .then(function (result) 
    //         {
    //             console.log(result);
    //             $scope.siteres      = result.siteres;
    //             $scope.totalalls    = result.totalalls;
    //             $scope.loading  = false;
    //         }, 
    //         function (err) 
    //         {          
    //             // $timeout(panggildatasummary, 10000);
    //             console.log(err);
    //         }); 
    //     }
    //     $timeout(panggildatasummary, 1000);
        
    // }

    //##########################Stored Procedure Function ####################################################
    if(resultresolvelistagenda)
    {
        var idgroupcustomer         = resultresolvelistagenda[0].SCDL_GROUP;
        singleapiService.singledetailkunjunganprosedur(idsalesman,idgroupcustomer,idtanggal,resolvegpslocation)
        .then(function (result) 
        {
            $scope.customers = result;
        });
        
        var panggildatasummary = function()
        {
            apiService.datasummaryall(idsalesman,idtanggal,idgroupcustomer)
            .then(function (result) 
            {
                $scope.siteres      = result.siteres;
                $scope.totalalls    = result.totalalls;
                $scope.loading  = false;
            }, 
            function (err) 
            {          
                // $timeout(panggildatasummary, 10000);
                console.log(err);
            }); 
        }
        $timeout(panggildatasummary, 1000);    
    }
    else
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
}]);

