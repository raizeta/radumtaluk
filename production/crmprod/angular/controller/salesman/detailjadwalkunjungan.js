//http://localhost/radumta_folder/production/crmprod/#/detailjadwalkunjungan/212
//angular/partial/salesman/detailcustomer.html
myAppModule.controller("DetailJadwalKunjunganController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService","ngToast","$mdDialog","$filter","sweet","ModalService",
function ($rootScope,$scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService,ngToast,$mdDialog,$filter,sweet,ModalService) 
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
        var y = $rootScope.singledetailkunjunganbyiddetail(iddetail);

        $scope.googlemaplat = data.latitude;    //get from gps
        $scope.googlemaplong = data.longitude;  //get from gps

        $scope.CUST_MAP_LAT      = y.MAP_LAT;
        $scope.CUST_MAP_LNG      = y.MAP_LNG;

        var ID_DETAIL           = y.ID;
        var DEFAULT_CUST_LONG   = y.MAP_LNG;
        var DEFAULT_CUST_LAT    = y.MAP_LAT;
        var PLAN_TGL_KUNJUNGAN  = y.TGL;
        var CUST_ID             = y.CUST_ID;

        var longitude1     = $scope.googlemaplat;
        var latitude1      = $scope.googlemaplong;

        var longitude2     = DEFAULT_CUST_LAT;
        var latitude2      = DEFAULT_CUST_LONG;

        var thetalong      = (longitude1 - longitude2)*(Math.PI / 180); 
        var thetalat       = (latitude1 - latitude2)*(Math.PI / 180);

        var a = 0.5 - Math.cos(thetalat)/2 + Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180) * (1 - Math.cos(thetalong))/2;
        var jarak = 12742 * Math.asin(Math.sqrt(a)) * 1000;
        
        var detail = {};
        var checkintime         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.LAT              = $scope.googlemaplat;
        detail.LAG              = $scope.googlemaplong;
        detail.RADIUS           = jarak;
        detail.CHECKIN_TIME     = checkintime;
        detail.CREATE_BY        = idsalesman;
        detail.CREATE_AT        = checkintime;

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
        }
        //#############################################################################################

        $http.get(url + "/gambarkunjungans/search?ID_DETAIL=" + ID_DETAIL + "&IMG_NM_START=gambar start")
        .success(function(data,status, headers, config) 
        {
            $scope.noticestart="bg-green";
            $scope.noticestartgambar="fa fa-check bg-green";
        });

        $http.get(url + "/gambarkunjungans/search?ID_DETAIL=" + ID_DETAIL + "&IMG_NM_END=gambar end")
        .success(function(data,status, headers, config) 
        {
            $scope.noticeend="bg-green";
            $scope.noticeendgambar="fa fa-check bg-green";

        });

        var databarangall       = $rootScope.databarangs();
        

        var barangstockqty      = $rootScope.databaranginventory(CUST_ID,PLAN_TGL_KUNJUNGAN,5);
        var barangsellin        = $rootScope.databaranginventory(CUST_ID,PLAN_TGL_KUNJUNGAN,6);
        var barangsellout       = $rootScope.databaranginventory(CUST_ID,PLAN_TGL_KUNJUNGAN,7);

        $rootScope.barangstockqty           = $rootScope.diffbarang(databarangall,barangstockqty);
        $rootScope.statusbarangstockqty     = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangstockqty);

        $rootScope.barangsellout            = $rootScope.diffbarang(databarangall,barangsellout);
        $rootScope.statusbarangsellout      = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangsellout);


        $rootScope.barangsellin             = $rootScope.diffbarang(databarangall,barangsellin);
        $rootScope.statusbarangsellin       = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangsellin);

        $rootScope.barangexpired            = $rootScope.diffbarang(databarangall,barangsellin);
        $rootScope.statusbarangexpired      = $rootScope.cekstatuspanjangdiffbarang($rootScope.barangexpired);
        // ####################################################################################################
        $scope.updatestockqty = function(idproduct,index)
        {
            sweet.show(
            {
                title: 'Stock Quantity',
                text: 'Masukkan Jumlah Product: ' + idproduct,
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
                        sweet.show('Nice!', 'Saved');
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
        }
        // ####################################################################################################
        $scope.updatesellout = function(idproduct,index)
        {
            
            sweet.show(
            {
                title: 'Product Sell Out',
                text: 'Masukkan Jumlah Product: ' + idproduct,
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
                        sweet.show('Nice!', 'Saved');
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
        // ####################################################################################################
        $scope.updatesellin = function(idproduct,index)
        {
            sweet.show(
            {
                title: 'Sell In',
                text: 'Masukkan Jumlah Product: ' + idproduct,
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
                        sweet.show('Nice!', 'Saved');
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
        //#####################################################################################################
        $scope.starttakeapicture = function()
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
                var imagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                var gambarkunjungan={};

                gambarkunjungan.ID_DETAIL=ID_DETAIL;
                gambarkunjungan.IMG_NM_START="gambar start";
                gambarkunjungan.IMG_DECODE_START=imageData;
                gambarkunjungan.TIME_START=imagestart;
                gambarkunjungan.STATUS=1;
                gambarkunjungan.CREATE_BY=idsalesman;

                var result = $rootScope.seriliazeobject(detail);
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
                        $scope.noticestart="bg-green";
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
        //#####################################################################################################
        $scope.endtakeapicture = function()
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
                var imageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                var gambarkunjungan={};

                gambarkunjungan.ID_DETAIL=idjadwalkunjungan;
                gambarkunjungan.IMG_NM_END="gambar end";
                gambarkunjungan.IMG_DECODE_END=imageData;
                gambarkunjungan.TIME_END=imageend;
                gambarkunjungan.STATUS=1;
                gambarkunjungan.CREATE_BY=idsalesman;
                gambarkunjungan.ID_DETAIL=ID_DETAIL;

                var result = $rootScope.seriliazeobject(detail);
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
                    alert("Ambil Start Gambar Terlebih Dahulu");
                }
                
                else
                {
                    $http.post(url + "/gambars",serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        ngToast.create('Gambar Telah Berhasil Di Update');
                        $scope.noticestart="bg-green";
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
        //#####################################################################################################
        
        $scope.showmodal = function(kodebarang,index) 
        {
            ModalService
            .showModal(
            {
              templateUrl: "angular/partial/salesman/complexmodal.html",
              controller: "ComplexController",
              inputs: 
              {
                title: kodebarang
              }
            })
            .then(function(modal) 
            {
              modal.element.modal();
              modal.close.then(function(result) 
              {
                $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
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
        };

        //######################################
        var dataproductsummary = $.ajax
        ({
              url: url + "/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01",
              type: "GET",
              dataType:"json",
              async: false
        }).responseText;

        var ProductSummary = JSON.parse(dataproductsummary)['BarangPenjualan'];

        $scope.BarangSummary = [];
        angular.forEach(ProductSummary, function(value, key)
        {
            var bsm = {};
            summarikdbarang = value.KD_BARANG;
            bsm.KD_BARANG = value.KD_BARANG;
            
            var summarysellin = $.ajax
            ({
                  url: url + "/productinventories/search?CUST_KD=" + CUST_ID + "&TGL=" + PLAN_TGL_KUNJUNGAN + "&SO_TYPE=6&KD_BARANG="+ summarikdbarang,
                  type: "GET",
                  dataType:"json",
                  async: false
            }).responseText;

            var SELL_IN = JSON.parse(summarysellin)['ProductInventory'];
            if(SELL_IN != undefined)
            {

                bsm.SELL_IN = parseInt(SELL_IN[0].SO_QTY);
            }
            else
            {
                bsm.SELL_IN = 0
            }


            var summarysellout = $.ajax
            ({
                  url: url + "/productinventories/search?CUST_KD=" + CUST_ID + "&TGL=" + PLAN_TGL_KUNJUNGAN + "&SO_TYPE=7&KD_BARANG="+ summarikdbarang,
                  type: "GET",
                  dataType:"json",
                  async: false
            }).responseText;

            var SELL_OUT = JSON.parse(summarysellout)['ProductInventory'];
            if(SELL_OUT != undefined)
            {
                
                bsm.SELL_OUT = parseInt(SELL_OUT[0].SO_QTY);
            }
            else
            {
                bsm.SELL_OUT = 0;
            }
            

            var summarystock= $.ajax
            ({
                  url: url + "/productinventories/search?CUST_KD=" + CUST_ID + "&TGL=" + PLAN_TGL_KUNJUNGAN + "&SO_TYPE=5&KD_BARANG="+ summarikdbarang,
                  type: "GET",
                  dataType:"json",
                  async: false
            }).responseText;
            var STOCK = JSON.parse(summarystock)['ProductInventory'];
            if(STOCK != undefined)
            {
                
                bsm.STOCK = parseInt(STOCK[0].SO_QTY);
            }
            else
            {
                bsm.STOCK = 0
            }

            $scope.BarangSummary.push(bsm);
        });
        
        var totalsellin = 0;
        var totalsellout = 0;
        var totalstockqty = 0;
        angular.forEach($scope.BarangSummary, function(value, key)
        {
            var sellin      = parseInt(value.SELL_IN);
            var sellout     = parseInt(value.SELL_OUT);
            var stockqty    = parseInt(value.STOCK);

            totalsellin         = totalsellin + sellin;
            totalsellout        = totalsellout + sellout;
            totalstockqty       = totalstockqty + stockqty;

        });
        $scope.totalsellin          = totalsellin;
        $scope.totalsellout         = totalsellout;
        $scope.totalstockqty        = totalstockqty;
    });  
}]);

myAppModule.controller('ComplexController', ['$scope', '$element', 'title', 'close', 
function($scope, $element, title, close) 
{

  $scope.name = null;
  $scope.age = null;
  $scope.title = title;
  
  $scope.close = function() 
  {
      close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.cancel = function() 
  {
    $element.modal('hide');
  };

}]);