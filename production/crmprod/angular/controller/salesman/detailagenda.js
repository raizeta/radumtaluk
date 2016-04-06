myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig","$routeParams",
function ($rootScope,$scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig,$routeParams) 
{
    var url = $rootScope.linkurl;

    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalplan     = $routeParams.idtanggal;
    
    var idtanggal = $routeParams.idtanggal;

    $scope.viewtanggal = idtanggal;
    var idsalesman = auth.id;
    var data = $.ajax
    ({
          //url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
          url: url + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var myData = data;
    var mt = JSON.parse(myData)['JadwalKunjungan'];

    $scope.events = [];

    angular.forEach(mt, function(value, key)
    {
        var tanggal= value.TGL1;
        console.log(tanggal);
        var data ={};
        data.title = 'Visit Group Barat';
        data.start = new Date(tanggal);
        data.allDay =true;
        data.url ="#/agenda/" + tanggal;
        $scope.events.push(data);
    });

    $scope.uiConfig = 
    {
      calendar:
      {
        height: 450,
        editable: true,
        header:
        {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },

        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };



    $scope.eventSources = [$scope.events];


    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });
    
    //var tanggals = new Date();
    var idtanggal = idtanggal;
    $scope.loading  = true;
    var idsalesman = auth.id;
    // var tanggal = "2016-02-02";
    apiService.listagenda(idsalesman,idtanggal)
    .then(function (result) 
    {
        if(result.JadwalKunjungan)
        {
            var idgroupcustomer;
            angular.forEach(result.JadwalKunjungan, function(value, key) 
            {
              idgroupcustomer =value.SCDL_GROUP;
            });

            // singleapiService.singlelistgroupcustomer(idgroupcustomer)
            // .then(function (result) 
            // {
            //     $scope.customers = result.Customer;
            //     $scope.loading  = false;
            // });
            singleapiService.singlelistgroupcustomer(idgroupcustomer)
            .then(function (result) 
            {
                //$scope.customers = result.Customer;

                $scope.loading  = false;
                $scope.customers = [];
                angular.forEach(result.Customer, function(value, key) 
                {
                    var ab={};
                    ab.CUST_KD          = value.CUST_KD;
                    ab.CUST_NM          = value.CUST_NM;
                    ab.MAP_LAT          = value.MAP_LAT;
                    ab.MAP_LNG          = value.MAP_LNG;
                    ab.TANGGAL          = idtanggal;
                    ab.ALAMAT           = value.ALAMAT;

                    var idcustomer      =value.CUST_KD;

                    var datas = $.ajax
                    ({
                          //url: "http://labtest3-api.int/master/detailkunjungans/search?USER_ID="+ idsalesman + "&CUST_ID=" + idcustomer +"&TGL=" + idtanggal,
                          url: url + "/detailkunjungans/search?USER_ID="+ idsalesman + "&CUST_ID=" + idcustomer +"&TGL=" + idtanggal,
                          type: "GET",
                          dataType:"json",
                          async: false
                    }).responseText;

                    var mts = JSON.parse(datas)['DetailKunjungan'];
                    if(mts)
                    {
                        var mts = JSON.parse(datas)['DetailKunjungan'];
                        ab.ID = mts[0].ID;
         
                        var datasatu = $.ajax
                        ({
                              //url: "http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + ab.ID + "&IMG_NM=gambar start",
                              url: url + "/gambarkunjungans/search?ID_DETAIL=" + ab.ID + "&IMG_NM_START=gambar start",
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

                        var datadua = $.ajax
                        ({
                              //url: "http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + ab.ID + "&IMG_NM=gambar end",
                              url: url + "/gambarkunjungans/search?ID_DETAIL=" + ab.ID + "&IMG_NM_END=gambar end",
                              type: "GET",
                              dataType:"json",
                              async: false
                        });

                        if(datadua.status == "404")
                        {
                            $rootScope.hasilend = 0;
                        }
                        if(datadua.status == "200")
                        {
                            $rootScope.hasilend = 1;
                        }

                        // var tanggalinventory = $filter('date')(new Date(),'yyyy-MM-dd');
                        // var datainventory = $.ajax
                        // ({
                        //       //url: "http://labtest3-api.int/master/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalinventory,
                        //       url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan,
                        //       type: "GET",
                        //       dataType:"json",
                        //       async: false
                        // }).responseText;

                        // var Inventory = JSON.parse(datainventory)['ProductInventory'];

                        // $scope.inventory = [];
                        // angular.forEach(Inventory, function(value, key)
                        // {
                            
                        //     KD_BARANG = value.KD_BARANG;
                        //     $scope.inventory.push(KD_BARANG);

                        // });

                        // var dataproduct = $.ajax
                        // ({
                        //       //url: "http://labtest3-api.int/master/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01",
                        //       url: url + "/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01",
                        //       type: "GET",
                        //       dataType:"json",
                        //       async: false
                        // }).responseText;

                        // var Product = JSON.parse(dataproduct)['BarangPenjualan'];

                        // $scope.Barang = [];
                        // angular.forEach(Product, function(value, key)
                        // {
                        //     // var data ={};
                        //     var KD_BARANG = value.KD_BARANG;
                        //     $scope.Barang.push(KD_BARANG);

                        // });
                        // //console.log($scope.Barang);

                        // $scope.user3 = _.difference($scope.Barang,$scope.inventory);
                        // //console.log("User Tiga " + $scope.user3);

                        // var resultdiff = [];

                        // angular.forEach($scope.Barang, function(key) 
                        // {
                        //   if (-1 === $scope.inventory.indexOf(key)) 
                        //   {
                        //     resultdiff.push(key);
                        //   }
                        // });
                        // //console.log($scope.Barang);
                        // //console.log($scope.inventory);
                        // //console.log(resultdiff);

                        // var barangsai=[];
                        // for(var i =0; i < resultdiff.length; i++)
                        // {
                        //     var data = {}
                        //     data.KD_BARANG = resultdiff[i];
                        //     barangsai.push(data);
                        // }

                        // $rootScope.barangsai = barangsai;

                        // if($rootScope.barangsai.length == 0)
                        // {
                        //     $rootScope.hasilinventory = 1;
                        // }
                        // else
                        // {
                        //     $rootScope.hasilinventory = 0;
                        // }

                        var datainventorysellin = $.ajax
                        ({
                              //url: "http://labtest3-api.int/master/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalinventory,
                              url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan + "&SO_TYPE=6",
                              type: "GET",
                              dataType:"json",
                              async: false
                        });

                        if(datainventorysellin.status == "404")
                        {
                            $rootScope.hasilinventorysellin = 0;
                        }
                        if(datainventorysellin.status == "200")
                        {
                            $rootScope.hasilinventorysellin = 1;
                        }

                        var datainventorystock = $.ajax
                        ({
                              //url: "http://labtest3-api.int/master/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalinventory,
                              url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan + "&SO_TYPE=5",
                              type: "GET",
                              dataType:"json",
                              async: false
                        });
                        
                        if(datainventorystock.status == "404")
                        {
                            $rootScope.datainventorystock = 0;
                        }
                        if(datainventorystock.status == "200")
                        {
                            $rootScope.datainventorystock = 1;
                        }

                        $rootScope.jumlahstartdanend = $rootScope.hasilend + $rootScope.hasilstart + $rootScope.hasilinventorysellin + $rootScope.datainventorystock;
                        var persen = ($rootScope.jumlahstartdanend * 100)/4;
                        ab.persen = persen;
                        if(persen == 100)
                        {
                            ab.wanted = true;
                        }
    

                    }
                    else
                    {
                        ab.persen = 0;
                    }

                    $scope.customers.push(ab);
                });
                // console.log($scope.customers);
            });

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
                    window.location.href = "index.html";
                }
            });
        }
    });

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);