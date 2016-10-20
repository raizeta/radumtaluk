'use strict';
myAppModule.controller("ActionController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$cordovaGeolocation,$cordovaCamera,sweet,ngToast,LocationFac,CameraService,productcomb,activitascom,StorageService,ActivitasProductService,GambarFac,CheckInFac,CheckOutFac) 
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
        alert(err.message);
    },
    function(position) 
    {
        var gpslat                  = position.coords.latitude;
        var gpslong                 = position.coords.longitude;
        $scope.googlemaplat         = gpslat;
        $scope.googlemaplong        = gpslong;
        console.log(gpslat + " " + gpslong);
    });


    var currentagenda                   = StorageService.get('currentagenda');
    var ID_DETAIL                       = currentagenda.ID;
    var DEFAULT_CUST_LONG               = currentagenda.MAP_LNG;      //Posisi Actual Customer Dari Master
    var DEFAULT_CUST_LAT                = currentagenda.MAP_LAT;      //Posisi Actual Customer Dari Master
    var PLAN_TGL_KUNJUNGAN              = currentagenda.TGL;
    var CUST_ID                         = currentagenda.CUST_ID;
    var ID_GROUP                        = currentagenda.SCDL_GROUP;
    $scope.namacustomerdiview           = currentagenda.CUST_NM;

    $scope.salesaktivitas = ActivitasProductService.ActivitasProduct(activitascom,productcomb);

    $scope.checkstatusgambarstartendexpired = function()
    {
        if (currentagenda) 
        {
            var startpicturestatus          = currentagenda.STSSTART_PIC;
            var endpicturestatus            = currentagenda.STSEND_PIC;
            var inventoryexpiredstatus      = currentagenda.STSINVENTORY_EXPIRED;

            $scope.statusstartpicture       = ActivitasProductService.CekStatus(startpicturestatus);
            $scope.statusendpicture         = ActivitasProductService.CekStatus(endpicturestatus);
            $scope.statusbarangexpired      = ActivitasProductService.CekStatus(inventoryexpiredstatus);
        }
    }
    $scope.checkstatusgambarstartendexpired();

    $scope.checkin = function()
    {
        var datacheckin             = {};
        datacheckin.LAT             = $scope.googlemaplat;
        datacheckin.LAG             = $scope.googlemaplong;
        datacheckin.RADIUS          = null; //Hitung Radius Dua Titik GPS
        datacheckin.CHECKIN_TIME    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        datacheckin.CREATE_BY       = auth.id;
        datacheckin.CREATE_AT       = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        datacheckin.STATUS          = 1;

        CheckInFac.SetCheckinAction(ID_DETAIL,datacheckin)
        .then(function(data)
        {
            ngToast.create('Anda Berhasil Check In');
        },
        function (error)
        {
            console.log("Check In Error");
        });           
    };
    $scope.checkin();

    $scope.starttakeapicture = function()
    {
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
            gambarkunjungan.CREATE_AT           = timeimagestart;
            gambarkunjungan.CUSTOMER_ID         = CUST_ID;

            GambarFac.setGambarAction(ID_DETAIL,gambarkunjungan)
            .then(function (data)
            {
                ngToast.create('Gambar Telah Berhasil Di Update');
                var statusstartpicture              = {};
                statusstartpicture.bgcolor          = "bg-green";
                statusstartpicture.icon             = "fa fa-check bg-green";
                $scope.statusstartpicture = statusstartpicture; 
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
    }

    $scope.updateinventoryqty = function(parentindex,barang,index,idinventorys)
    {
        var idinventory = idinventorys.SO_ID;
        var titledialog = idinventorys.DIALOG_TITLE;
        var sotype      = idinventorys.ID;
        
        var namaproduct = barang.NM_BARANG;
        sweet.show(
        {
            title: titledialog,
            text: namaproduct,
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: true,
            animation: false,
            inputPlaceholder: 'Quantity/PCS'
        }, 
        function(inputValue) 
        {
            if(/^\d+$/.test(inputValue))
            {
                
            }
            else
            {
                var bukannumber = false;
            }

            if (inputValue === false)
            {
                return false;
            }

            if ( (inputValue === '') || (bukannumber === false ) )
            {
                sweet.showInputError('Ini Harus Diisi Dan Harus Angka!');
                return false;
            }
            
            else
            {
                $scope.salesaktivitas[parentindex].products.splice(index, 1);
                if($scope.salesaktivitas[parentindex].products.length == 0)
                {
                    var status={};
                    status.bgcolor="bg-green";
                    status.icon="fa fa-check bg-green";
                    status.show = false;

                    $scope.salesaktivitas[parentindex].status = status
                }
                $scope.$apply();
            }
        });
    }
    $scope.endtakeapicture = function()
    {
        document.addEventListener("deviceready", function () 
        {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };
              
            $cordovaCamera.getPicture(options)
            .then(function(imageData) 
            {
                $scope.loadingcontent = true;
                var timeimageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');


                var gambarkunjungan={};
                gambarkunjungan.IMG_NM_END      = "gambar end";
                gambarkunjungan.IMG_DECODE_END  = imageData;
                gambarkunjungan.TIME_END        = timeimageend;
                gambarkunjungan.ID_DETAIL       = ID_DETAIL;
                gambarkunjungan.UPDATE_BY       = auth.id;

                GambarFac.setEndGambarAction(ID_DETAIL,gambarkunjungan)
                .then(function (data)
                {
                    ngToast.create('Gambar Telah Berhasil Di Update');
                    var statusendpicture                = {};
                    statusendpicture.bgcolor            = "bg-green";
                    statusendpicture.icon               = "fa fa-check bg-green";
                    $scope.statusendpicture             = statusendpicture;
                }, 
                function (error) 
                {
                    console.log("Gagal Menyimpan Gagal Check Ke Database Local");
                })
                .finally(function()
                {
                    $scope.loadingcontent = false;
                }); 
            });
        }, false);
    }
    $scope.checkout = function()
    {
        sweet.show({
            title: 'Checkout',
            text: 'Apakah Kamu Yakin Untuk Checkout?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            closeOnConfirm: true
        }, 
        function() 
        {
            $scope.loadingcontent = true;
            var datacheckout={};
            datacheckout.CHECKOUT_LAT              = $scope.googlemaplat;
            datacheckout.CHECKOUT_LAG              = $scope.googlemaplong;
            datacheckout.CHECKOUT_TIME             = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            datacheckout.UPDATE_BY                 = auth.id;

            CheckOutFac.SetCheckoutAction(ID_DETAIL,datacheckout)
            .then(function(data)
            {
                sweet.show({
                                title: 'Success!',
                                text: 'Kamu Berhasil Checkout',
                                timer: 1000,
                                showConfirmButton: false
                            });
                $timeout(function()
                {
                    $location.path('/agenda/'+ PLAN_TGL_KUNJUNGAN)
                },1000);
            },
            function (error)
            {
                alert("Update Check Out Server Gagal.Try Again");
            })
            .finally(function()
            {
               $scope.loadingcontent = false; 
            }); 
        });
    }
    
});



