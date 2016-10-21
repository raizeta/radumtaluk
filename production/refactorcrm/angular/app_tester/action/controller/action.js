'use strict';
myAppModule.controller("ActionController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,$cordovaGeolocation,$cordovaSQLite,$cordovaCamera,sweet,ngToast,LocationFac,CameraService,productcomb,activitascom,StorageService,ActivitasProductService,GambarFac,CheckInFac,CheckinSqliteFac,CheckOutFac,ActionMemoFac,PhtoSqliteFac) 
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
    var watchOptions    = {timeout :10000,enableHighAccuracy: false};
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

    $scope.checkin = function(ID_DETAIL)
    {
        var datacheckin             = {};
        datacheckin.LAT             = $scope.googlemaplat;
        datacheckin.LAG             = $scope.googlemaplong;
        datacheckin.RADIUS          = null; //Hitung Radius Dua Titik GPS
        datacheckin.CHECKIN_TIME    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        datacheckin.CREATE_BY       = auth.id;
        datacheckin.CREATE_AT       = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        datacheckin.STATUS          = 1;
        datacheckin.ID              = ID_DETAIL;

        CheckInFac.SetCheckinAction(datacheckin)
        .then(function(data)
        {
            ngToast.create('Anda Berhasil Check In');
        },
        function (error)
        {
            alert("Check In Error.Try Again");
        });

        CheckinSqliteFac.SetCheckin(datacheckin)
        .then(function(response)
        {
            console.log("Check In Berhasil Disimpan Di Local");
        },
        function(error)
        {
            console.log(error);
        });
      
    };
    $scope.checkin(ID_DETAIL);

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
            PhtoSqliteFac.SetPhotoStart(ID_DETAIL)
            .then(function(responselocal)
            {
                console.log("Status Photo Start Berhasil Disimpan Di Local");
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
        var options = CameraService.GetCameraOption();
        $cordovaCamera.getPicture(options)
        .then(function(imageData) 
        {
            $scope.loadingcontent = true;

            var gambarkunjungan={};
            gambarkunjungan.IMG_NM_END      = "gambar end";
            gambarkunjungan.IMG_DECODE_END  = imageData;
            gambarkunjungan.TIME_END        = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
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

            PhtoSqliteFac.SetPhotoEnd(ID_DETAIL)
            .then(function(responselocal)
            {
                console.log("Status Photo End Berhasil Disimpan Di Local");
            }); 
        });
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
            datacheckout.ID                        = ID_DETAIL;
            CheckOutFac.SetCheckoutAction(datacheckout)
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
            CheckinSqliteFac.SetCheckout(datacheckout)
            .then(function(responselocal)
            {
                console.log("Checkout Berhasil Disimpan Di Local");
            }); 
        });
    }
    $scope.getsalesmemo = function(ID_DETAIL)
    {
        ActionMemoFac.GetMemo(ID_DETAIL)
        .then (function (responsesalesmemo)
        {
            if(angular.isArray(responsesalesmemo))
            {
                $scope.messageskunjungandisabled = false;
                var statusaction={};
                statusaction.bgcolor="bg-aqua";
                statusaction.icon="fa fa-close bg-aqua";
                statusaction.show = false;
                $scope.statusmessageskunjungan  = statusaction;
            }
            else
            {
                $scope.salesmanmemo                 = responsesalesmemo;
                $scope.statusmessageskunjungan      = responsesalesmemo;
                $scope.messageskunjungandisabled    = responsesalesmemo.messageskunjungandisabled;
            }
        },
        function (error)
        {
            console.log("Error Mendapatkan Sales Memo Dari Server");
            $scope.messageskunjungandisabled = false;
        });        
    }
    $scope.getsalesmemo(ID_DETAIL);

    $scope.submitFormSalesMemo = function(formsalesmanmemo)
    {
        $scope.loadingcontent           = true;

        var salesmanmemo = {};
        salesmanmemo.ID_DETAIL          = currentagenda.ID;
        salesmanmemo.KD_CUSTOMER        = currentagenda.CUST_ID;
        salesmanmemo.NM_CUSTOMER        = currentagenda.CUST_NM;
        salesmanmemo.TGL                = $filter('date')(new Date(),'yyyy-MM-dd');

        salesmanmemo.ISI_MESSAGES       = formsalesmanmemo.ISI_MESSAGES
        salesmanmemo.ID_USER            = auth.id;
        salesmanmemo.NM_USER            = auth.username;
        salesmanmemo.STATUS_MESSAGES    = "URGENT";
        salesmanmemo.CREATE_AT          = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        salesmanmemo.CREATE_BY          = auth.id;

        ActionMemoFac.SetMemo(salesmanmemo)
        .then (function (responsesalesmemo)
        {
            $scope.statusmessageskunjungan      = responsesalesmemo;
            $scope.messageskunjungandisabled    = responsesalesmemo.messageskunjungandisabled;
            ngToast.create('Memo Kunjungan Berhasil Di Save');
        },
        function (error)
        {
            alert("Memo Status Kunjungan Gagal Di Save Di Server");
        })
        .finally(function()
        {
            $scope.loadingcontent = false;
        });
    }

    ExpiredSqliteServices.getSqliteExpired(ID_DETAIL)
    .then (function (databarangexpired)
    {
        var arrayobjectdatabarang = resolveobjectbarangsqlite;
        var arrayhanyakodebarang = [];

        angular.forEach(arrayobjectdatabarang, function(value, key)
        {
            arrayhanyakodebarang.push(value.KD_BARANG);
        });

        var x           = $rootScope.diffbarang(arrayhanyakodebarang,databarangexpired);

        $scope.barangexpired   = [];

        angular.forEach(x, function(value, key)
        {
            var existingFilter = _.findWhere(arrayobjectdatabarang, { KD_BARANG: value.KD_BARANG });
            $scope.barangexpired.push(existingFilter);
        });
    });
    
});



