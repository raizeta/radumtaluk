myAppModule.controller("DetailCustomerController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService","ngToast","$mdDialog","$filter","sweet",
function ($rootScope,$scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService,ngToast,$mdDialog,$filter,sweet) 
{
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    var url = $rootScope.linkurl;

    var idsalesman  = auth.id;
    $scope.checkouttanggal = $routeParams.idtanggal;
    $scope.checkoutcustomer = $routeParams.idcustomer;
    var idcustomer  = $routeParams.idcustomer;
    var tanggal     = $routeParams.idtanggal;
    var tanggalplan     = $routeParams.idtanggal;

    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalinventory = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.loading = true;
    $scope.zoomvalue = 17;
    var geocoder = new google.maps.Geocoder;

    LocationService.GetLocation().then(function(data)
    {
        //alert("Cek Location Service");
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
        singleapiService.singlelistcustomer(idcustomer)
        .then(function (result) 
        {
     
            $scope.customer = result;
            $scope.loading  = false;
            
            var longitude1     = $scope.lat;
            var latitude1      = $scope.long;

            $scope.customerlat = result.MAP_LNG;
            $scope.customerlong = result.MAP_LAT;

            var longitude2     = result.MAP_LAT;
            var latitude2      = result.MAP_LNG;

            var thetalong      = (longitude1 - longitude2)*(Math.PI / 180); 
            var thetalat       = (latitude1 - latitude2)*(Math.PI / 180);

            var a = 0.5 - Math.cos(thetalat)/2 + Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180) * (1 - Math.cos(thetalong))/2;
            var jarak = 12742 * Math.asin(Math.sqrt(a));
            console.log(jarak);
            var dataradius = $.ajax
            ({
                  //url: "http://labtest3-api.int/master/detailkunjungans/search?USER_ID="+ idsalesman + "&CUST_ID=" + idcustomer +"&TGL=" + tanggal,
                  url: url + "/configurations/search?note=CHECKIN",
                  type: "GET",
                  dataType:"json",
                  async: false
            }).responseText;

            var dataradiuscustomer = JSON.parse(dataradius)['Configuration'];

            var radiusmaks = dataradiuscustomer[0].value;

            singleapiService.detailkunjungan(idsalesman,idcustomer,tanggal)
            .then(function (result) 
            {
                if(result.DetailKunjungan)
                {
                    var iddetailkunjungan = result.DetailKunjungan;
                    var id = iddetailkunjungan[0].ID;

                    $http.get(url + "/gambarkunjungans/search?ID_DETAIL=" + id + "&IMG_NM_START=gambar start",config)
                    .success(function(data,status, headers, config) 
                    {
                        //console.log(data);
                        $scope.noticestart="bg-green";
                        $scope.noticestartgambar="fa fa-check";
                    });

                    $http.get(url + "/gambarkunjungans/search?ID_DETAIL=" + id + "&IMG_NM_END=gambar end",config)
                    .success(function(data,status, headers, config) 
                    {
                        //console.log(data);
                        $scope.noticeend="bg-green";
                        $scope.noticeendgambar="fa fa-check";
                    });
                }

                else
                {
                    function serializeObj(obj) 
                    {
                      var result = [];
                      for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                      return result.join("&");
                    }
                    var checkintime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    var detail={};

                    detail.USER_ID=idsalesman;
                    detail.CUST_ID=idcustomer;
                    detail.TGL=tanggal;
                    detail.LAT=$scope.lat;
                    detail.LAG=$scope.long = data.longitude;
                    detail.RADIUS=jarak;
                    detail.CREATE_BY=idsalesman;
                    detail.SCDL_GROUP=$scope.customer.SCDL_GROUP;
                    detail.CHECKIN_TIME= checkintime;

                    var serialized = serializeObj(detail); 
                    var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };

                    if( radiusmaks > jarak)
                    {

                        $http.post(url + "/detailkunjungans",serialized,config)
                        .success(function(data,status, headers, config) 
                        {
                            ngToast.create('Detail Telah Berhasil Di Update');
                        })

                        .finally(function()
                        {
                            $scope.loading = false;  
                        });
                    }
                    else
                    {
                        sweet.show(
                        {
                            title: 'Confirm',
                            text: 'Kamu Tidak Di Dalam Radius',
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'OK',
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, 
                        function(isConfirm) 
                        {
                            if (isConfirm) 
                            {
                                $location.path('/agenda/'+ tanggal);
                                $scope.$apply();
                            }
                        });

                    }

                 
                }
            });
        });
    });

    // #########################################################################################################################################
    var dataproduct = $.ajax
    ({
          url: url + "/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01",
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var Product = JSON.parse(dataproduct)['BarangPenjualan'];

    $scope.Barang = [];
    angular.forEach(Product, function(value, key)
    {
        var KD_BARANG = value.KD_BARANG;
        $scope.Barang.push(KD_BARANG);
    });

    var inventorysellin = $.ajax
    ({
          url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan + "&SO_TYPE=6",
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var sellin = JSON.parse(inventorysellin)['ProductInventory'];
    $scope.inventorysellin = [];
    angular.forEach(sellin, function(value, key)
    {
        KD_BARANG = value.KD_BARANG;
        $scope.inventorysellin.push(KD_BARANG);
    });

    var resultdiffsellin = [];
    angular.forEach($scope.Barang, function(key) 
    {
      if (-1 === $scope.inventorysellin.indexOf(key)) 
      {
        resultdiffsellin.push(key);
      }
    });

    var barangsellin=[];
    for(var i =0; i < resultdiffsellin.length; i++)
    {
        var data = {}
        data.KD_BARANG = resultdiffsellin[i];
        barangsellin.push(data);
    }

    $rootScope.barangsellin = barangsellin;

    if($rootScope.barangsellin.length == 0)
    {
        $scope.noticesellin="bg-green";
        $scope.noticesellinicon="fa fa-check";
        $scope.sellinshow = false;
    }
    
    else
    {
        $scope.sellinshow= true; 
    }

    $scope.updatesellin = function(idproduct,index)
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Action Ini");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Kamu Belum Bisa Melakukan Action Ini");
        }
        else
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


                    function serializeObj(obj) 
                    {
                      var result = [];
                      for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                      return result.join("&");
                    }

                    var tanggal = tanggalplan;
                    var detail={};
                    detail.SO_TYPE=6;
                    detail.TGL=tanggal;
                    detail.CUST_KD= idcustomer;
                    detail.KD_BARANG=idproduct;
                    detail.POS='ANDROID';
                    detail.USER_ID=idsalesman;
                    detail.SO_QTY=inputValue;
                    var serialized = serializeObj(detail); 
                    var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };

                    $http.post(url + "/productinventories",serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        sweet.show('Nice!', 'Saved');
                        // var target = angular.element('#'+index);
                        // target.remove();
                        $scope.barangsellin.splice(index,1);
                        //console.log($scope.barangs.length);
                        if($scope.barangsellin.length == 0)
                        {
                            $scope.noticesellin="bg-green";
                            $scope.noticeinventoryicon="fa fa-check";
                            $scope.sellinshow = false;
                        }
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                }
            });
        }
    }


    //#####################################################################################################
    var inventorysellout = $.ajax
    ({
          url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan + "&SO_TYPE=7",
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var sellout = JSON.parse(inventorysellout)['ProductInventory'];
    $scope.inventorysellout = [];
    angular.forEach(sellout, function(value, key)
    {
        KD_BARANG = value.KD_BARANG;
        $scope.inventorysellout.push(KD_BARANG);
    });

    var resultdiffsellout = [];
    angular.forEach($scope.Barang, function(key) 
    {
      if (-1 === $scope.inventorysellout.indexOf(key)) 
      {
        resultdiffsellout.push(key);
      }
    });

    var barangsellout=[];
    for(var i =0; i < resultdiffsellout.length; i++)
    {
        var data = {}
        data.KD_BARANG = resultdiffsellout[i];
        barangsellout.push(data);
    }

    $rootScope.barangsellout = barangsellout;
    //console.log($rootScope.barangsellout.length);
    if($rootScope.barangsellout.length == 0)
    {
        $scope.noticesellout="bg-green";
        $scope.noticesellouticon="fa fa-check";
        $scope.selloutshow = false;
    }
    else
    {
        $scope.selloutshow= true;
    }

    // $scope.user3 = _.difference($scope.Barang,$scope.inventory);
    $scope.updatesellout = function(idproduct,index)
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Action Ini");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Kamu Belum Bisa Melakukan Action Ini");
        }
        else
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


                    function serializeObj(obj) 
                    {
                      var result = [];
                      for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                      return result.join("&");
                    }

                    var tanggal = tanggalplan;
                    var detail={};
                    detail.SO_TYPE=7;
                    detail.TGL=tanggal;
                    detail.CUST_KD= idcustomer;
                    detail.KD_BARANG=idproduct;
                    detail.POS='ANDROID';
                    detail.USER_ID=idsalesman;
                    detail.SO_QTY=inputValue;
                    var serialized = serializeObj(detail); 
                    var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };
                    $http.post(url + "/productinventories",serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        sweet.show('Nice!', 'Saved');
                        // var target = angular.element('#'+index);
                        // target.remove();
                        $scope.barangsellout.splice(index,1);
                        //console.log($scope.barangs.length);
                        if($scope.barangsellout.length == 0)
                        {
                            $scope.noticesellout="bg-green";
                            $scope.noticesellouticon="fa fa-check";
                            $scope.selloutshow = false;
                        }
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                }
            });
        }
    }


// #########################################################################################################################################

    var inventorystockqty = $.ajax
    ({
          url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan + "&SO_TYPE=5",
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var stockqty = JSON.parse(inventorystockqty)['ProductInventory'];
    $scope.inventorystockqty = [];
    angular.forEach(stockqty, function(value, key)
    {
        KD_BARANG = value.KD_BARANG;
        $scope.inventorystockqty.push(KD_BARANG);
    });

    var resultdiffinventorystockqty = [];
    angular.forEach($scope.Barang, function(key) 
    {
      if (-1 === $scope.inventorystockqty.indexOf(key)) 
      {
        resultdiffinventorystockqty.push(key);
      }
    });

    var barangstockqty=[];
    for(var i =0; i < resultdiffinventorystockqty.length; i++)
    {
        var data = {}
        data.KD_BARANG = resultdiffinventorystockqty[i];
        barangstockqty.push(data);
    }

    $rootScope.barangstockqty = barangstockqty;

    if($rootScope.barangstockqty.length == 0)
    {
        $scope.noticestockqty="bg-green";
        $scope.noticestockqtyicon="fa fa-check";
        $scope.stockqtyshow = false;
    }
    
    else
    {
        $scope.stockqtyshow= true; 
    }

    $scope.updatestockqty = function(idproduct,index)
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Action Ini");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Kamu Belum Bisa Melakukan Action Ini");
        }
        else
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


                    function serializeObj(obj) 
                    {
                      var result = [];
                      for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                      return result.join("&");
                    }

                    var tanggal = tanggalplan;
                    var detail={};
                    detail.SO_TYPE=5;
                    detail.TGL=tanggal;
                    detail.CUST_KD= idcustomer;
                    detail.KD_BARANG=idproduct;
                    detail.POS='ANDROID';
                    detail.USER_ID=idsalesman;
                    detail.SO_QTY=inputValue;
                    var serialized = serializeObj(detail); 
                    var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };
                    $http.post(url + "/productinventories",serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        sweet.show('Nice!', 'Saved');
                        // var target = angular.element('#'+index);
                        // target.remove();
                        $scope.barangstockqty.splice(index,1);
                        //console.log($scope.barangs.length);
                        if($scope.barangstockqty.length == 0)
                        {
                            $scope.noticestockqty="bg-green";
                            $scope.noticestockqtyicon="fa fa-check";
                            $scope.stockqtyshow = false;
                        }
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                }
            });
        }
    }

    //#####################################################################################################

    $scope.scanbarcode = function()
    {
        $cordovaBarcodeScanner.scan().then(function(imageData) 
        {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, 
        function(error) 
        {
            console.log("An error happened -> " + error);
        });
    }

    $scope.starttakeapicture = function()
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Action Ini");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Kamu Belum Bisa Melakukan Action Ini");
        }
        else
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
                //var image = document.getElementById('myImage');
                //image.src = "data:image/jpeg;base64," + imageData;
                singleapiService.detailkunjungan(idsalesman,idcustomer,tanggal)
                .then(function (result) 
                {
                    idjadwalkunjungan = result.DetailKunjungan[0].ID;
                    function serializeObj(obj) 
                    {
                      var result = [];
                      for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                      return result.join("&");
                    }

                    var imagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    var gambarkunjungan={};

                    gambarkunjungan.ID_DETAIL=idjadwalkunjungan;
                    gambarkunjungan.IMG_NM_START="gambar start";
                    gambarkunjungan.IMG_DECODE_START=imageData;
                    gambarkunjungan.TIME_START=imagestart;
                    gambarkunjungan.STATUS=1;
                    gambarkunjungan.CREATE_BY=idsalesman;

                    var serialized = serializeObj(gambarkunjungan); 
                    var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };

                    var datagambar = $.ajax
                    ({
                          //url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
                          url: url + "/gambars/search?ID_DETAIL="+ idjadwalkunjungan,
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

                            
                });
              }, 
              function(err) 
              {
                // error
              });

            }, false);
        }
    }



    $scope.endtakeapicture = function()
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Kamu Tidak Bisa Lagi Melakukan Action Ini");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Kamu Belum Bisa Melakukan Action Ini");
        }
        else
        {
            document.addEventListener("deviceready", function () {

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
                //var image = document.getElementById('myImage');
                //image.src = "data:image/jpeg;base64," + imageData;
                singleapiService.detailkunjungan(idsalesman,idcustomer,tanggal)
                .then(function (result) 
                {
                    idjadwalkunjungan = result.DetailKunjungan[0].ID;
                    function serializeObj(obj) 
                    {
                      var result = [];
                      for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                      return result.join("&");
                    }

                    var imageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                    var gambarkunjungan={};

                    gambarkunjungan.ID_DETAIL=idjadwalkunjungan;
                    gambarkunjungan.IMG_NM_END="gambar end";
                    gambarkunjungan.IMG_DECODE_END=imageData;
                    gambarkunjungan.TIME_END=imageend;
                    gambarkunjungan.STATUS=1;
                    gambarkunjungan.CREATE_BY=idsalesman;

                    var serialized = serializeObj(gambarkunjungan); 
                    var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };

                    var datagambar = $.ajax
                    ({
                          url: url + "/gambars/search?ID_DETAIL="+ idjadwalkunjungan,
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
                              url: url + "/gambars/search?ID_DETAIL="+ idjadwalkunjungan,
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
                            $scope.noticeend="bg-green";
                        })

                        .finally(function()
                        {
                            $scope.loading = false;
                              
                        });

                    }
                });
              }, 
              function(err) 
              {
                // error
              });

            }, false);
        }
    }

    $scope.checkout = function(checkouttanggal,checkoutcustomer)
    {
        LocationService.GetLocation().then(function(data)
        {
        //alert("Cek Location Service");
            $scope.lat = data.latitude;
            $scope.long = data.longitude;
            singleapiService.detailkunjungan(idsalesman,checkoutcustomer,checkouttanggal)
            .then(function (result) 
            {
                var IDDETAIL = result.DetailKunjungan[0].ID;

                function serializeObj(obj) 
                {
                  var result = [];
                  for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                  return result.join("&");
                }
                var checkouttime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                var detail={};

                detail.CHECKOUT_LAT=$scope.lat;
                detail.CHECKOUT_LAG= $scope.long;
                detail.CHECKOUT_TIME= checkouttime;

                var serialized = serializeObj(detail); 
                var config = 
                {
                    headers : 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                        
                    }
                };

                $http.put(url + "/detailkunjungans/" + IDDETAIL,serialized,config)
                .success(function(data,status, headers, config) 
                {
                    ngToast.create('Detail Telah Berhasil Di Update');
                    $location.path('/agenda/'+ checkouttanggal);
                })

                .finally(function()
                {
                    $scope.loading = false;  
                });

            });
        });
    }
    //######################################
    // $scope.cekstartgambar = function()
    // {

    //         //var image = document.getElementById('myImage');
    //         //image.src = "data:image/jpeg;base64," + imageData;
    //         singleapiService.detailkunjungan(idsalesman,idcustomer,tanggal)
    //         .then(function (result) 
    //         {
    //             idjadwalkunjungan = result.DetailKunjungan[0].ID;
    //             function serializeObj(obj) 
    //             {
    //               var result = [];
    //               for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    //               return result.join("&");
    //             }

    //             var imagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    //             var gambarkunjungan={};

    //             gambarkunjungan.ID_DETAIL=idjadwalkunjungan;
    //             gambarkunjungan.IMG_NM_START="gambar start";
    //             // gambarkunjungan.IMG_DECODE_START=imageData;
    //             gambarkunjungan.TIME_START=imagestart;
    //             gambarkunjungan.STATUS=1;
    //             gambarkunjungan.CREATE_BY=idsalesman;

    //             var serialized = serializeObj(gambarkunjungan); 
    //             var config = 
    //             {
    //                 headers : 
    //                 {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                        
    //                 }
    //             };
    //             var datagambar = $.ajax
    //             ({
    //                   //url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
    //                   url: url + "/gambars/search?ID_DETAIL="+ idjadwalkunjungan,
    //                   type: "GET",
    //                   dataType:"json",
    //                   async: false
    //             });
    //             if(datagambar.status == "404")
    //             {
    //                 $http.post(url + "/gambars",serialized,config)
    //                 .success(function(data,status, headers, config) 
    //                 {
    //                     ngToast.create('Gambar Telah Berhasil Di Update');
    //                     $scope.noticestart="bg-green";
    //                 })

    //                 .finally(function()
    //                 {
    //                     $scope.loading = false;
                          
    //                 });
    //             }

    //             else
    //             {
                    
    //             }


    //         });
    // }

    //######################################
    // $scope.cekendgambar = function()
    // {

    //     //var image = document.getElementById('myImage');
    //     //image.src = "data:image/jpeg;base64," + imageData;
    //     singleapiService.detailkunjungan(idsalesman,idcustomer,tanggal)
    //     .then(function (result) 
    //     {
    //         idjadwalkunjungan = result.DetailKunjungan[0].ID;
    //         function serializeObj(obj) 
    //         {
    //           var result = [];
    //           for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    //           return result.join("&");
    //         }

    //         var imageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    //         var gambarkunjungan={};

    //         gambarkunjungan.ID_DETAIL=idjadwalkunjungan;
    //         gambarkunjungan.IMG_NM_END="gambar end";
    //         //gambarkunjungan.IMG_DECODE_END=imageData;
    //         gambarkunjungan.TIME_END=imageend;
    //         gambarkunjungan.STATUS=1;
    //         gambarkunjungan.CREATE_BY=idsalesman;

    //         var serialized = serializeObj(gambarkunjungan); 
    //         var config = 
    //         {
    //             headers : 
    //             {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
    //             }
    //         };

    //         var datagambar = $.ajax
    //         ({
    //               //url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
    //               url: url + "/gambars/search?ID_DETAIL="+ idjadwalkunjungan,
    //               type: "GET",
    //               dataType:"json",
    //               async: false
    //         });

    //         if(datagambar.status == "404")
    //         {
    //             alert("Ambil Start Gambar Terlebih Dahulu");
    //         }
            
    //         else
    //         {
                
    //             var datagambar = $.ajax
    //             ({
    //                   url: url + "/gambars/search?ID_DETAIL="+ idjadwalkunjungan,
    //                   type: "GET",
    //                   dataType:"json",
    //                   async: false
    //             }).responseText;

    //             var myData = datagambar;
    //             var mt = JSON.parse(myData)['Gambar'];
    //             var idgambar = mt[0].ID;

    //             $http.put(url + "/gambars/" + idgambar,serialized,config)
    //             .success(function(data,status, headers, config) 
    //             {
    //                 ngToast.create('Gambar Telah Berhasil Di Update');
    //                 $scope.noticeend="bg-green";
    //             })

    //             .finally(function()
    //             {
    //                 $scope.loading = false;
                      
    //             });

    //         }
    //     });
    // }
}]);