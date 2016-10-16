'use strict';
var myAppModule     = angular.module('myAppModule',
['ngRoute','ngResource','ngToast','angularSpinner','ui.bootstrap','vAccordion','ngAnimate','naif.base64',
'angular-ladda','angularModalService','ngCordova','ngMap','ngMaterial','ds.clock','ngStorage',
'ngMessages','hSweetAlert','ui.calendar']);

myAppModule.run(
function ($rootScope,$http,$location,LocationFac,$window,$q,$filter,$cordovaDevice,$timeout,$templateCache,$cordovaNetwork,$cordovaSQLite) 
{

    document.addEventListener("deviceready", function () 
    {
        $rootScope.db = window.sqlitePlugin.openDatabase({name:"nextflow.db", location:'default', androidLockWorkaround: 1, androidDatabaseImplementation: 2});
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Agenda (id INTEGER PRIMARY KEY AUTOINCREMENT,ID_SERVER INTEGER,TGL TEXT, USER_ID INTEGER, CUST_ID TEXT, CUST_NM TEXT, LAG TEXT, LAT TEXT, MAP_LAT TEXT, MAP_LNG TEXT, CHECKIN_TIME TEXT,CHECKOUT_TIME TEXT,STSCHECK_IN INTEGER,STSCHECK_OUT INTEGER,STSINVENTORY_EXPIRED INTEGER,STSINVENTORY_SELLIN INTEGER,STSINVENTORY_SELLOUT INTEGER,STSINVENTORY_STOCK INTEGER,STSINVENTORY_REQUEST INTEGER,STSINVENTORY_RETURN INTEGER,STSSTART_PIC INTEGER,STSEND_PIC INTEGER,SCDL_GROUP INTEGER,STSISON_SERVER INTEGER)');
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Absensi (ID INTEGER PRIMARY KEY AUTOINCREMENT, ID_SERVER INTEGER,TGL TEXT, USER_ID INTEGER, USER_NM TEXT, WAKTU_MASUK TEXT, WAKTU_KELUAR TEXT,STATUS_ABSENSI TEXT,ISON_SERVER INTEGER)');
        
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Scdlheader (ID INTEGER PRIMARY KEY AUTOINCREMENT, ID_SERVER INTEGER,TGL1 TEXT, SCDL_GROUP TEXT, USER_ID INTEGER, NOTE TEXT, STATUS_HEADER INTEGER)');
        
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Brgpenjualan (ID INTEGER PRIMARY KEY AUTOINCREMENT, ID_SERVER INTEGER,KD_BARANG TEXT, NM_BARANG TEXT, IMAGE_LOCAL TEXT, IMAGE_BASE64 TEXT)');
        

        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Sot2 (ID INTEGER PRIMARY KEY AUTOINCREMENT, ISON_SERVER INTEGER,TGL TEXT,CUST_KD TEXT,CUST_NM TEXT,KD_BARANG TEXT,NM_BARANG TEXT,SO_QTY INTEGER,SO_TYPE INTEGER,POS TEXT,USER_ID INTEGER,STATUS INTEGER,WAKTU_INPUT_INVENTORY TEXT,ID_GROUP INTEGER,DIALOG_TITLE TEXT)');
        

        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Sot2Type (ID INTEGER PRIMARY KEY AUTOINCREMENT, ID_SERVER INTEGER,SO_TYPE TEXT,UNTUK_DEVICE TEXT,STATUS INTEGER,SO_ID INTEGER,DIALOG_TITLE TEXT)');
        
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Configradius (ID INTEGER PRIMARY KEY AUTOINCREMENT, ID_SERVER INTEGER,CHECKIN TEXT,VALUERADIUS INTEGER,NOTE TEXT)');
        
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Expiredbarang (ID INTEGER PRIMARY KEY AUTOINCREMENT,ID_SERVER INTEGER,ID_PRIORITASED INTEGER,ID_DETAIL INTEGER,CUST_ID TEXT,BRG_ID TEXT,USER_ID TEXT,TGL_KJG TEXT,QTY INTEGER,DATE_EXPIRED TEXT,ISON_SERVER INTEGER)');

        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Lamakunjungan (ID INTEGER PRIMARY KEY AUTOINCREMENT,ID_AGENDA INTEGER,WAKTU_MASUK TEXT,WAKTU_KELUAR TEXT)');
        
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS GagalCheck (ID INTEGER PRIMARY KEY AUTOINCREMENT,ID_AGENDA INTEGER,USER_ID TEXT,ID_CUSTOMER TEXT,WAKTU_CHECK TEXT,TYPE_CHECK TEXT,POS_LAT TEXT,POS_LAG TEXT,ISONSERVER INTEGER)');
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS GagalGambar (ID INTEGER PRIMARY KEY AUTOINCREMENT,ID_AGENDA INTEGER,USER_ID TEXT,ID_CUSTOMER TEXT,WAKTU_GAMBAR TEXT,TYPE_GAMBAR TEXT,ISI_GAMBAR TEXT,ISONSERVER INTEGER)');
   });

    document.addEventListener("deviceready", function () 
    {
        $rootScope.devicemodel      = $cordovaDevice.getModel();
        $rootScope.deviceplatform   = $cordovaDevice.getPlatform();
        $rootScope.deviceuuid       = $cordovaDevice.getUUID();
        $rootScope.deviceversion    = $cordovaDevice.getVersion();
    }, false);


    $rootScope.$on("$routeChangeStart", function (e, curr, prev,userInfo) 
    {
        $rootScope.loading= true;
        if (curr.$$route && curr.$$route.resolve) 
        {
            $rootScope.loading= true;
            $rootScope.isMenuOpen = false;
            $rootScope.isMenuKananOpen = false;
        }
    });
   
    $rootScope.$on("$routeChangeSuccess", function (e, curr, prev,userInfo) 
    {
        var hideloading = function()
        {
            $rootScope.loading= false;
        }
        $timeout(hideloading, 1000);
        
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) 
    {
        if (eventObj.authenticated === false) 
        {
            $location.path("/login");
        }
    });


    var options = {timeout: 10000, enableHighAccuracy: false};
    $rootScope.starttrack = function()
    {
        navigator.geolocation.getCurrentPosition(
        function (options) 
        {
            
            var userauth = $window.sessionStorage["userInfo"];
            $rootScope.authen = JSON.parse(userauth);

            $rootScope.lat = options.coords.latitude;
            $rootScope.long = options.coords.longitude;

            var detail ={};
            detail.USER_ID = $rootScope.authen.username;
            detail.LAT=$rootScope.lat;
            detail.LAG=$rootScope.long;

            var result  = $rootScope.seriliazeobject(detail);
            var serialized  = result.serialized;
            var config      = result.config;
                
            $http.post("http://api.lukisongroup.com/master/trackers",serialized,config)
            .success(function(data,status, headers, config) 
            {
                //ngToast.create('Detail Telah Berhasil Di Update');
            })

            .finally(function()
            {
                $rootScope.loading = false;  
            });
        },
        function(err)
        {
          alert("GPS Tidak Hidup.Hidupkan GPS Untuk Menikmati Fitur Ini");
        });
    }

    $rootScope.tanggalharini = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggal = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    var tanggalmulai = $filter('date')(new Date(),'yyyy-MM-dd 05:00:00');
    var tanggalakhir = $filter('date')(new Date(),'yyyy-MM-dd 23:59:59');


    if( (tanggal > tanggalmulai) && (tanggal < tanggalakhir))
    {
        setInterval(function() 
        {
            $rootScope.starttrack();
        }, 300000);
    }

    $rootScope.cekstatusbarang = function(statusvalue)
    {
        var status={};
        if(statusvalue == 1)
        {
            status.bgcolor="bg-green";
            status.icon="fa fa-check bg-green";
            status.show = false;
        }
        else if(statusvalue == 0)
        {
            status.bgcolor="bg-aqua";
            status.show= true;
            status.icon = "fa fa-close bg-aqua";
        }

        return status;
    }

    $rootScope.updateinventoryquantity = function(idinventory)
    {
        var result = {}
        if(idinventory == 1)
        {
            result.titledialog                 = 'Stock Quantity';
            result.sotype                      = 5;
            result.arraybarang                 = $rootScope.barangstockqty;
            result.INVENTORY_STOCK = 1;

        }
        else if(idinventory == 2)
        {
            result.titledialog                     = 'Sell Out Quantity';
            result.sotype                          = 7;
            result.arraybarang                     = $rootScope.barangsellout;
            result.INVENTORY_STOCK = 2;
        }
        else if(idinventory == 3)
        {
            result.titledialog                     = 'Sell In Quantity';
            result.sotype                          = 6;
            result.arraybarang                     = $rootScope.barangsellin;
            result.INVENTORY_STOCK = 3;
        }

        else if(idinventory == 4)
        {
            result.titledialog                     = 'Return Product';
            result.sotype                          = 8;
            result.arraybarang                     = $rootScope.barangreturn;
            result.RETURN_STOCK = 4;
        }
        return result;
    }

    $rootScope.updatestatusinventoryquantity = function(idinventory)
    {
        var result = {}
        if(idinventory == 5)
        {
            result.INVENTORY_STOCK = 1;
        }
        else if(idinventory == 6)
        {
            result.INVENTORY_SELLIN    = 1;
        }
        else if(idinventory == 7)
        {
            result.INVENTORY_SELLOUT   = 1;
        }
        else if(idinventory == 8)
        {
            result.INVENTORY_RETURN    = 1;
        }
        else if(idinventory == 9)
        {
            result.REQUEST    = 1;
        }
        return result;
    }

    $rootScope.findidstatuskunjunganbyiddetail = function(iddetail)
    {
        var findidstatuskunjunganbyiddetail = $.ajax
        ({
              url: $rootScope.linkurl  + "/statuskunjungans/search?ID_DETAIL=" + iddetail,
              type: "GET",
              dataType:"json",
              async: false
        }).responseText;
        var result = JSON.parse(findidstatuskunjunganbyiddetail)['StatusKunjungan'][0].ID;
        return result;
    } 

    $rootScope.convertwaktu = function(t)
    {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;
        return [
                    hours + ' Jam',
                    minutes + ' Menit',
                    seconds + ' Detik'
                ].join(' ');
    }

});

myAppModule.config(function($httpProvider,ngToastProvider,$mdThemingProvider,usSpinnerConfigProvider) 
{
    //usSpinnerConfigProvider.setDefaults({color: 'blue'});
    usSpinnerConfigProvider.setTheme('bigBlue', {color: 'blue', radius: 20});
    usSpinnerConfigProvider.setTheme('smallRed', {color: 'red', radius: 6});

    $httpProvider.interceptors.push('timestampMarker');
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];


    $mdThemingProvider.theme('altTheme')
    .primaryPalette('pink', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });


    //$locationProvider.html5Mode(false);
      
    ngToastProvider.configure(
    {
        animation: 'slide', // or 'fade',
        className: 'success',
        dismissButton: true,
        dismissButtonHtml:'&times;',
        compileContent: true,
        timeout:1000,
        horizontalPosition:'right',     //left, center
        verticalPosition:   'bottom',  //top,center
        maxNumber: 3 // 0 for unlimited
    });

});





