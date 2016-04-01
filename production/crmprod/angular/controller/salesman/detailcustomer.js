myAppModule.controller("DetailCustomerController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService","ngToast","$mdDialog","$filter","sweet",
function ($rootScope,$scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService,ngToast,$mdDialog,$filter,sweet) 
{
    var idsalesman  = auth.id;
    var idcustomer  = $routeParams.idcustomer;
    var tanggal     = $routeParams.idtanggal;
    var tanggalinventory = $filter('date')(new Date(),'yyyy-MM-dd');

    var dataproduct = $.ajax
    ({
          url: "http://labtest3-api.int/master/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01",
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
          url: "http://labtest3-api.int/master/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalinventory + "&SO_TYPE=6",
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
            if (inputValue === false)
            {
                return false;
            }
            if (inputValue === '') 
            {
                sweet.showInputError('You need to write something!');
                return false;
            }
            // sweet.show('Nice!', 'You wrote: ' + inputValue, 'success');
            else
            {


                function serializeObj(obj) 
                {
                  var result = [];
                  for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                  return result.join("&");
                }

                var tanggal = $filter('date')(new Date(),'yyyy-MM-dd');
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
                $http.post("http://labtest3-api.int/master/productinventories",serialized,config)
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


// #####################################################################################################
    var inventorysellout = $.ajax
    ({
          url: "http://labtest3-api.int/master/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalinventory + "&SO_TYPE=7",
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
    console.log($rootScope.barangsellout.length);
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
        sweet.show(
        {
            title: 'Sell Out',
            text: 'Masukkan Jumlah Product: ' + idproduct,
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: false,
            animation: false,
            inputPlaceholder: 'Write something'
        }, 
        function(inputValue) 
        {
            if (inputValue === false)
            {
                return false;
            }
            if (inputValue === '') 
            {
                sweet.showInputError('You need to write something!');
                return false;
            }
            // sweet.show('Nice!', 'You wrote: ' + inputValue, 'success');
            else
            {


                function serializeObj(obj) 
                {
                  var result = [];
                  for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                  return result.join("&");
                }

                var tanggal = $filter('date')(new Date(),'yyyy-MM-dd');
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
                $http.post("http://labtest3-api.int/master/productinventories",serialized,config)
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

    $scope.loading = true;
    $scope.zoomvalue = 17;
    var geocoder = new google.maps.Geocoder;

    var idsalesman = auth.id;

    LocationService.GetLocation().then(function(data)
    {
        //alert("Cek Location Service");
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
        singleapiService.singlelistcustomer(idcustomer)
        .then(function (result) 
        {
            
            // alert("Cek Single Customer");
            $scope.customer = result;
            //console.log(result);
            $scope.loading  = false;
            var longitude1     = $scope.lat;
            var latitude1      = $scope.long;

            var longitude2     = result.MAP_LAT;
            var latitude2      = result.MAP_LNG;

            //alert(longitude1);
            //alert(longitude2);

            var thetalong      = (longitude1 - longitude2)*(Math.PI / 180); 
            var thetalat       = (latitude1 - latitude2)*(Math.PI / 180);
            //console.log(thetalong);
            //console.log(thetalat);


            var a = 0.5 - Math.cos(thetalat)/2 + Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180) * (1 - Math.cos(thetalong))/2;
            var jarak = 12742 * Math.asin(Math.sqrt(a));

            singleapiService.detailkunjungan(idsalesman,idcustomer,tanggal)
            .then(function (result) 
            {
                if(result.DetailKunjungan)
                {
                    var iddetailkunjungan = result.DetailKunjungan;
                    var id = iddetailkunjungan[0].ID;

                    $http.get("http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + id + "&IMG_NM=gambar start",config)
                    .success(function(data,status, headers, config) 
                    {
                        //console.log(data);
                        $scope.noticestart="bg-green";
                        $scope.noticestartgambar="fa fa-check";
                    });

                    $http.get("http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + id + "&IMG_NM=gambar end",config)
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

                    var detail={};

                    detail.USER_ID=idsalesman;
                    detail.CUST_ID=idcustomer;
                    detail.TGL=tanggal;
                    detail.LAT=$scope.lat;
                    detail.LAG=$scope.long = data.longitude;
                    detail.RADIUS=jarak;
                    detail.CREATE_BY=idsalesman;
                    detail.SCDL_GROUP=$scope.customer.SCDL_GROUP;

                    var serialized = serializeObj(detail); 
                    var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };
                        

                    //console.log(jarak);
                    //if( 0.03 > jarak )
                  
                        //$http.post("http://api.lukison.int/master/detailkunjungans",serialized,config)
                    $http.post("http://labtest3-api.int/master/detailkunjungans",serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        //ngToast.create('Detail Telah Berhasil Di Update');
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
                 
                    // $scope.takeapicture = function()
                    // {
                    //     document.addEventListener("deviceready", function () {

                    //       var options = {
                    //         quality: 100,
                    //         destinationType: Camera.DestinationType.DATA_URL,
                    //         sourceType: Camera.PictureSourceType.CAMERA,
                    //         allowEdit: false,
                    //         encodingType: Camera.EncodingType.JPEG,
                    //         targetWidth: 100,
                    //         targetHeight: 100,
                    //         popoverOptions: CameraPopoverOptions,
                    //         saveToPhotoAlbum: false,
                    //         correctOrientation:true
                    //       };

                    //       $cordovaCamera.getPicture(options).then(function(imageData) 
                    //       {
                    //         var image = document.getElementById('myImage');
                    //         image.src = "data:image/jpeg;base64," + imageData;
                    //         var gambar = imageData;
                    //       }, 
                    //       function(err) 
                    //       {
                    //         // error
                    //       });

                    //     }, false);
                    // }
                }
            });
        });
    });

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

                var gambarkunjungan={};

                gambarkunjungan.ID_DETAIL=idjadwalkunjungan;
                gambarkunjungan.IMG_NM="gambar start";
                gambarkunjungan.IMG_DECODE=imageData;
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
                $http.post("http://labtest3-api.int/master/gambarkunjungans",serialized,config)
                .success(function(data,status, headers, config) 
                {
                    ngToast.create('Gambar Telah Berhasil Di Update');
                    //$scope.gambarstart ="success";
                    $scope.noticestart="bg-green";
                })

                .finally(function()
                {
                    $scope.loading = false;
                      
                });
                
            });
          }, 
          function(err) 
          {
            // error
          });

        }, false);
    }

    $scope.endtakeapicture = function()
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

                var gambarkunjungan={};

                gambarkunjungan.ID_DETAIL=idjadwalkunjungan;
                gambarkunjungan.IMG_NM="gambar end";
                gambarkunjungan.IMG_DECODE=imageData;
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
                $http.post("http://labtest3-api.int/master/gambarkunjungans",serialized,config)
                .success(function(data,status, headers, config) 
                {
                    ngToast.create('Gambar Telah Berhasil Di Update');
                    $scope.noticeend="bg-green";
                })

                .finally(function()
                {
                    $scope.loading = false;  
                });
                
            });
          }, 
          function(err) 
          {
            // error
          });

        }, false);
    }

}]);