myAppModule.controller("DetailAgendaController", ["$rootScope","$scope", "$location","$http","auth","$window","SummaryService","NgMap","LocationService","$filter","sweet","$routeParams","$timeout","JadwalKunjunganService","singleapiService","configurationService","LastVisitService","$cordovaSQLite",
function ($rootScope,$scope, $location, $http,auth,$window,SummaryService,NgMap,LocationService,$filter,sweet,$routeParams,$timeout,JadwalKunjunganService,singleapiService,configurationService,LastVisitService,$cordovaSQLite)
{
    $scope.userInfo = auth;
    $scope.loadingcontent  = true;
    var idsalesman = auth.id;
    $scope.data = 
    {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalplan     = $filter('date')($routeParams.idtanggal,'yyyy-MM-dd');

    if(tanggalsekarang == tanggalplan)
    {
        $scope.activeagendatoday = "active";
    }
    else
    {
        $scope.activehistory = "active";
    }

    LocationService.GetGpsLocation()
    .then(function(data)
    {
        $scope.datagpslocation = data;
        $scope.gpslat   = data.latitude;
        $scope.gpslong  = data.longitude;
    });

    document.addEventListener("deviceready", function () 
    {
        var queryagendatoday = "SELECT * FROM Agenda WHERE TGL = ? AND USER_ID = ?";
        $cordovaSQLite.execute($rootScope.db, queryagendatoday, [tanggalplan, auth.id])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                console.log("Data Agenda Sudah Ada Di Local");
                $scope.customers = [];
                var l = result.rows.length;
                for (var i=0; i < l; i++) 
                {
                    var customer = {};
                    customer.ID                     = result.rows.item(i).ID_SERVER;
                    customer.CUST_ID                = result.rows.item(i).CUST_ID;
                    customer.CUST_NM                = result.rows.item(i).CUST_NM;
                    customer.MAP_LAT                = result.rows.item(i).MAP_LAT;
                    customer.MAP_LNG                = result.rows.item(i).MAP_LNG;
                    customer.TANGGAL                = result.rows.item(i).TGL;
                    customer.CHECKIN_TIME           = $filter('date')(result.rows.item(i).CHECKIN_TIME,'dd-MM-yyyy HH:mm:ss');
                    customer.CHECKOUT_TIME          = $filter('date')(result.rows.item(i).CHECKOUT_TIME,'dd-MM-yyyy HH:mm:ss');

                    customer.START_PIC              = result.rows.item(i).START_PIC;
                    customer.END_PIC                = result.rows.item(i).END_PIC;
                    customer.CHECK_IN               = result.rows.item(i).CHECK_IN;
                    customer.CHECK_OUT              = result.rows.item(i).CHECK_OUT;
                    customer.INVENTORY_STOCK        = result.rows.item(i).INVENTORY_STOCK;
                    customer.INVENTORY_SELLIN       = result.rows.item(i).INVENTORY_SELLIN;
                    customer.INVENTORY_SELLOUT      = result.rows.item(i).INVENTORY_SELLOUT;
                    customer.INVENTORY_EXPIRED      = result.rows.item(i).INVENTORY_EXPIRED;

                    
                    if(customer.CHECK_IN  == 0 || customer.CHECK_IN  == null)
                    {
                        customer.imagecheckout = "asset/admin/dist/img/normal.jpg";
                    }
                    else
                    {
                        if((customer.CHECK_OUT  == 1)||(customer.CHECK_OUT  == "1"))
                        {
                            customer.imagecheckout = "asset/admin/dist/img/customer.jpg";
                        }
                        else
                        {
                            customer.imagecheckout = "asset/admin/dist/img/customerlogo.jpg";
                        } 
                    }

                    var longitude1      = $scope.gpslat;
                    var latitude1       = $scope.gpslong;
                    
                    var longitude2      = customer.MAP_LNG;
                    var latitude2       = customer.MAP_LAT;
                    
                    
                    var jarak           = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);
                    //var roundjarak      = $filter('setDecimal')(jarak,0);
                    if(jarak < 1000)
                    {
                        customer.JARAKMETER = $filter('setDecimal')(jarak,0) + " meter";
                    }
                    else
                    {
                        customer.JARAKMETER = $filter('setDecimal')(jarak/1000,1) + " km";
                    }
                    customer.JARAK            = $filter('setDecimal')(jarak/1000,0);


                    var totalstatus = customer.START_PIC + customer.END_PIC + customer.INVENTORY_STOCK + customer.INVENTORY_SELLIN + customer.INVENTORY_SELLOUT + customer.INVENTORY_SELLOUT + customer.CHECK_IN + customer.CHECK_OUT;
                    var persen = (totalstatus * 100)/8;
                    customer.persen = persen;
                    if(persen == 100)
                    {
                        customer.wanted = true;
                    }
                    $scope.customers.push(customer);
                }
            }
            else
            {
                alert("Data Agenda Masih Kosong Di Local");
                JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
                .then(function(response)
                {
                    if(response.length == 0)
                    {
                        alert("Belum Ada Agenda Hari Ini");
                        $location.path('/history');
                    }
                    else
                    {
                        var idgroupcustomer         = response.SCDL_GROUP;
                        JadwalKunjunganService.GetSingleDetailKunjunganProsedur(idsalesman,idgroupcustomer,tanggalplan)
                        .then(function (responseagendatoday) 
                        {
                            if(responseagendatoday.length > 0)
                            {
                                angular.forEach(responseagendatoday, function(value, key)
                                {
                                    var newID_SERVER                = value.ID;
                                    var newTGL                      = tanggalplan;
                                    var newUSER_ID                  = auth.id;
                                    var newCUST_ID                  = value.CUST_ID;
                                    var newCUST_NM                  = value.CUST_NM;
                                    var newLAG                      = null;
                                    var newLAT                      = null;
                                    var newMAP_LAT                  = value.MAP_LAT;
                                    var newMAP_LNG                  = value.MAP_LNG;
                                    var newCHECKIN_TIME             = value.CHECKIN_TIME;
                                    var newCHECKOUT_TIME            = value.CHECKOUT_TIME;
                                    var newCHECK_IN                 = value.CHECK_IN;
                                    var newCHECK_OUT                = value.CHECK_OUT;
                                    var newINVENTORY_EXPIRED        = value.INVENTORY_EXPIRED;
                                    var newINVENTORY_SELLIN         = value.INVENTORY_SELLIN;
                                    var newINVENTORY_SELLOUT        = value.INVENTORY_SELLOUT;
                                    var newINVENTORY_STOCK          = value.INVENTORY_STOCK;
                                    var newREQUEST                  = null;
                                    var newSTART_PIC                = value.START_PIC;
                                    var newEND_PIC                  = value.END_PIC;
                                    var newSCDL_GROUP               = idgroupcustomer;
                                    var newISON_SERVER              = 1;

                                    var queryinsertagendatoday = 'INSERT INTO Agenda (ID_SERVER,TGL,USER_ID,CUST_ID,CUST_NM,LAG,LAT,MAP_LAT,MAP_LNG,CHECKIN_TIME,CHECKOUT_TIME,CHECK_IN,CHECK_OUT,INVENTORY_EXPIRED,INVENTORY_SELLIN,INVENTORY_SELLOUT,INVENTORY_STOCK,REQUEST,START_PIC,END_PIC,SCDL_GROUP,ISON_SERVER) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                                    $cordovaSQLite.execute($rootScope.db,queryinsertagendatoday,[newID_SERVER,newTGL,newUSER_ID,newCUST_ID,newCUST_NM,newLAG,newLAT,newMAP_LAT,newMAP_LNG,newCHECKIN_TIME,newCHECKOUT_TIME,newCHECK_IN,newCHECK_OUT,newINVENTORY_EXPIRED,newINVENTORY_SELLIN,newINVENTORY_SELLOUT,newINVENTORY_STOCK,newREQUEST,newSTART_PIC,newEND_PIC,newSCDL_GROUP,newISON_SERVER])
                                    .then(function(result) 
                                    {
                                        console.log("Customer Untuk Agenda Today Berhasil Disimpan Di Local!");
                                    }, 
                                    function(error) 
                                    {
                                        console.log("Customer Untuk Agenda Today Gagal Disimpan Ke Local: " + error.message);
                                    });
                                });
                                $scope.customers = responseagendatoday;
                                $scope.loadingcontent   = false;  
                            }
                            else
                            {
                                alert("Belum Ada Customer Di Server Yang Didaftarkan Untuk Group Ini");
                            }
                            
                        },
                        function (error)
                        {
                            var forcereload = confirm("Cors Agenda Error. Reload Again");
                            if (forcereload == true) 
                            {
                                $scope.loadingcontent   = true;
                                $timeout(function()
                                {
                                    $window.location.reload();
                                },10000);
                            }
                            else
                            {
                                $scope.loadingcontent   = false;
                            }
                        });  
                    }      
                });
            }
            $scope.loadingcontent  = false; 
        },

        function(error) 
        {
            $scope.loadingcontent  = false;
            alert("Gagal Mendapatkan Data Dari Local Untuk Agenda Tanggal" + tanggalplan + ": " + error.message);
        });
    });

    
    $scope.detailjadwalkunjungan = function(customer)
    {
        if(tanggalplan < tanggalsekarang)
        {
            alert("Tidak Bisa Lagi Check In");
        }
        else if(tanggalplan > tanggalsekarang)
        {
            alert("Belum Bisa Check In");
        }
        else if(tanggalplan == tanggalsekarang)
        {

            if(customer.CHECK_OUT == 1 || customer.CHECK_OUT == "1")
            {
                alert("Kamu Sudah Check Out");
            }
            else
            {
                var lanjutcheckin = confirm("Yakin Check In Di Customer " + customer.CUST_NM +"?");
                if (lanjutcheckin == true) 
                {
                    $location.path('/detailjadwalkunjungan/' + customer.ID)
                }  
            }  
        }
    } 

    $scope.summaryall = function()
    {
        $scope.loadingcontent  = true;
        JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
        .then(function(data)
        {
            var idgroupcustomer         = data.SCDL_GROUP;
            SummaryService.datasummaryall(idsalesman,tanggalplan,idgroupcustomer)
            .then(function (result) 
            {
                $scope.siteres      = result.siteres;
                $scope.totalalls    = result.totalalls;
                $scope.loadingcontent  = false;
            }, 
            function (err) 
            {          
                alert(err);
                $scope.loadingcontent  = false;
            });
        },
        function (err)
        {
            alert(err);
            $scope.loadingcontent  = false;
        });
    };

    $scope.lastvisitsummary = function()
    {
        $scope.loadingcontent = true;
        JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
        .then(function(data)
        {
            var idgroupcustomer         = data.SCDL_GROUP;
            LastVisitService.LastVisitSummaryAll(tanggalplan,idgroupcustomer)
            .then(function (result) 
            {
                $scope.sitereslv          = result.siteres;
                $scope.totalallslv        = result.totalalls;
                $scope.datapengunjung   = result.pengunjung;
                $scope.loadingcontent  = false;
            }, 
            function (err) 
            {          
                alert(err);
                $scope.loadingcontent  = false;
            });
        }, 
        function (err) 
        {          
            alert(err);
            $scope.loadingcontent  = false;
        });
    };
 
}]);
