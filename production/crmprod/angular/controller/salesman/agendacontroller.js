'use strict';
myAppModule.controller("AgendaController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig",
function ($rootScope,$scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig) 
{
    var idsalesman = auth.id;
    var data = $.ajax
    ({
          url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
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

                    var idcustomer =value.CUST_KD;

                    var datas = $.ajax
                    ({
                          url: "http://labtest3-api.int/master/detailkunjungans/search?USER_ID="+ idsalesman + "&CUST_ID=" + idcustomer +"&TGL=" + tanggal,
                          type: "GET",
                          dataType:"json",
                          async: false
                    }).responseText;

                    var mts = JSON.parse(datas)['DetailKunjungan'];
                    ab.ID = mts[0].ID;
                    // singleapiService.detailkunjungan(idsalesman,idcustomer,tanggal)
                    // .then(function (result) 
                    // {
                    //     //console.log(result.DetailKunjungan);  
                    //     // angular.forEach(result.DetailKunjungan, function(value, key) 
                    //     // {
                    //     //     var iddetailkunjungan =value.ID;
                    //     //     var datasatu = $.ajax
                    //     //     ({
                    //     //           url: "http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + iddetailkunjungan + "&IMG_NM=gambar start",
                    //     //           type: "GET",
                    //     //           dataType:"json",
                    //     //           async: false
                    //     //     });

                    //     //     if(datasatu.status == "404")
                    //     //     {
                    //     //         $rootScope.hasilstart = 0;
                    //     //     }
                    //     //     if(datasatu.status == "200")
                    //     //     {
                    //     //         $rootScope.hasilstart = 1;
                    //     //     }

                    //     //     var datadua = $.ajax
                    //     //     ({
                    //     //           url: "http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + iddetailkunjungan + "&IMG_NM=gambar end",
                    //     //           type: "GET",
                    //     //           dataType:"json",
                    //     //           async: false
                    //     //     });

                    //     //     if(datadua.status == "404")
                    //     //     {
                    //     //         $rootScope.hasilend = 0;
                    //     //     }

                    //     //     if(datadua.status == "200")
                    //     //     {
                    //     //         $rootScope.hasilend = 1;
                    //     //     }

                    //     //     $rootScope.totals = $rootScope.hasilend + $rootScope.hasilstart;
                    //     // });  
                    // });

                    var datasatu = $.ajax
                    ({
                          url: "http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + ab.ID + "&IMG_NM=gambar start",
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
                    // console.log($rootScope.hasilstart);


                    var datadua = $.ajax
                    ({
                          url: "http://labtest3-api.int/master/gambarkunjungans/search?ID_DETAIL=" + ab.ID + "&IMG_NM=gambar end",
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
                    $rootScope.jumlahstartdanend = $rootScope.hasilend + $rootScope.hasilstart;
                    var persen = ($rootScope.jumlahstartdanend * 100)/3;
                    ab.persen = persen;
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

myAppModule.controller("DetailAgendaController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","regionalService","singleapiService","NgMap","LocationService","$filter","sweet","$compile","uiCalendarConfig","$routeParams",
function ($scope, $location, $http, authService, auth,$window,apiService,regionalService,singleapiService,NgMap,LocationService,$filter,sweet,$compile,uiCalendarConfig,$routeParams) 
{
    var idtanggal = $routeParams.idtanggal;
    $scope.viewtanggal = idtanggal;
    var idsalesman = auth.id;
    var data = $.ajax
    ({
          url: "http://labtest3-api.int/master" + "/jadwalkunjungans/search?USER_ID="+ idsalesman,
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

            singleapiService.singlelistgroupcustomer(idgroupcustomer)
            .then(function (result) 
            {
                $scope.customers = result.Customer;
                $scope.loading  = false;
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