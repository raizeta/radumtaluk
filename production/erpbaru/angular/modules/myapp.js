'use strict';
var myAppModule     = angular.module('myAppModule',
['ngRoute','ngResource','ngToast','angularSpinner','ui.bootstrap','vAccordion','ngAnimate','naif.base64',
'angular-ladda','angularModalService','ngCordova','ngMap','ngMaterial','ds.clock','ngStorage',
'ngMessages','hSweetAlert','ui.calendar','checklist-model','luegg.directives']);

myAppModule.run(["$rootScope","$http","$location","LocationService","$window","ngToast","authService","$q","$filter","$cordovaDevice","$timeout","$templateCache","$cordovaNetwork","$cordovaSQLite",
function ($rootScope,$http,$location,LocationService,$window,ngToast,authService,$q,$filter,$cordovaDevice,$timeout,$templateCache,$cordovaNetwork,$cordovaSQLite) 
{
    // var senderid = 724504328230;
    // var serverkey = "AIzaSyDxGj1GREVYNQ5drMk6X_fRmYmsW-QrIiQ";
    // var onesignal = "aa7a5f05-1b54-40fc-87fd-80c0f1d99ab7";

    document.addEventListener("deviceready", function () 
    {
        alert("Open DB");
        $rootScope.db = window.sqlitePlugin.openDatabase({name:"nextflow.db", location:'default', androidLockWorkaround: 1, androidDatabaseImplementation: 2});
        $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT,person_from TEXT, person_to TEXT, create_at TEXT)');
        alert("Create Table");

        var notificationOpenedCallback = function(jsonData) 
        {
            alert("Notification Diterima");
        };

        window.plugins.OneSignal.init("aa7a5f05-1b54-40fc-87fd-80c0f1d99ab7",{googleProjectNumber: "724504328230"},notificationOpenedCallback);
      
        window.plugins.OneSignal.enableInAppAlertNotification(true);
        window.plugins.OneSignal.setSubscription(true);
        window.plugins.OneSignal.enableNotificationWhenActive(true);
    });

    document.addEventListener("deviceready", function () 
      {
        $rootScope.devicemodel = $cordovaDevice.getModel();
        $rootScope.deviceplatform = $cordovaDevice.getPlatform();
        $rootScope.deviceuuid = $cordovaDevice.getUUID();
        $rootScope.deviceversion = $cordovaDevice.getVersion();
      }, false);

    document.addEventListener("deviceready", function () 
    {
        var type = $cordovaNetwork.getNetwork();
        $rootScope.isOnline = $cordovaNetwork.isOnline();
        var isOffline = $cordovaNetwork.isOffline();

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          var onlineState = networkState;
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          var offlineState = networkState;
        })
    }, false);

    $rootScope.loading= true;
    $rootScope.$on("$routeChangeStart", function (e, curr, prev,userInfo) 
    {
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
        $timeout(hideloading, 100);
        
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) 
    {
        if (eventObj.authenticated === false) 
        {
            $location.path("/login");
        }
    });

    var options = {timeout: 10000, enableHighAccuracy: false};

    $rootScope.seriliazeobject = function(objecttoserialize)
    {
        var result={};
        function serializeObj(obj) 
        {
          var result = [];
          for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
          return result.join("&");
        }
        
        var serialized = serializeObj(objecttoserialize); 
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'   
            }
        };
        result.serialized   = serialized;
        result.config       = config;

        return result;
    }
    
    $rootScope.tanggalharini = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggal = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    var tanggalmulai = $filter('date')(new Date(),'yyyy-MM-dd 05:00:00');
    var tanggalakhir = $filter('date')(new Date(),'yyyy-MM-dd 23:59:59');

    var getUrl = function()
    {
        return "http://api.lukisongroup.com/master";
    }

    var gettoken = function()
    {
        return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
    }
    
    $rootScope.linkurl = getUrl();

    // https://jsfiddle.net/Guffa/Askwb/
    // Remove Duplicate Array
    $rootScope.unique = function(list) 
    {
        var result = [];
        $.each(list, function(i, e) 
        {
            if ($.inArray(e, result) == -1) 
            {
                result.push(e);
            }
        });
        
        return result;
    }

    $rootScope.diffbarang = function(x,y)
    {
        var resultdiffsellin = [];
        angular.forEach(x, function(key) 
        {
          if (-1 === y.indexOf(key)) 
          {
            resultdiffsellin.push(key);
          }
        });

        var result=[];
        for(var i =0; i < resultdiffsellin.length; i++)
        {
            var data = {}
            data.KD_BARANG = resultdiffsellin[i];
            result.push(data);
        }

        return result;
    }

    $rootScope.jaraklokasi = function(longitude1,latitude1,longitude2,latitude2)
    {
        var thetalong      = (longitude1 - longitude2)*(Math.PI / 180); 
        var thetalat       = (latitude1 - latitude2)*(Math.PI / 180);
        var a = 0.5 - Math.cos(thetalat)/2 + Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180) * (1 - Math.cos(thetalong))/2;
        var jarak = 12742 * Math.asin(Math.sqrt(a)) * 1000;
        return jarak;
    }

}]);

myAppModule.config(['$httpProvider','$locationProvider','ngToastProvider','$mdThemingProvider',"usSpinnerConfigProvider", 
function($httpProvider,$locationProvider, ngToastProvider,$mdThemingProvider,usSpinnerConfigProvider) 
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
}]);




