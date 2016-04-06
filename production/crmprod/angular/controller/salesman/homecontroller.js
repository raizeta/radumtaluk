'use strict';
myAppModule.controller("HomeController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService","ngToast","sweet","$filter", 
function ($rootScope,$scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService,ngToast,sweet,$filter) 
{
    $scope.userInfo = auth;
    console.log($scope.userInfo);
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    var imagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    console.log(imagestart);
    var url = $rootScope.linkurl;

    $scope.loading  = true;
    $scope.zoomvalue = 17;
    $scope.loading  = true;
    
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation()
    .then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });


    $scope.customermap = function()
    {
        apiService.listcustomer()
        .then(function (result) 
        {
            $scope.customers = result.Customer;
            $scope.loading  = false;  
        });
    };
    $scope.customermap();

    $scope.doSth = function(event,customer)
    {
        var idcustomer = customer.CUST_KD;
        customer.MAP_LNG = this.getPosition().lng();
        customer.MAP_LAT = this.getPosition().lat();
        customer.NPWP = 200;
        customer.TLP1 = 081260014478;
        customer.TLP2 = 081260014478;
        customer.FAX  = 081260014478;

        function serializeObj(obj) 
        {
          var result = [];
          for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
          return result.join("&");
        }
        
        var serialized = serializeObj(customer); 

        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                
            }
        };

        sweet.show(
        {
            title: 'Confirm',
            text: 'Apakah Kamu Ingin Mengubah Posisi Customer Ini?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, Change it!',
            closeOnConfirm: true,
            closeOnCancel: true
        }, 
        function(isConfirm) 
        {
            if (isConfirm) 
            {
                $http.put(url + "/customers/" + idcustomer,serialized,config)
                .success(function(data,status, headers, config) 
                {
                    ngToast.create(
                    {
                        content: 'Data Berhasi Di Ubah',
                    });
                })
                .error(function (data, status, header, config) 
                {
                    // console.log(data);  
                })

                .finally(function()
                {
                    $scope.loading = false;
                });
            }
            else
            {
                $scope.customermap();
            }
        });

        
        // geocoder.geocode(
        // {
        //     'location': this.getPosition()
        // }, 
        // function(results, status) 
        // {
        //     console.log(results);
        //     if (status === google.maps.GeocoderStatus.OK) 
        //     {
        //           if (results[1]) 
        //           {
        //             console.log(results[2]);
        //             console.log(this.getPosition);
        //           } 
        //           else 
        //           {
        //             window.alert('No results found');
        //           }
        //     } 
        //     else 
        //     {
        //       window.alert('Geocoder failed due to: ' + status);
        //     }
        // });
    }
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



