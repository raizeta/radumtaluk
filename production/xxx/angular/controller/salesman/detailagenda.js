//http://localhost/radumta_folder/production/crmprod/#/agenda/2016-04-08
//angular/partial/salesman/agenda.html
myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig","$routeParams",
function ($rootScope,$scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig,$routeParams) 
{
    var url = $rootScope.linkurl;

    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalplan     = $routeParams.idtanggal;

    if(tanggalsekarang == tanggalplan)
    {
        $scope.activeagendatoday = "active";
    }
    else
    {
        $scope.activehistory = "active";
    }


    
    
    var idtanggal = $routeParams.idtanggal;

    $scope.viewtanggal = idtanggal;
    var idsalesman = auth.id;

    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });
    
    var idtanggal = idtanggal;
    $scope.loading  = true;
    var idsalesman = auth.id;

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

            LocationService.GetLocation().then(function(data)
            {
                $scope.currentlat = data.latitude;
                $scope.currentlong = data.longitude;

                singleapiService.singledetailkunjungan(idsalesman,idgroupcustomer,idtanggal)
                .then(function (result) 
                {

                    $scope.loading  = false;
                    $scope.customers = [];
                    angular.forEach(result.DetailKunjungan, function(value, key) 
                    {
                        var ab={};
                        ab.ID               = value.ID;
                        ab.CUST_ID          = value.CUST_ID;
                        ab.CUST_NM          = value.CUST_NM;
                        ab.MAP_LAT          = value.MAP_LAT;
                        ab.MAP_LNG          = value.MAP_LNG;
                        ab.TANGGAL          = idtanggal;
                        //ab.ALAMAT           = value.ALAMAT;

                        var idcustomer      =value.CUST_ID;
                        var longitude1     = $scope.currentlat;
                        
                        var latitude1      = $scope.currentlong;

                        var longitude2     = value.MAP_LAT;
                        var latitude2      = value.MAP_LNG;

                        var thetalong      = (longitude1 - longitude2)*(Math.PI / 180); 
                        var thetalat       = (latitude1 - latitude2)*(Math.PI / 180);

                        var a = 0.5 - Math.cos(thetalat)/2 + Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180) * (1 - Math.cos(thetalong))/2;
                        var jarak = 12742 * Math.asin(Math.sqrt(a));

                        $scope.roundjarak = $filter('setDecimal')(jarak,2);
 
                        ab.JARAK = $scope.roundjarak  * 1000;

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


                        var datainventorysellin = $.ajax
                        ({
                              //url: "http://labtest3-api.int/master/productinventories/search?CUST_ID=" + idcustomer + "&TGL=" + tanggalinventory,
                              url: url + "/productinventories/search?CUST_KD=" + ab.CUST_ID  + "&TGL=" + tanggalplan + "&SO_TYPE=6",
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
                              //url: "http://labtest3-api.int/master/productinventories/search?CUST_ID=" + idcustomer + "&TGL=" + tanggalinventory,
                              url: url + "/productinventories/search?CUST_KD=" + ab.CUST_ID  + "&TGL=" + tanggalplan + "&SO_TYPE=5",
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

                        $scope.customers.push(ab);
                    });
                });
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
                    $location.path('/history');
                    $scope.$apply();
                }
            });
        }
    });

    // var dataproductsummaryall = $.ajax
    // ({
    //       url: url + "/inventorysummaryalls/search?TGL=" + idtanggal + "&USER_ID=" + idsalesman,
    //       type: "GET",
    //       dataType:"json",
    //       async: false
    // }).responseText;
    // var InventorySummaryAll = JSON.parse(dataproductsummaryall)['InventorySummaryAll'];
    // $scope.BarangSummaryAll = InventorySummaryAll;

    // $scope.totalstock       = $scope.BarangSummaryAll[0].TTL_STCK;
    // $scope.totalsellin      = $scope.BarangSummaryAll[0].TTL_SELL_IN;
    // $scope.totalsellout     = $scope.BarangSummaryAll[0].TTL_SELL_OUT;

    var datajson = 
    {
        "Summary":
            [
                {
                    "namacustomer" : "HARI SWALAYAN CIBINONG",
                    "productsatu"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "productdua"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "producttiga"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "productempat"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "productlima"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    }
                },
                {
                    "namacustomer" : "HARI SWALAYAN CIREBON",
                    "productsatu"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "productdua"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "producttiga"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "productempat"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    },
                    "productlima"  :
                    {
                        "sellin"    :30,
                        "sellout"   :40,
                        "stock"     :50,
                    }
                }
            ]
    }

    $scope.datajson = datajson.Summary;
    console.log($scope.datajson);

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

