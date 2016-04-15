'use strict';
myAppModule.controller("HomeController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService","ngToast","sweet","$filter","$cordovaDevice", 
function ($rootScope,$scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService,ngToast,sweet,$filter) 
{
    $scope.activehome = "active";
    // alert($rootScope.devicemodel);
    // alert($rootScope.deviceplatform);
    // alert($rootScope.deviceuuid);
    // alert($rootScope.deviceversion);

    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }




    
}]);

myAppModule.controller("SetPositionController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService","ngToast","sweet","singleapiService",
function ($rootScope,$scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService,ngToast,sweet,singleapiService) 
{
    $scope.activesetposition = "active";
    var url = $rootScope.linkurl;

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }


    $scope.loading  = true;
    $scope.zoomvalue = 17;
    $scope.loading  = true;

    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation()
    .then(function(data)
    {
        $scope.currentlat = data.latitude;
        $scope.currentlong = data.longitude;
    });

    $scope.customergroup = function()
    {
        apiService.listgroupcustomer()
        .then(function (result) 
        {
            $scope.customergroups = result.Customergroup;
            $scope.loading  = false;  
        });
    };
    $scope.customergroup();

    $scope.customergroupchange = function(customergroup)
    {
        $scope.loading  = true;
        var id = customergroup.ID;
        singleapiService.singlelistgroupcustomer(id)
        .then(function (result) 
        {
            $scope.showcustomer = true;
            $scope.customers = result.Customer;
            $scope.loading  = false;
        });
    }

    $scope.customerchange = function(customer)
    {
        var idcustomer = customer.CUST_KD;
        singleapiService.singlelistcustomer(idcustomer)
        .then(function (result) 
        {
            $rootScope.currentcustlat  = result.MAP_LAT;
            $rootScope.currentcustlng = result.MAP_LNG;
        });
    }

    $scope.doSth = function(event)
    {
        $rootScope.actuallng = this.getPosition().lng();
        $rootScope.actuallat = this.getPosition().lat();
    }

    $scope.submitForm = function(customer)
    {
        var idcustomer = customer.CUST_KD;

        var posisicust = {};
        console.log($rootScope.actuallng);
        if(($rootScope.lat != undefined)|| ($rootScope.lat != undefined))
        {
            posisicust.MAP_LAT = $rootScope.actuallat;
            posisicust.MAP_LNG = $rootScope.actuallng;
        }
        else
        {
            posisicust.MAP_LAT = $rootScope.currentcustlat;
            posisicust.MAP_LNG = $rootScope.currentcustlng;
        }

        function serializeObj(obj) 
        {
          var result = [];
          for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
          return result.join("&");
        }
        var dataposisi = serializeObj(posisicust);
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                
            }
        };

        $http.put(url + "/customers/"+ idcustomer ,dataposisi,config)
        .success(function(data,status, headers, config) 
        {
            ngToast.create('Posisi Customer Berhasil Di Update');

        })

        .finally(function()
        {
            $scope.loading = false;  
        });
    }

}]);



