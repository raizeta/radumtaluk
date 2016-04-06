'use strict';
myAppModule.controller("AgendaTodayController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig",
function ($rootScope,$scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig) 
{
    $scope.userInfo = auth;
    var url = $rootScope.linkurl;
    
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
    var tanggal = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.loading  = true;
    var idsalesman = auth.id;
    // var tanggal = "2016-02-02";
    apiService.listagenda(idsalesman,tanggal)
    .then(function (result) 
    {
        // console.log(result.JadwalKunjungan);
        if(result.JadwalKunjungan)
        {
            var idgroupcustomer;
            angular.forEach(result.JadwalKunjungan, function(value, key) 
            {
              idgroupcustomer =value.SCDL_GROUP;
            });

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
                    ab.TANGGAL          = tanggal;
                    var idcustomer =value.CUST_KD;

                    var datas = $.ajax
                    ({
                          //url: "http://labtest3-api.int/master/detailkunjungans/search?USER_ID="+ idsalesman + "&CUST_ID=" + idcustomer +"&TGL=" + tanggal,
                          url: url + "/detailkunjungans/search?USER_ID="+ idsalesman + "&CUST_ID=" + idcustomer +"&TGL=" + tanggal,
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

                        var datainventorysellin = $.ajax
                        ({
                              //url: "http://labtest3-api.int/master/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalinventory,
                              url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggal + "&SO_TYPE=6",
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
                              url: url + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggal + "&SO_TYPE=5",
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

                        $rootScope.jumlahstartdanend = $rootScope.hasilend + $rootScope.hasilstart + $rootScope.hasilinventorysellin + $rootScope.datainventorystock ;
                        var persen = ($rootScope.jumlahstartdanend * 100)/4;
                        ab.persen = persen;
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
                    $location.path('/history');
                    $scope.$apply();
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


myAppModule.controller("MapAgendaController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService",
function ($scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService) 
{
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });

    $scope.loading  = true;
    var idsalesman = auth.id;
    var tanggal = $filter('date')(new Date(),'yyyy-MM-dd');
    apiService.listagenda(idsalesman,tanggal)
    .then(function (result) 
    {
        var idgroupcustomer;
        angular.forEach(result.JadwalKunjungan, function(value, key) 
        {
          idgroupcustomer =value.SCDL_GROUP;
        });

        singleapiService.singlelistgroupcustomer(idgroupcustomer)
        .then(function (result) 
        {
            console.log(result);
            $scope.customers = result.Customer;
            $scope.loading  = false;
        });
    });
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);