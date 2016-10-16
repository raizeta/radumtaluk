'use strict';
myAppModule.controller("ActionController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$cordovaGeolocation,$cordovaCamera,LocationFac,CameraService) 
{   
    $scope.activehome = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

	

    $scope.zoomvalue = 10;
    var watchOptions    = {timeout :1000,enableHighAccuracy: false};
    var watch           = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(null,function(err) 
    {
        console.log(err);
    },
    function(position) 
    {
        var gpslat                  = position.coords.latitude;
        var gpslong                 = position.coords.longitude;
        $scope.googlemaplat         = gpslat;
        $scope.googlemaplong        = gpslong;
        console.log(gpslat + " " + gpslong);
    });

    $scope.checkin = function()
    {
        var checkintime         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        var detail = {};
        detail.LAT              = $scope.googlemaplat;
        detail.LAG              = $scope.googlemaplong;
        detail.RADIUS           = jarak;
        detail.CHECKIN_TIME     = checkintime;
        detail.CREATE_BY        = auth.id;
        detail.CREATE_AT        = checkintime;
        detail.STATUS           = 1;

        CheckInService.setCheckinAction(ID_DETAIL,detail)
        .then(function(data)
        {
            ngToast.create('Anda Berhasil Check In');
        },
        function (error)
        {
            console.log("Check In Error");
        });           
    };
    $scope.starttakeapicture = function()
    {
        document.addEventListener("deviceready", function () 
        {
            alert();
            var options = CameraService.GetCameraOption();
            $cordovaCamera.getPicture(options)
            .then(function (imageData) 
            {
                $scope.loadingcontent               = true;
                var timeimagestart                  = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                
                var gambarkunjungan={};
                gambarkunjungan.ID_DETAIL           = ID_DETAIL;
                gambarkunjungan.IMG_NM_START        = "gambar start";
                gambarkunjungan.IMG_DECODE_START    = imageData;
                gambarkunjungan.TIME_START          = timeimagestart;
                gambarkunjungan.STATUS              = 1;
                gambarkunjungan.CREATE_BY           = auth.id;
                gambarkunjungan.CUSTOMER_ID         = resolveagendabyidserver.CUST_ID;

                GambarService.setGambarAction(ID_DETAIL,gambarkunjungan)
                .then(function (data)
                {
                    ngToast.create('Gambar Telah Berhasil Di Update'); 
                }, 
                function(err) 
                {
                    console.log(err);
                })
                .finally(function()
                {
                    $scope.loadingcontent = false;
                });
            });
        },false);
    }
});



