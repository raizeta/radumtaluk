//http://localhost/radumta_folder/production/crmprod/#/detailjadwalkunjungan/212
//angular/partial/salesman/detailcustomer.html
myAppModule.controller("DetailJadwalKunjunganController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService","ngToast","$mdDialog","$filter","sweet","ModalService","resolvesingledetailkunjunganbyiddetail","SummaryService","ProductService","resolvegpslocation","CheckInService","CheckOutService","InventoryService","JadwalKunjunganService","GambarService","ExpiredService","$timeout","configurationService","resolvedatabarangall","resolveconfigradius","LastVisitCustomerService","SalesAktifitas","$cordovaSQLite",
function ($rootScope,$scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService,ngToast,$mdDialog,$filter,sweet,ModalService,resolvesingledetailkunjunganbyiddetail,SummaryService,ProductService,resolvegpslocation,CheckInService,CheckOutService,InventoryService,JadwalKunjunganService,GambarService,ExpiredService,$timeout,configurationService,resolvedatabarangall,resolveconfigradius,LastVisitCustomerService,SalesAktifitas,$cordovaSQLite) 
{
    var sortedConfigRadius = _.sortBy( resolveconfigradius.Configuration, 'value' ).reverse();
    var configjarak = sortedConfigRadius[0].value;

    var statusaction={};
    statusaction.bgcolor="bg-aqua";
    statusaction.icon="fa fa-close bg-aqua";
    statusaction.show = false;

    $scope.statusbarangexpired      = statusaction;
    $scope.statusstartpicture       = statusaction;
    $scope.statusendpicture         = statusaction;
    $scope.statusmessageskunjungan  = statusaction;

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

    $scope.zoomvalue = 17;
    // var geocoder = new google.maps.Geocoder;    
    var y  = resolvesingledetailkunjunganbyiddetail.DetailKunjungan[0];

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
        alert("Unknown Reason");
    }

    $scope.googlemaplat     = resolvegpslocation.latitude;    //get from gps
    $scope.googlemaplong    = resolvegpslocation.longitude;  //get from gps

    $scope.CUST_MAP_LAT      = y.MAP_LAT;
    $scope.CUST_MAP_LNG      = y.MAP_LNG;
    $scope.blabla            = y.CUST_NM;

    var ID_DETAIL           = y.ID;
    var DEFAULT_CUST_LONG   = y.MAP_LNG;
    var DEFAULT_CUST_LAT    = y.MAP_LAT;
    var PLAN_TGL_KUNJUNGAN  = y.TGL;
    var CUST_ID             = y.CUST_ID;
    var ID_GROUP            = y.SCDL_GROUP;

    var longitude1     = $scope.googlemaplong;
    var latitude1      = $scope.googlemaplat;

    var longitude2     = DEFAULT_CUST_LONG;
    var latitude2      = DEFAULT_CUST_LAT;

    var jarak = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);

    //#####################################################################################################
    // CHECK-IN FUNCTION
    //#####################################################################################################
    $scope.checkin = function()
    {
        var detail = {};
        var checkintime         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.LAT              = $scope.googlemaplat;
        detail.LAG              = $scope.googlemaplong;
        detail.RADIUS           = jarak;
        detail.CHECKIN_TIME     = checkintime;
        detail.CREATE_BY        = idsalesman;
        detail.CREATE_AT        = checkintime;
        detail.STATUS           = 1;

        CheckInService.setCheckinAction(ID_DETAIL,detail)
        .then(function(data)
        {
            ngToast.create('Anda Berhasil Check In');
            
            var statuskunjungan = {};
            statuskunjungan.ID_DETAIL               = ID_DETAIL;
            statuskunjungan.TGL                     = PLAN_TGL_KUNJUNGAN;
            statuskunjungan.USER_ID                 = idsalesman;
            statuskunjungan.CUST_ID                 = CUST_ID;
            statuskunjungan.CHECK_IN                = 1;

            CheckInService.updateCheckinStatus(ID_DETAIL,statuskunjungan)
            .then(function(data)
            {
                $scope.idstatuskunjunganresponse;
                if(data.StatusAda == "SudahAda")
                {
                   $scope.idstatuskunjunganresponse = data.StatusKunjungan[0].ID; 
                }
                else if(data.StatusAda == "BelumAda")
                {
                   $scope.idstatuskunjunganresponse = data.ID; 
                }
            },
            function (error)
            {
                alert("Gagal Update Status Check In Ke Server");
            });

            var updateCHECKIN_TIME  = checkintime;
            var updateCHECK_IN      = 1;
            var updateLAG           = $scope.googlemaplong;
            var updateLAT           = $scope.googlemaplat;

            var queryupdateagenda = 'UPDATE Agenda SET CHECKIN_TIME = ?, CHECK_IN = ?, LAG = ?, LAT = ? WHERE ID_SERVER = ?';
            $cordovaSQLite.execute($rootScope.db, queryupdateagenda, [updateCHECKIN_TIME,updateCHECK_IN,updateLAG,updateLAT,ID_DETAIL])
            .then(function(result) 
            {
                alert("Terimakasih. Agenda Check In Berhasil Di Update Di Local");
            },
            function(error) 
            {
                alert("Update Agenda Check In Gagal Di Update Di Local: " + error.message);
            });
        },
        function (error)
        {
            alert("Gagal Set Check In Ke Server");
        });           
    };
    $scope.checkin();
    // ####################################################################################################
    // CHECK STATUS GAMBAR START GAMBAR END DENGAN PRODUCT EXPIRED
    // ####################################################################################################
    $scope.checkstatusgambarstartendexpired = function()
    {
        document.addEventListener("deviceready", function () 
        {
            var queryagendatoday = "SELECT * FROM Agenda WHERE ID_SERVER = ?";
            $cordovaSQLite.execute($rootScope.db, queryagendatoday, [iddetail])
            .then(function(result) 
            {
                if (result.rows.length > 0) 
                {
                    var startpicturestatus          = result.rows.item(0).START_PIC;
                    var endpicturestatus            = result.rows.item(0).END_PIC;
                    var inventoryexpiredstatus      = result.rows.item(0).INVENTORY_EXPIRED;

                    $scope.statusstartpicture   = $rootScope.cekstatusbarang(startpicturestatus);
                    $scope.statusendpicture     = $rootScope.cekstatusbarang(endpicturestatus);
                    $scope.statusbarangexpired  = $rootScope.cekstatusbarang(inventoryexpiredstatus);
                }
            },
            function(error) 
            {
                $scope.loadingcontent  = false;
                alert("Gagal Mendapatkan Data Dari Local Untuk Agenda Dengan ID_SERVER" + iddetail + ": " + error.message);
            });
        },false); 
    }
    $scope.checkstatusgambarstartendexpired();
    // ####################################################################################################
    // MENU ACTION
    // ####################################################################################################
    var url = $rootScope.linkurl;
    SalesAktifitas.getSalesAktifitas(CUST_ID,PLAN_TGL_KUNJUNGAN)
    .then (function(response)
    {
        console.log(response);
        $scope.salesaktivitas = response;
    },
    function (error)
    {
        alert("Sales Aktifitas Error");
    });
    
    // ####################################################################################################
    // INVENTORY FUNCTION
    //#####################################################################################################
    $scope.updateinventoryqty = function(parentindex,barang,index,idinventorys)
    {
        var idinventory = idinventorys.SO_ID;
        var titledialog = idinventorys.DIALOG_TITLE;
        var sotype      = idinventorys.ID;

        var jarak = $rootScope.jaraklokasi($scope.googlemaplong,$scope.googlemaplat,$scope.CUST_MAP_LNG,$scope.CUST_MAP_LAT);
        if(jarak > configjarak)
        {
            alert("Di Luar Radius.");
            // sweetAlert("Oops...", "Di Luar Radius!", "error");
        }
        else
        { 
            namaproduct = barang.NM_BARANG;
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
                    $scope.loadingcontent = true;
                    var detail={};
                    detail.SO_TYPE                  = sotype;
                    detail.TGL                      = PLAN_TGL_KUNJUNGAN;
                    detail.CUST_KD                  = CUST_ID;
                    detail.KD_BARANG                = barang.KD_BARANG;
                    detail.POS                      = 'ANDROID';
                    detail.USER_ID                  = idsalesman;
                    detail.SO_QTY                   = inputValue;
                    detail.ID_GROUP                 = ID_GROUP;
                    detail.WAKTU_INPUT_INVENTORY    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

                    InventoryService.setInventoryAction(detail)
                    .then(function (result) 
                    {
                        sweet.show({
                                        title: 'Saved',
                                        type: 'success',
                                        timer: 2000,
                                        showConfirmButton: false
                                    });

                        var newISON_SERVER              = 1;
                        var newTGL                      = detail.TGL;
                        var newCUST_KD                  = detail.CUST_KD;
                        var newKD_BARANG                = detail.KD_BARANG;
                        var newSO_QTY                   = detail.SO_QTY;
                        var newSO_TYPE                  = detail.SO_TYPE;
                        var newPOS                      = detail.POS;
                        var newUSER_ID                  = detail.USER_ID;
                        var newSTATUS                   = 1;
                        var newWAKTU_INPUT_INVENTORY    = detail.WAKTU_INPUT_INVENTORY;
                        var newID_GROUP                 = detail.ID_GROUP;

                        var queryinsertsot2 = 'INSERT INTO Sot2 (ISON_SERVER,TGL,CUST_KD,KD_BARANG,SO_QTY,SO_TYPE,POS,USER_ID,STATUS,WAKTU_INPUT_INVENTORY,ID_GROUP) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                        $cordovaSQLite.execute($rootScope.db,queryinsertsot2,[newISON_SERVER,newTGL,newCUST_KD,newKD_BARANG,newSO_QTY,newSO_TYPE,newPOS,newUSER_ID,newSTATUS,newWAKTU_INPUT_INVENTORY,newID_GROUP])
                        .then(function(result) 
                        {
                            alert("SOT2 Berhasil Disimpan Di Local!");
                        }, 
                        function(error) 
                        {
                            alert("SOT2 Gagal Disimpan Ke Local: " + error.message);
                        });

                        $scope.salesaktivitas[parentindex].products.splice(index, 1);
                        if($scope.salesaktivitas[parentindex].products.length == 0)
                        {
                            var status={};
                            status.bgcolor="bg-green";
                            status.icon="fa fa-check bg-green";
                            status.show = false;

                            $scope.salesaktivitas[parentindex].status = status


                            var statuskunjungan = $rootScope.updatestatusinventoryquantity(idinventory);
                            InventoryService.updateInventoryStatus(ID_DETAIL,statuskunjungan)
                            .then(function(data)
                            {
                                ngToast.create('Status Inventory Berhasil Di Update');
                                $scope.loadingcontent = false;
                            },
                            function (error)
                            {
                                alert("Gagal Menyimpan Status Inventory Ke Server");
                                $scope.loadingcontent = false;
                            });

                            var queryupdateagenda = 'UPDATE Agenda SET '+ titledialog + ' = ? WHERE ID_SERVER = ?';
                            $cordovaSQLite.execute($rootScope.db, queryupdateagenda, [titledialog,ID_DETAIL])
                            .then(function(result) 
                            {
                                alert("Terimakasih. Agenda Status " + titledialog + " Berhasil Di Update Di Local");
                            },
                            function(error) 
                            {
                                alert("Error. Agenda Status " + titledialog + " Gagal Di Update Di Local");
                            });
                        }

                        $scope.loadingcontent = false;
                    },
                    function (error)
                    {
                        alert("Gagal Menyimpan SOT2 Ke Server");
                        $scope.loadingcontent = false;
                    });
                    
                }
            });
        }     
    }
    //#####################################################################################################
    // START TAKE PICTURE FUNCTION
    //#####################################################################################################
    $scope.starttakeapicture = function()
    {
        var jarak = $rootScope.jaraklokasi($scope.googlemaplong,$scope.googlemaplat,$scope.CUST_MAP_LNG,$scope.CUST_MAP_LAT);
        if(jarak > configjarak)
        {
            // sweetAlert("Oops...", "Kamu Sedang Tidak Di Dalam Radius!", "error");
            alert("Kamu Sedang Tidak Di Dalam Radius");
        }
        else
        {
            document.addEventListener("deviceready", function () 
            {
                var options = $rootScope.getCameraOptions();
                $cordovaCamera.getPicture(options)
                .then(function (imageData) 
                {
                    var statusstartpicture              = {};
                    statusstartpicture.bgcolor          = "bg-green";
                    statusstartpicture.icon             = "fa fa-check bg-green";
                    $scope.statusstartpicture = statusstartpicture;

                    var timeimagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    
                    var gambarkunjungan={};
                    gambarkunjungan.ID_DETAIL           = ID_DETAIL;
                    gambarkunjungan.IMG_NM_START        = "gambar start";
                    gambarkunjungan.IMG_DECODE_START    = imageData;
                    gambarkunjungan.TIME_START          = timeimagestart;
                    gambarkunjungan.STATUS              = 1;
                    gambarkunjungan.CREATE_BY           = idsalesman;
                    gambarkunjungan.CUSTOMER_ID         = y.CUST_ID;

                    GambarService.setGambarAction(ID_DETAIL,gambarkunjungan)
                    .then(function (data)
                    {
                        ngToast.create('Gambar Telah Berhasil Di Update');
                        var statuskunjungan = {};
                        statuskunjungan.START_PIC = 1;

                        GambarService.updateGambarStatus(ID_DETAIL,statuskunjungan)
                        .then(function (data)
                        {
                            console.log(data);
                        }, 
                        function(err) 
                        {
                            alert("Gagal Update Status Start Picture");
                        });

                        var updateSTART_PIC  = 1;
                        var queryupdateagenda = 'UPDATE Agenda SET START_PIC = ? WHERE ID_SERVER = ?';
                        $cordovaSQLite.execute($rootScope.db, queryupdateagenda, [updateSTART_PIC,ID_DETAIL])
                        .then(function(result) 
                        {
                            alert("Terimakasih. Agenda Start Pic Di Update Di Local");
                        },
                        function(error) 
                        {
                            alert("Agenda Start Pic Gagal Di Update Di Local: " + error.message);
                        });
                    }, 
                    function(err) 
                    {
                        alert("Gagal Menyimpan Start Picture Ke Server");
                    });
                }, 
                function(err) 
                {
                    // alert(err.message);
                });

            }, false);
            

            // #####TEST DI DALAM WEBSITE #####################
            // var status = {};
            // status.bgcolor          = "bg-green";
            // status.icon             = "fa fa-check bg-green";
            // $rootScope.statusstartpicture = status;

            // var timeimagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            
            // var gambarkunjungan={};
            // gambarkunjungan.ID_DETAIL           = ID_DETAIL;
            // gambarkunjungan.IMG_NM_START        = "gambar start";
            // gambarkunjungan.IMG_DECODE_START    = "Test Image Data";
            // gambarkunjungan.TIME_START          = timeimagestart;
            // gambarkunjungan.STATUS              = 1;
            // gambarkunjungan.CREATE_BY           = idsalesman;
            // gambarkunjungan.CUSTOMER_ID         = y.CUST_ID;

            // GambarService.setGambarAction(ID_DETAIL,gambarkunjungan)
            // .then(function (data)
            // {
            //     ngToast.create('Gambar Telah Berhasil Di Update');
            //     var statuskunjungan = {};
            //     statuskunjungan.START_PIC = 1;

            //     GambarService.updateGambarStatus(ID_DETAIL,statuskunjungan)
            //     .then(function (data)
            //     {
            //         // console.log(data);
            //     });
            // });
        }
    }
    //#####################################################################################################
    // END TAKE PICTURE FUNCTION
    //#####################################################################################################
    $scope.endtakeapicture = function()
    {
        var jarak = $rootScope.jaraklokasi($scope.googlemaplong,$scope.googlemaplat,$scope.CUST_MAP_LNG,$scope.CUST_MAP_LAT);
        if(jarak > configjarak)
        {
            alert("Kamu Sedang Tidak Di Dalam Radius");
            // sweetAlert("Oops...", "Kamu Sedang Tidak Di Dalam Radius!", "error");
        }
        else
        {
            // MODE MOBILE DEVICE
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
                    var timeimageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    var gambarkunjungan={};

                    gambarkunjungan.IMG_NM_END      = "gambar end";
                    gambarkunjungan.IMG_DECODE_END  = imageData;
                    gambarkunjungan.TIME_END        = timeimageend;
                    gambarkunjungan.ID_DETAIL       = ID_DETAIL;
                    gambarkunjungan.UPDATE_BY       = idsalesman;


                    GambarService.setEndGambarAction(ID_DETAIL,gambarkunjungan)
                    .then(function (data)
                    {
                        ngToast.create('Gambar Telah Berhasil Di Update');
                        var statusendpicture                = {};
                        statusendpicture.bgcolor            = "bg-green";
                        statusendpicture.icon               = "fa fa-check bg-green";
                        $scope.statusendpicture             = statusendpicture;

                        var statuskunjungan = {};
                        statuskunjungan.END_PIC = 1;

                        GambarService.updateGambarStatus(ID_DETAIL,statuskunjungan)
                        .then(function (data)
                        {
                            console.log(data);
                        }, 
                        function(err) 
                        {
                            alert("Gagal Update Status End Picture Ke Server");
                        });

                        var updateEND_PIC  = 1;
                        var queryupdateagenda = 'UPDATE Agenda SET END_PIC = ? WHERE ID_SERVER = ?';
                        $cordovaSQLite.execute($rootScope.db, queryupdateagenda, [updateEND_PIC,ID_DETAIL])
                        .then(function(result) 
                        {
                            alert("Terimakasih. Agenda End Pic Di Update Di Local");
                        },
                        function(error) 
                        {
                            alert("Agenda End Pic Gagal Di Update Di Local: " + error.message);
                        });
                    }, 
                    function(err) 
                    {
                        alert("Gagal Menyimpan End Picture Ke Server");
                    }); 
                }, 
                function(err) 
                {
                    // alert(err.message);
                });
            }, false);
            
            // ####MODE WEB DEVICE
            // var timeimageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            // var gambarkunjungan={};

            // gambarkunjungan.IMG_NM_END      = "gambar end";
            // gambarkunjungan.IMG_DECODE_END  = "TEST GAMBAR END";
            // gambarkunjungan.TIME_END        = timeimageend;
            // gambarkunjungan.ID_DETAIL       = ID_DETAIL;
            // gambarkunjungan.UPDATE_BY       = idsalesman;


            // GambarService.setEndGambarAction(ID_DETAIL,gambarkunjungan)
            // .then(function (data)
            // {
            //     ngToast.create('Gambar Telah Berhasil Di Update');
            //     var status = {};
            //     status.bgcolor          = "bg-green";
            //     status.icon             = "fa fa-check bg-green";
            //     $rootScope.statusendpicture = status;

            //     var statuskunjungan = {};
            //     statuskunjungan.END_PIC = 1;

            //     GambarService.updateGambarStatus(ID_DETAIL,statuskunjungan)
            //     .then(function (data)
            //     {
            //         console.log(data);
            //     });
            // }); 
        }
    }
    //#####################################################################################################
    // CHECK-OUT FUNCTION
    //#####################################################################################################
    $scope.checkout = function()
    {
        var jarak = $rootScope.jaraklokasi($scope.googlemaplong,$scope.googlemaplat,$scope.CUST_MAP_LNG,$scope.CUST_MAP_LAT);
        if(jarak > configjarak)
        {
            alert("Di Luar Radius");
            // sweetAlert("Oops...", "Out Of Ranges!", "error");
        }
        else
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
                var checkouttime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                var detail={};
                detail.CHECKOUT_LAT              = $scope.googlemaplat;
                detail.CHECKOUT_LAG              = $scope.googlemaplong;
                detail.CHECKOUT_TIME             = checkouttime;
                detail.UPDATE_BY                 = idsalesman;

                CheckOutService.setCheckoutAction(ID_DETAIL,detail)
                .then(function(data)
                {
                    var statuskunjungan = {};
                    statuskunjungan.CHECK_OUT = 1;

                    CheckOutService.updateCheckoutStatus($scope.idstatuskunjunganresponse,statuskunjungan)
                    .then(function(data,status)
                    {
                        sweet.show({
                                        title: 'Success!',
                                        text: 'Kamu Berhasil Checkout',
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                        $scope.loadingcontent = true;
                        $timeout($location.path('/agenda/'+ PLAN_TGL_KUNJUNGAN),1000);
                    },
                    function (error)
                    {
                        alert("Update Status Check Out Ke Server Gagal.Try Again");
                    });

                    var updateCHECKOUT_TIME  = checkouttime;
                    var updateCHECK_OUT      = 1;

                    var queryupdateagenda = 'UPDATE Agenda SET CHECKOUT_TIME = ?, CHECK_OUT = ? WHERE ID_SERVER = ?';
                    $cordovaSQLite.execute($rootScope.db, queryupdateagenda, [updateCHECKOUT_TIME,updateCHECK_OUT,ID_DETAIL])
                    .then(function(result) 
                    {
                        alert("Terimakasih. Agenda Check Out Berhasil Di Update Di Local");
                    },
                    function(error) 
                    {
                        alert("Update Agenda Check Out Gagal Di Update Di Local: " + error.message);
                    });
                },
                function (error)
                {
                    alert("Update Check Out SCDL Detail Ke Server Gagal.Try Again");
                });    
            }); 
        } 
    };
    //#####################################################################################################
    // NOTE KUNJUNGAN FUNCTION
    //#####################################################################################################
    $scope.messageskunjungandisabled = false;
    $http.get(url + "/messageskunjungans/search?ID_DETAIL=" + ID_DETAIL)
    .success(function(data,status, headers, config) 
    {
        console.log(data);
        if(data.statusCode != 404)
        {
            $scope.salesmanmemo = data.Messageskunjungan[0];
            var statusmessagekunjungan = {};
            statusmessagekunjungan.bgcolor="bg-green";
            statusmessagekunjungan.icon="fa fa-check bg-green";
            $scope.statusmessageskunjungan = statusmessagekunjungan;
            $scope.messageskunjungandisabled = true;
        }    
    })
    .error(function(err,status)
    {
        $scope.messageskunjungandisabled = false;
    })
    .finally(function()
    {
        $scope.loadingcontent = false;  
    });

    $scope.submitFormSalesMemo = function(formsalesmanmemo)
    {
        $scope.loadingcontent = true;
        var memodibuatpada         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        var salesmanmemo = {};
        salesmanmemo.ID_DETAIL          = y.ID;
        salesmanmemo.KD_CUSTOMER        = y.CUST_ID;
        salesmanmemo.NM_CUSTOMER        = y.CUST_NM;
        salesmanmemo.TGL                = $filter('date')(new Date(),'yyyy-MM-dd');


        salesmanmemo.ISI_MESSAGES       = formsalesmanmemo.ISI_MESSAGES
        salesmanmemo.ID_USER            = auth.id;
        salesmanmemo.NM_USER            = auth.username;
        salesmanmemo.STATUS_MESSAGES    = "URGENT";
        salesmanmemo.CREATE_AT          = memodibuatpada;
        salesmanmemo.CREATE_BY          = auth.id;

        var result              = $rootScope.seriliazeobject(salesmanmemo);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "/messageskunjungans",serialized,config)
        .success(function(data,status, headers, config) 
        {
            ngToast.create('Memo Kunjungan Berhasil Di Save');
            var statusmemokunjungan             = {};
            statusmemokunjungan.bgcolor         = "bg-green";
            statusmemokunjungan.icon            = "fa fa-check bg-green";
            $scope.statusmessageskunjungan      = statusmemokunjungan;
            $scope.messageskunjungandisabled    = true;
        })
        .finally(function()
        {
            $scope.loadingcontent = false;  
        });
    }

    // ####################################################################################################
    // GET DATA BARANG UNTUK EXPIRED FUNCTION
    //#####################################################################################################
    var databarangall = resolvedatabarangall;
    ExpiredService.setExpiredAction(ID_DETAIL)
    .then (function (data)
    {
        var x           = $rootScope.diffbarang(databarangall,data);
        $rootScope.barangexpired   = [];
        var objectdatabarangall = $rootScope.objectdatabarangs();
        angular.forEach(x, function(value, key)
        {
            var existingFilter = _.findWhere(objectdatabarangall, { KD_BARANG: value.KD_BARANG });
            $rootScope.barangexpired.push(existingFilter);
        });
    });
    //#####################################################################################################
    // EXPIRED FUNCTION
    //#####################################################################################################
    $scope.showmodal = function(barang,index) 
    {
        var jarak = $rootScope.jaraklokasi($scope.googlemaplong,$scope.googlemaplat,$scope.CUST_MAP_LNG,$scope.CUST_MAP_LAT);
        if(jarak > configjarak)
        {
            alert("Kamu Sedang Tidak Di Dalam Radius");
            // sweetAlert("Oops...", "Kamu Sedang Tidak Di Dalam Radius!", "error");
        }
        else
        {
            ModalService
            .showModal(
            {
              templateUrl: "angular/partial/salesman/complexmodal.html",
              controller: "ComplexController",
              inputs: 
              {
                title: barang.NM_BARANG
              }
            })
            .then(function(modal) 
            {
                modal.element.modal(function ()
                {
                    alert("Button OK Klick");
                });
                modal.close.then(function(result) 
                {
                    $scope.loadingcontent = true;
                    var kodebarang     = barang.KD_BARANG;

                    for(var i = 0; i < result.list.length ; i ++)
                    {
                        var tanggalexpired = result.list[i].tanggaled;
                        var expiredqty     = result.list[i].expiredqty;
                        var prioritas      = result.list[i].prioritas;

                        if(tanggalexpired != null && expiredqty != null)
                        {
                            var tglexpd = $filter('date')(tanggalexpired,'yyyy-MM-dd'); 

                            var detailexpired = {};
                            detailexpired.ID_PRIORITASED    = prioritas;
                            detailexpired.ID_DETAIL         = ID_DETAIL;
                            detailexpired.CUST_ID           = CUST_ID;
                            detailexpired.BRG_ID            = kodebarang;
                            detailexpired.USER_ID           = idsalesman;
                            detailexpired.TGL_KJG           = PLAN_TGL_KUNJUNGAN;
                            detailexpired.QTY               = expiredqty;
                            detailexpired.DATE_EXPIRED      = tglexpd;
                            detailexpired.CREATE_BY         = idsalesman;

                            var expiredproduct              = $rootScope.seriliazeobject(detailexpired);
                            var serialized                  = expiredproduct.serialized;
                            var config                      = expiredproduct.config;

                            $http.post(url + "/expiredproducts",serialized,config)
                            .success(function(data,status, headers, config) 
                            {
                                
                            })

                            .finally(function()
                            {
                                $scope.loadingcontent = false;  
                            }); 
                        }
                    }
                    ngToast.create("Expired Product Telah Diupdate");

                    $rootScope.barangexpired.splice(index,1);
                    if($rootScope.barangexpired.length == 0)
                    {
                        var updateINVENTORY_EXPIRED      = 1;
                        var queryupdateagenda = 'UPDATE Agenda SET INVENTORY_EXPIRED = ? WHERE ID_SERVER = ?';
                        $cordovaSQLite.execute($rootScope.db, queryupdateagenda, [updateINVENTORY_EXPIRED,ID_DETAIL])
                        .then(function(result) 
                        {
                            alert("Terimakasih. Agenda Check Out Berhasil Di Update Di Local");
                        },
                        function(error) 
                        {
                            alert("Update Agenda Check Out Gagal Di Update Di Local: " + error.message);
                        });

                        var status={};
                        status.bgcolor="bg-green";
                        status.icon="fa fa-check bg-green";
                        status.show = false;

                        $scope.statusbarangexpired = status;

                        var idstatuskunjungan   = $rootScope.findidstatuskunjunganbyiddetail(ID_DETAIL);
                        var statuskunjungan = {};
                        statuskunjungan.INVENTORY_EXPIRED = 1;

                        var resultstatus            = $rootScope.seriliazeobject(statuskunjungan);
                        var serialized              = resultstatus.serialized;
                        var config                  = resultstatus.config;

                        $http.put(url + "/statuskunjungans/"+ idstatuskunjungan,serialized,config)
                        .success(function(data,status, headers, config) 
                        {
                            ngToast.create('Status Inventory Expired Berhasil Di Update Di Server');
                        })
                        .finally(function()
                        {
                            alert("Status Inventory Expired Gagal Di Update Di Server");
                            $scope.loadingcontent = false;  
                        }); 
                    }
                });
            });
        }    
    };
    // ####################################################################################################
    // SUMMARY FUNCTION
    //#####################################################################################################
    $scope.summary = function()
    {
        $scope.loadingcontent = true;
        SummaryService.datasummarypercustomer(PLAN_TGL_KUNJUNGAN,CUST_ID,idsalesman)
        .then(function (data)
        {
            $scope.BarangSummary = data.InventorySummary;
            $scope.loadingcontent = false;
        });
    };
    
    $scope.lastvisitsummary = function()
    {
        $scope.loadingcontent = true;
        LastVisitCustomerService.LastVisitSummaryCustomer(CUST_ID,PLAN_TGL_KUNJUNGAN)
        .then(function (data)
        {
            $scope.Lastvisitsummary = data;
            $scope.loadingcontent = false;
        });
    };
}]);

myAppModule.controller('ComplexController', ['$rootScope','$scope', '$http','$element', 'title', 'close',"$filter",
function($rootScope,$scope, $http,$element, title, close,$filter) 
{

   $scope.title = title;
    var myDate = new Date();
    var previousMonth = new Date(myDate);
    previousMonth.setMonth(myDate.getMonth()-1);

    var nextMonth1 = new Date(myDate);
    nextMonth1.setMonth(myDate.getMonth()+1);

    var nextMonth2 = new Date(myDate);
    nextMonth2.setMonth(myDate.getMonth()+2);
    var nextMonth3 = new Date(myDate);
    nextMonth3.setMonth(myDate.getMonth()+3);

    var url = $rootScope.linkurl;
    $http.get(url + "/expiredpriorities/search?STATUS=1")
    .success(function(data,status, headers, config) 
    {
        $scope.list = [];
        angular.forEach(data.ExpiredPrioritas, function(value, key) 
        {
            var jangkawaktu = value.JANGKA_WAKTU;
            var nextMonth = new Date(myDate);
            nextMonth.setMonth(myDate.getMonth()+ jangkawaktu);
            var result = {};
            result.tanggaled = nextMonth;
            result.expiredqty = null;
            result.prioritas  = jangkawaktu;

            $scope.list.push(result);
             // {tanggaled:nextMonth1, expiredqty:null, prioritas:1},{tanggaled:nextMonth2, expiredqty:null,prioritas:2},{tanggaled:nextMonth3, expiredqty:null,prioritas:3} ];
        });
    });

  // var tanggaled = $filter('date')(nextMonth,'yyyy-MM-dd');
  // $scope.list = [ {tanggaled:nextMonth1, expiredqty:null, prioritas:1},{tanggaled:nextMonth2, expiredqty:null,prioritas:2},{tanggaled:nextMonth3, expiredqty:null,prioritas:3} ];
  
  $scope.close = function() 
  {
        close({list:$scope.list,title:$scope.title}, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.cancel = function() 
  {
    $element.modal('hide');
  };

  $scope.qtychange = function()
  {
    alert("radumta");
  }
}]);