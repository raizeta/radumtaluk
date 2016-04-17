//http://localhost/radumta_folder/production/crmprod/#/detailjadwalkunjungan/212
//angular/partial/salesman/detailcustomer.html
myAppModule.controller("DetailJadwalKunjunganController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService","ngToast","$mdDialog","$filter","sweet","ModalService","resolvegpslocation","resolvesingledetailkunjunganbyiddetail",
function ($rootScope,$scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService,ngToast,$mdDialog,$filter,sweet,ModalService,resolvegpslocation,resolvesingledetailkunjunganbyiddetail) 
{
    $scope.noticestart="bg-aqua";
    $scope.noticestartgambar="fa fa-close bg-aqua";
    $scope.noticeend="bg-aqua";
    $scope.noticeendgambar="fa fa-close bg-aqua";

    var status={};
    status.bgcolor="bg-aqua";
    status.icon="fa fa-close bg-aqua";
    status.show = false;
    $rootScope.statusbarangstockqty = status;
    $rootScope.statusbarangsellout = status;
    $rootScope.statusbarangsellin   = status;
    $rootScope.statusbarangexpired = status;


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
    var geocoder = new google.maps.Geocoder;
    $scope.googlemaplat = resolvegpslocation.latitude;    //get from gps
    $scope.googlemaplong = resolvegpslocation.longitude;  //get from gps
    
    var y  = resolvesingledetailkunjunganbyiddetail.DetailKunjungan[0];

    $scope.CUST_MAP_LAT      = y.MAP_LAT;
    $scope.CUST_MAP_LNG      = y.MAP_LNG;
    $scope.blabla            = y.CUST_NM;

    var ID_DETAIL           = y.ID;
    var DEFAULT_CUST_LONG   = y.MAP_LNG;
    var DEFAULT_CUST_LAT    = y.MAP_LAT;
    var PLAN_TGL_KUNJUNGAN  = y.TGL;
    var CUST_ID             = y.CUST_ID;

    var longitude1     = $scope.googlemaplat;
    var latitude1      = $scope.googlemaplong;

    var longitude2     = DEFAULT_CUST_LAT;
    var latitude2      = DEFAULT_CUST_LONG;

    var jarak = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);

    var detail = {};
    var checkintime         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    detail.LAT              = $scope.googlemaplat;
    detail.LAG              = $scope.googlemaplong;
    detail.RADIUS           = jarak;
    detail.CHECKIN_TIME     = checkintime;
    detail.CREATE_BY        = idsalesman;
    detail.CREATE_AT        = checkintime;
    detail.STATUS           = 1;

    var result              = $rootScope.seriliazeobject(detail);
    var serialized          = result.serialized;
    var config              = result.config;


    // CHECK-IN FUNCTION
    //###########################################################################################
    $scope.checkin = function()
    {
        $http.put(url + "/detailkunjungans/"+ ID_DETAIL,serialized,config)
        .success(function(data,status, headers, config) 
        {
            ngToast.create('Anda Telah Berhasil Check In');
        })
        .finally(function()
        {
            $scope.loading = false;  
        });

        $http.get(url + "/statuskunjungans/search?ID_DETAIL=" + ID_DETAIL,serialized,config)
        .success(function(data,status, headers, config) 
        {
            // ngToast.create('Status Checkin Berhasil Disimpan');
        })
        .error(function(data,status,header,config)
        {
            var statuskunjungan = {};
            statuskunjungan.ID_DETAIL               = ID_DETAIL;
            statuskunjungan.TGL                     = PLAN_TGL_KUNJUNGAN;
            statuskunjungan.USER_ID                 = idsalesman;
            statuskunjungan.CUST_ID                 = CUST_ID;
            statuskunjungan.CHECK_IN                = 1;

            var result              = $rootScope.seriliazeobject(statuskunjungan);
            var serialized          = result.serialized;
            var config              = result.config;

            $http.post(url + "/statuskunjungans",serialized,config)
            .success(function(data,status, headers, config) 
            {
                // ngToast.create('Status Checkin Berhasil Disimpan');
            })

            .finally(function()
            {
                $scope.loading = false;  
            });
        })
        .finally(function()
        {
            $scope.loading = false;  
        });   
    }
    $scope.checkin();
    //############################################################################################
    $scope.checkout = function()
    {
        var checkouttime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        var detail={};
        detail.CHECKOUT_LAT              = $scope.googlemaplat;
        detail.CHECKOUT_LAG              = $scope.googlemaplong;
        detail.CHECKOUT_TIME             = checkouttime;
        detail.UPDATE_BY                 = idsalesman;

        var result              = $rootScope.seriliazeobject(detail);
        var serialized          = result.serialized;
        var config              = result.config; 

        $http.put(url + "/detailkunjungans/" + ID_DETAIL,serialized,config)
        .success(function(data,status, headers, config) 
        {
            ngToast.create('Anda Telah Berhasil Check Out');
            $location.path('/agenda/'+ PLAN_TGL_KUNJUNGAN);
        })
        .finally(function()
        {
            $scope.loading = false;  
        });

        var idstatuskunjungan   = $rootScope.findidstatuskunjunganbyiddetail(ID_DETAIL);
        var statuskunjungan = {};
        statuskunjungan.CHECK_OUT = 1;

        var resultstatus            = $rootScope.seriliazeobject(statuskunjungan);
        var serialized              = resultstatus.serialized;
        var config                  = resultstatus.config;

        $http.put(url + "/statuskunjungans/"+ idstatuskunjungan,serialized,config)
        .success(function(data,status, headers, config) 
        {
            // ngToast.create('Anda Telah Berhasil Check In');
        })

        .finally(function()
        {
            $scope.loading = false;  
        });     
    }
    //#############################################################################################
    var x = $.ajax
    ({
        url: url + "/statuskunjungans/search?ID_DETAIL="+ ID_DETAIL,
        type: "GET",
        dataType:"json",
        async: false
    }).responseJSON;
    
    if(x.code != 0)
    {
        var x = x.StatusKunjungan[0];
        if(x.START_PIC == 1)
        {
            $scope.noticestart="bg-green";
            $scope.noticestartgambar="fa fa-check bg-green";
        }
        if(x.END_PIC == 1)
        {
            $scope.noticeend="bg-green";
            $scope.noticeendgambar="fa fa-check bg-green";
        }
    }
    
    //#############################################################################################
    var databarangall       = $rootScope.databarangs();
    $rootScope.arraydatabarangall = [];
    angular.forEach(databarangall, function(element) 
    {
      $rootScope.arraydatabarangall.push(element);
    });

    var barangstockqty      = $rootScope.databaranginventory(CUST_ID,PLAN_TGL_KUNJUNGAN,5);
    var barangsellin        = $rootScope.databaranginventory(CUST_ID,PLAN_TGL_KUNJUNGAN,6);
    var barangsellout       = $rootScope.databaranginventory(CUST_ID,PLAN_TGL_KUNJUNGAN,7);
    var barangexpired       = $rootScope.databarangexpired(ID_DETAIL);

    $rootScope.barangstockqty           = $rootScope.diffbarang(databarangall,barangstockqty);
    $rootScope.statusbarangstockqty     = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangstockqty);

    $rootScope.barangsellout            = $rootScope.diffbarang(databarangall,barangsellout);
    $rootScope.statusbarangsellout      = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangsellout);

    $rootScope.barangsellin             = $rootScope.diffbarang(databarangall,barangsellin);
    $rootScope.statusbarangsellin       = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangsellin);

    var x           = $rootScope.diffbarang(databarangall,barangexpired);
    $rootScope.barangexpired   = [];
    var objectdatabarangall = $rootScope.objectdatabarangs();
    angular.forEach(x, function(value, key)
    {
        var existingFilter = _.findWhere(objectdatabarangall, { KD_BARANG: value.KD_BARANG });
        $rootScope.barangexpired.push(existingFilter);
    });
    $rootScope.statusbarangexpired      = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangexpired);
    // ####################################################################################################
    $scope.updatestockqty = function(idproduct,index)
    {
        // if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        // {
            var namaproduct = $rootScope.searchdatabarangs(idproduct);
            sweet.show(
            {
                title: 'Stock Quantity',
                text: namaproduct,
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: false,
                inputPlaceholder: 'Write something'
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
                    var detail={};
                    detail.SO_TYPE=5;
                    detail.TGL=PLAN_TGL_KUNJUNGAN;
                    detail.CUST_KD= CUST_ID;
                    detail.KD_BARANG=idproduct;
                    detail.POS='ANDROID';
                    detail.USER_ID=idsalesman;
                    detail.SO_QTY=inputValue;

                    var result = $rootScope.seriliazeobject(detail);
                    var serialized  = result.serialized;
                    var config      = result.config;

                    $http.post(url + "/productinventories",serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        sweet.show({
                                        title: 'Saved',
                                        type: 'success',
                                        timer: 20,
                                        showConfirmButton: false
                                    });

                        $rootScope.barangstockqty.splice(index,1);
                        if($rootScope.barangstockqty.length == 0)
                        {
                            var status={};
                            status.bgcolor="bg-green";
                            status.icon="fa fa-check bg-green";
                            status.show = false;
                            $rootScope.statusbarangstockqty = status;

                        }
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                }
            });
        // }
        // else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        // {
        //     alert("Kamu Tidak Bisa Lagi Melakukan Update Stock");
        // }
        // else
        // {
        //     alert("Kamu Belum Bisa Melakukan Update Stock");
        // }
    }
    // ####################################################################################################
    $scope.updatesellout = function(idproduct,index)
    {
        if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        {
            var namaproduct = $rootScope.searchdatabarangs(idproduct);
            sweet.show(
            {
                title: 'Product Sell Out',
                text: namaproduct,
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: false,
                inputPlaceholder: 'Write something',
                allowEscapeKey: false,
                allowOutsideClick: false
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
                    var detail={};
                    detail.SO_TYPE=7;
                    detail.TGL=PLAN_TGL_KUNJUNGAN;
                    detail.CUST_KD= CUST_ID;
                    detail.KD_BARANG=idproduct;
                    detail.POS='ANDROID';
                    detail.USER_ID=idsalesman;
                    detail.SO_QTY=inputValue;

                    var result = $rootScope.seriliazeobject(detail);
                    var serialized  = result.serialized;
                    var config      = result.config;

                    $http.post(url + "/productinventories",serialized,config)
                    .success(function(data,status, headers, config) 
                    {

                        sweet.show({
                                        title: 'Saved',
                                        type: 'success',
                                        timer: 20,
                                        showConfirmButton: false
                                    });

                        $rootScope.barangsellout.splice(index,1);
                        if($rootScope.barangsellout == 0)
                        {
                            var status={};
                            status.bgcolor="bg-green";
                            status.icon="fa fa-check bg-green";
                            status.show = false;
                            $rootScope.statusbarangsellout = status;
                        }
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                }
            });
        }
        else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Update Sell Out");
        }
        else
        {
            alert("Kamu Belum Bisa Melakukan Update Sell Out");
        }     
    }
    // ####################################################################################################
    $scope.updatesellin = function(idproduct,index)
    { 
        if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        {
            var namaproduct = $rootScope.searchdatabarangs(idproduct);
            sweet.show(
            {
                title: 'Sell In',
                text: namaproduct,
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: false,
                inputPlaceholder: 'Write something',
                allowEscapeKey: false,
                allowOutsideClick: false
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
                    var detail={};
                    detail.SO_TYPE=6;
                    detail.TGL=PLAN_TGL_KUNJUNGAN;
                    detail.CUST_KD= CUST_ID;
                    detail.KD_BARANG=idproduct;
                    detail.POS='ANDROID';
                    detail.USER_ID=idsalesman;
                    detail.SO_QTY=inputValue;

                    var result      = $rootScope.seriliazeobject(detail);
                    var serialized  = result.serialized;
                    var config      = result.config;

                    $http.post(url + "/productinventories",serialized,config)
                    .success(function(data,status, headers, config) 
                    {

                        sweet.show({
                                        title: 'Saved',
                                        type: 'success',
                                        timer: 20,
                                        showConfirmButton: false
                                    });

                        $rootScope.barangsellin.splice(index,1);
                        if($rootScope.barangsellin.length == 0)
                        {
                            var status={};
                            status.bgcolor="bg-green";
                            status.icon="fa fa-check bg-green";
                            status.show = false;
                            $rootScope.statusbarangsellin = status;
                        }
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                }
            });
        }
        else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Update Sell In");
        }
        else
        {
            alert("Kamu Belum Bisa Melakukan Update Sell In");
        }      
    }
    //#####################################################################################################
    $scope.starttakeapicture = function()
    {
        if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        {
            document.addEventListener("deviceready", function () 
            {
              var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };

              $cordovaCamera.getPicture(options).then(function(imageData) 
              {
                var timeimagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                var gambarkunjungan={};

                gambarkunjungan.ID_DETAIL           = ID_DETAIL;
                gambarkunjungan.IMG_NM_START        = "gambar start";
                gambarkunjungan.IMG_DECODE_START    = imageData;
                gambarkunjungan.TIME_START          = timeimagestart;
                gambarkunjungan.STATUS              = 1;
                gambarkunjungan.CREATE_BY           = idsalesman;


                var result      = $rootScope.seriliazeobject(gambarkunjungan);
                var serialized  = result.serialized;
                var config      = result.config; 


                var datagambar = $.ajax
                ({
                      //url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
                      url: url + "/gambars/search?ID_DETAIL="+ ID_DETAIL,
                      type: "GET",
                      dataType:"json",
                      async: false
                });

                if(datagambar.status == "404")
                {
                    $http.post(url + "/gambars",serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        ngToast.create('Gambar Telah Berhasil Di Update');
                        $scope.noticestart          = "bg-green";
                        $scope.noticestartgambar    = "fa fa-check bg-green";
                    })

                    .finally(function()
                    {
                        $scope.loading = false;
                          
                    });

                    var idstatuskunjungan   = $rootScope.findidstatuskunjunganbyiddetail(ID_DETAIL);
                    var statuskunjungan = {};
                    statuskunjungan.START_PIC = 1;

                    var resultstatus            = $rootScope.seriliazeobject(statuskunjungan);
                    var serialized              = resultstatus.serialized;
                    var config                  = resultstatus.config;

                    $http.put(url + "/statuskunjungans/"+ idstatuskunjungan,serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        // ngToast.create('Anda Telah Berhasil Check In');
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                }
                
                else
                {

                }
              }, 
              function(err) 
              {

              });

            }, false);
        }
        else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Take Start Picture");
        }
        else
        {
            alert("Kamu Belum Bisa Melakukan Take Start Picture");
        } 
    }
    //#####################################################################################################
    $scope.endtakeapicture = function()
    {
        if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        {
            document.addEventListener("deviceready", function () 
            {
                var options = 
                {
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation:true
                };

                $cordovaCamera.getPicture(options).then(function(imageData) 
                {
                    var timeimageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    var gambarkunjungan={};

                    gambarkunjungan.IMG_NM_END      = "gambar end";
                    gambarkunjungan.IMG_DECODE_END  = imageData;
                    gambarkunjungan.TIME_END        = timeimageend;
                    gambarkunjungan.ID_DETAIL       = ID_DETAIL;
                    gambarkunjungan.UPDATE_BY       = idsalesman;

                    var result      = $rootScope.seriliazeobject(gambarkunjungan);
                    var serialized  = result.serialized;
                    var config      = result.config; 


                    var datagambar = $.ajax
                    ({
                          url: url + "/gambars/search?ID_DETAIL="+ ID_DETAIL,
                          type: "GET",
                          dataType:"json",
                          async: false
                    });

                    if(datagambar.status == "404")
                    {
                        alert("Ambil Start Gambar Terlebih Dahulu");
                    }

                    else
                    {
                        var datagambar = $.ajax
                        ({
                              url: url + "/gambars/search?ID_DETAIL="+ ID_DETAIL,
                              type: "GET",
                              dataType:"json",
                              async: false
                        }).responseText;

                        var myData = datagambar;
                        var mt = JSON.parse(myData)['Gambar'];
                        var idgambar = mt[0].ID;

                        $http.put(url + "/gambars/" + idgambar,serialized,config)
                        .success(function(data,status, headers, config) 
                        {
                            ngToast.create('Gambar Telah Berhasil Di Update');
                            $scope.noticeend          = "bg-green";
                            $scope.noticeendgambar    = "fa fa-check bg-green";
                        })

                        .finally(function()
                        {
                            $scope.loading = false;   
                        });

                        var idstatuskunjungan   = $rootScope.findidstatuskunjunganbyiddetail(ID_DETAIL);
                        var statuskunjungan = {};
                        statuskunjungan.END_PIC = 1;

                        var resultstatus            = $rootScope.seriliazeobject(statuskunjungan);
                        var serialized              = resultstatus.serialized;
                        var config                  = resultstatus.config;

                        $http.put(url + "/statuskunjungans/"+ idstatuskunjungan,serialized,config)
                        .success(function(data,status, headers, config) 
                        {
                            // ngToast.create('Anda Telah Berhasil Check In');
                        })

                        .finally(function()
                        {
                            $scope.loading = false;  
                        });
                    }
                }, 
                function(err) 
                {

                });

            }, false);
        }
        else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Take End Picture");
        }
        else
        {
            alert("Kamu Belum Bisa Melakukan Take End Picture");
        }  
    }
    //#####################################################################################################
    apiService.datasummarypercustomer(PLAN_TGL_KUNJUNGAN,CUST_ID,idsalesman)
    .then(function(data)
    {
        $scope.BarangSummary = data.InventorySummary;
    }); 
    //#####################################################################################################
    $scope.showmodal = function(barang,index) 
    {
        // if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        // {
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
                var kodebarang     = barang.KD_BARANG;

                for(var i = 0; i < result.list.length; i ++)
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
                        detailexpired.DATE_EXPIRED      = tanggalexpired;
                        detailexpired.CREATE_BY         = idsalesman;

                        var expiredproduct              = $rootScope.seriliazeobject(detailexpired);
                        var serialized                  = expiredproduct.serialized;
                        var config                      = expiredproduct.config;

                        $http.post(url + "/expiredproducts",serialized,config)
                        .success(function(data,status, headers, config) 
                        {
                            ngToast.create('Expired Prioritas' + i + "Telah Diupdate");
                        })

                        .finally(function()
                        {
                            $scope.loading = false;  
                        }); 
                    }
                    else
                    {
                        alert("Tidak Sukses");
                    }
                }

                $rootScope.barangexpired.splice(index,1);
                if($rootScope.barangexpired.length == 0)
                {
                    var status={};
                    status.bgcolor="bg-green";
                    status.icon="fa fa-check bg-green";
                    status.show = false;
                    $rootScope.statusbarangexpired = status; 
                }
              });
            });
        //}
        // else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        // {
        //     alert("Kamu Tidak Bisa Lagi Melakukan Update Product Expired");
        // }
        // else
        // {
        //     alert("Kamu Belum Bisa Melakukan Update Product Expired");
        // }  
    };
}]);

myAppModule.controller('ComplexController', ['$scope', '$element', 'title', 'close',"$filter",
function($scope, $element, title, close,$filter) 
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

  // var tanggaled = $filter('date')(nextMonth,'yyyy-MM-dd');
  $scope.list = [ {tanggaled:nextMonth1, expiredqty:null, prioritas:1},{tanggaled:nextMonth2, expiredqty:null,prioritas:2},{tanggaled:nextMonth3, expiredqty:null,prioritas:3} ];
  
  $scope.close = function() 
  {
        close({list:$scope.list,title:$scope.title}, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.cancel = function() 
  {
    $element.modal('hide');
  };
}]);