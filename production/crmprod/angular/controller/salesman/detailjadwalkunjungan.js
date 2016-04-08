//http://localhost/radumta_folder/production/crmprod/#/detailjadwalkunjungan/212
//angular/partial/salesman/detailcustomer.html
myAppModule.controller("DetailJadwalKunjunganController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService","ngToast","$mdDialog","$filter","sweet",
function ($rootScope,$scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService,ngToast,$mdDialog,$filter,sweet) 
{
    var iddetail = $routeParams.iddetailkunjungan;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    var url = $rootScope.linkurl;

    var idsalesman  = auth.id;

    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalinventory = $filter('date')(new Date(),'yyyy-MM-dd');

    $scope.loading = true;
    $scope.zoomvalue = 17;
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.loading = false;

        $scope.googlemaplat = data.latitude;    //get from gps
        $scope.googlemaplong = data.longitude;  //get from gps
        console.log($scope.googlemaplat);
        singleapiService.singledetailkunjunganbyiddetail(iddetail)
        .then(function (result) 
        {
            $scope.detailcustomers = result.DetailKunjungan[0];

            var ID_DETAIL = result.DetailKunjungan[0].ID;
            var DEFAULT_CUST_LONG = result.DetailKunjungan[0].MAP_LNG;
            var DEFAULT_CUST_LAT  = result.DetailKunjungan[0].MAP_LAT;

            var datasatu = $.ajax
            ({
                  //url: "http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + ab.ID + "&IMG_NM=gambar start",
                  url: url + "/gambarkunjungans/search?ID_DETAIL=" + ID_DETAIL + "&IMG_NM_START=gambar start",
                  type: "GET",
                  dataType:"json",
                  async: false
            });

            if(datasatu.status == "404")
            {
                $rootScope.hasilstart = 0;
            }
            if(datasatu.status == "200")
            {
                $rootScope.hasilstart = 1;
            }
            console.log($rootScope.hasilstart);
        });

    });

}]);