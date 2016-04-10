'use strict';
var myAppModule 	= angular.module('myAppModule',
								['ngRoute','ngResource','ngToast','angularSpinner','ui.bootstrap','ngAnimate',
                                    'ui.select2','naif.base64','monospaced.qrcode','angular-ladda','angularModalService',
                                 'ngCordova','ngMap','mm.acl','ng-mfb','ngMaterial','ngMessages','hSweetAlert','ui.calendar']);

myAppModule.run(["$rootScope","$http","$location","uiSelect2Config","LocationService","$window","ngToast","authService","$q","$filter",
function ($rootScope,$http,$location,uiSelect2Config,LocationService,$window,ngToast,authService,$q,$filter) 
{
    uiSelect2Config.placeholder = "Placeholder text";
    $rootScope.loading= true;
    $rootScope.$on("$routeChangeStart", function (userInfo) 
    {
        $rootScope.loading= true;
    });
   
    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        $rootScope.loading = false;
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

            


            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }

            var serialized = serializeObj(detail); 
            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
                
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

    var tanggal = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    var tanggalmulai = $filter('date')(new Date(),'yyyy-MM-dd 05:00:00');
    var tanggalakhir = $filter('date')(new Date(),'yyyy-MM-dd 23:59:59');


    if( (tanggal > tanggalmulai) && (tanggal < tanggalakhir))
    {
        setInterval(function() 
        {
            $rootScope.starttrack();
        }, 30000);
    }

    var getUrl = function()
    {
        //return "http://labtest3-api.int/master";
        return "http://api.lukisongroup.com/master";
    }

    var gettoken = function()
    {
        return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
    }
    
    $rootScope.linkurl = getUrl();

    $rootScope.databarangs = function(x)
    {
        var dataproduct = $.ajax
        ({
              url: $rootScope.linkurl  + "/barangpenjualans/search?KD_CORP=ESM&KD_KATEGORI=01",
              type: "GET",
              dataType:"json",
              async: false
        }).responseText;

        var Product = JSON.parse(dataproduct)['BarangPenjualan'];
        var result = [];
        angular.forEach(Product, function(value, key)
        {
            var KD_BARANG = value.KD_BARANG;
            result.push(KD_BARANG);
        });
        return result;
    }

    $rootScope.databaranginventory = function(idcustomer,tanggalplan,sotype)
    {
        var inventorysellin = $.ajax
        ({
              url: $rootScope.linkurl + "/productinventories/search?CUST_KD=" + idcustomer + "&TGL=" + tanggalplan + "&SO_TYPE=" + sotype,
              type: "GET",
              dataType:"json",
              async: false
        }).responseText;

        var sellin = JSON.parse(inventorysellin)['ProductInventory'];
        var result = [];
        angular.forEach(sellin, function(value, key)
        {
            var KD_BARANG = value.KD_BARANG;
            result.push(KD_BARANG);
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

    $rootScope.singledetailkunjunganbyiddetail = function(iddetail)
    {
        var resultsingledetailkunjunganbyiddetail = $.ajax
        ({
              url: $rootScope.linkurl  + "/detailkunjunganbyiddetails/search?ID=" + iddetail,
              type: "GET",
              dataType:"json",
              async: false
        }).responseText;
        var result = JSON.parse(resultsingledetailkunjunganbyiddetail)['DetailKunjungan'][0];
        return result;
    }

    $rootScope.cekstatuspanjangdiffbarang = function(diffbarang)
    {
        var status={};
        if(diffbarang.length == 0)
        {
            status.bgcolor="bg-green";
            status.icon="fa fa-check bg-green";
            status.show = false;
        }
        else
        {
            status.bgcolor="bg-aqua";
            status.show= true;
            status.icon = "fa fa-user bg-aqua";
        }

        return status;
    }

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



}]);

myAppModule.config(['$locationProvider','ngToastProvider','$mdThemingProvider', function($locationProvider, ngToastProvider,$mdThemingProvider) 
{
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


    $locationProvider.html5Mode(false);
      
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


myAppModule.filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
    };
});

myAppModule.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});



