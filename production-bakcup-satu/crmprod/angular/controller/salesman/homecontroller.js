'use strict';
myAppModule.controller("HomeController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService","ngToast","sweet", 
function ($rootScope,$scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService,ngToast,sweet) 
{
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
        console.log(customer);
        var idcustomer = customer.CUST_KD;
        console.log(customer);
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

    $scope.customerchange = function(customer)
    {
        var idcustomer = customer.CUST_KD;
        singleapiService.singlelistcustomer(idcustomer)
        .then(function (result) 
        {
            $scope.lat  = result.MAP_LAT;
            $scope.long = result.MAP_LNG;
        });
    }

    $scope.submitForm = function(customer)
    {
        var idcustomer = customer.CUST_KD;
        console.log(customer);
        LocationService.GetLocation()
        .then(function(data)
        {
            $scope.lat = data.latitude;
            $scope.long = data.longitude;

            customer.MAP_LAT = $scope.lat;
            customer.MAP_LNG = $scope.long;

            $http.get(url + "/customers/"+ idcustomer)
            .success(function(data,status, headers, config) 
            {
                data.MAP_LAT = customer.MAP_LAT;
                data.MAP_LNG = customer.MAP_LNG;

                function serializeObj(obj) 
                {
                  var result = [];
                  for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                  return result.join("&");
                }
                var data = serializeObj(data);
                console.log(data); 

                var config = 
                {
                    headers : 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                        
                    }
                };

                $http.put(url + "/customers/"+ idcustomer ,data,config)
                .success(function(data,status, headers, config) 
                {
                    ngToast.create('Posisi Customer Berhasil Di Update');

                })

                .finally(function()
                {
                    $scope.loading = false;  
                });


            })

            .finally(function()
            {
                $scope.loading = false;  
            });
        }); 
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);



