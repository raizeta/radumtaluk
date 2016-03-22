'use strict';
var myAppModule 	= angular.module('myAppModule',
								['ngRoute','ngResource','ngToast','angularSpinner','ui.bootstrap','ngAnimate',
                                    'ui.select2','naif.base64','monospaced.qrcode','angular-ladda',
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
                
            $http.post("http://labtest3-api.int/master/trackers",serialized,config)
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

    console.log(tanggalmulai);
    console.log(tanggalakhir);

    if( (tanggal > tanggalmulai) && (tanggal < tanggalakhir))
    {
        setInterval(function() 
        {
            $rootScope.starttrack();
        }, 30000);
    }

    // var userauth = $window.sessionStorage["userInfo"];
    // $rootScope.authen = JSON.parse(userauth);
    // console.log($rootScope.authen.username);

}]);

myAppModule.config(['ngToastProvider', function(ngToastProvider) 
{
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




