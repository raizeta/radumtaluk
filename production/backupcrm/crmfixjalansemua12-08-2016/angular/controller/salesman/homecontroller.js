'use strict';
myAppModule.controller("HomeController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","apiService","ngToast","sweet","$filter","$timeout", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,apiService,ngToast,sweet,$filter,$timeout) 
{   
    $scope.activehome = "active";
    // alert($rootScope.devicemodel);
    // alert($rootScope.deviceplatform);
    // alert($rootScope.deviceuuid);
    // alert($rootScope.deviceversion);
    $scope.loading  = true;
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    apiService.datasalesmanmemo()
    .then(function(data)
    {
        $scope.loading = true;
        $scope.salesmanmemo = data.Salesmanmemo;
    })
    .finally(function()
    {
        var hideloading = function()
        {
            $scope.loading= false;
        }

        $timeout(hideloading,1000);
    });
    $scope.memodibuatpada        = $filter('date')(new Date(),'dd-MM-yyyy HH:mm:ss');
    var url = $rootScope.linkurl;
    $scope.submitForm = function(formsalesmanmemo)
    {

        $scope.loading = true;
        var memodibuatpada         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

        var salesmanmemo = {};
        salesmanmemo.ISI_MESSAGES       = formsalesmanmemo.ISI_MESSAGES
        salesmanmemo.ID_USER            = auth.id;
        salesmanmemo.NM_USER            = auth.username;
        salesmanmemo.STATUS_MESSAGES    = formsalesmanmemo.STATUSMEMO;
        salesmanmemo.CREATE_AT          = memodibuatpada;
        salesmanmemo.CREATE_BY          = auth.id;

        function serializeObj(obj) 
        {
          var result = [];
          for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
          return result.join("&");
        }
        var memo = serializeObj(salesmanmemo);
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                
            }
        };

        $http.post(url + "/salesmanmemos",memo,config)
        .success(function(data,status, headers, config) 
        {
            ngToast.create('Memo Berhasil Di Save');
            apiService.datasalesmanmemo()
            .then(function(data)
            {
                
                $scope.salesmanmemo = data.Salesmanmemo;
            })
            .finally(function()
            {
                var hideloading = function()
                {
                    $scope.loading= false;
                }

                $timeout(hideloading,10000);
            });

        })

        .finally(function()
        {
            $scope.loading = false;  
        });
    }
}]);

myAppModule.controller("SetPositionController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService","ngToast","sweet","singleapiService","CustomerService",
function ($rootScope,$scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService,ngToast,sweet,singleapiService,CustomerService) 
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
    $scope.zoomvalue = 11;
    $scope.loading  = true;
    $scope.visible = false;

    var geocoder = new google.maps.Geocoder;
    LocationService.GetGpsLocation()
    .then(function(data)
    {
        $scope.gpslat   = data.latitude;
        $scope.gpslong  = data.longitude;
    });

    $scope.customergroup = function()
    {
        $scope.loading  = true;
        CustomerService.GetGroupCustomers()
        .then(function (result) 
        {
            // $scope.customergroups = result.Customergroup;
            var customergroups   = [];
            _.each(result.Customergroup, function(executes) 
            {
                var customergroup = {};
                customergroup.CREATE_AT = executes.CREATE_AT;
                customergroup.CREATE_BY = executes.CREATE_BY;
                customergroup.ID =executes.ID;
                customergroup.KETERANGAN =executes.KETERANGAN;
                customergroup.SCDL_GROUP_NM =executes.SCDL_GROUP_NM;
                customergroup.STATUS =executes.STATUS;
                customergroup.UPDATE_AT=executes.UPDATE_AT;
                customergroup.UPDATE_BY=executes.UPDATE_BY;
                customergroup.ALIAS = executes.KETERANGAN + " (" + executes.SCDL_GROUP_NM + ")";
                customergroups.push(customergroup);
            });
            $scope.customergroups = customergroups;
            $scope.loading  = false;
            $scope.visible = false;  
        });
    };
    $scope.customergroup();

    $scope.customergroupchange = function()
    {
        $scope.loading  = true;
        CustomerService.GetSingleGroupCustomer($scope.customergroup)
        .then(function (result) 
        {
            $scope.showcustomer = true;
            $scope.customers = result.Customer;
            $scope.loading  = false;
            $scope.visible = false;
        });
    }

    $scope.customerchange = function()
    {
        if($scope.customer == undefined)
        {
            console.log("Undefined");
        }
        else
        {
           $scope.loading  = true;
           

            CustomerService.GetSingleCustomer($scope.customer)
            .then(function (result) 
            {
                if(result.MAP_LAT == null || result.MAP_LNG == null)
                {
                    $rootScope.currentcustlat  = 0.0;
                    $rootScope.currentcustlng  = 0.0; 
                }
                else
                {
                    $rootScope.currentcustlat  = result.MAP_LAT;
                    $rootScope.currentcustlng  = result.MAP_LNG; 
                }
                
                var jarak = $rootScope.jaraklokasi($scope.gpslong,$scope.gpslat,$rootScope.currentcustlng,$rootScope.currentcustlat);
                $scope.loading  = false;
                $scope.visible = true;
            }); 
        } 
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
        if(($rootScope.actuallng == undefined)|| ($rootScope.actuallat == undefined))
        {
            posisicust.MAP_LAT = $rootScope.currentcustlat;
            posisicust.MAP_LNG = $rootScope.currentcustlng; 
        }
        else
        {
            posisicust.MAP_LAT = $rootScope.actuallat;
            posisicust.MAP_LNG = $rootScope.actuallng;
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

        $http.put(url + "/customers/"+ customer ,dataposisi,config)
        .success(function(data,status, headers, config) 
        {
            ngToast.create('Posisi Customer Berhasil Di Update');

        })
        .error (function (data)
        {
            $rootScope.currentcustlat = undefined;
            $rootScope.currentcustlng = undefined;
            alert("Validation Failed. " + data[0].message); 
        })
        .finally(function()
        {
            $scope.loading = false;  
        });
    }
}]);

myAppModule.controller("SalesTrackController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","ngToast","sweet","SalesTrackServices",
function ($rootScope,$scope, $location, $http, authService, auth,$window,NgMap,LocationService,ngToast,sweet,SalesTrackServices) 
{
    $scope.activesalestrack = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.loading  = true;
    SalesTrackServices.getSalesTracks($rootScope.tanggalharini)
    .then(function (result) 
    {
        $scope.salestracks = result;
    });

}]);

myAppModule.controller("SalesTrackPerUserController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","ngToast","sweet","SalesTrackServices","$routeParams",
function ($rootScope,$scope, $location, $http, authService, auth,$window,NgMap,LocationService,ngToast,sweet,SalesTrackServices,$routeParams) 
{
    var idsalesman = $routeParams.idsalesman;
    $scope.activesalestrack = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.loading  = true;
    SalesTrackServices.getSalesTrack($rootScope.tanggalharini,idsalesman)
    .then(function (result) 
    {
        $scope.salestracks = result;
        console.log(result);
    });

}]);


