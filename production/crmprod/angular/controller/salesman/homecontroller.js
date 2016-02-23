'use strict';
myAppModule.controller("HomeController", ["$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService","ngToast","sweet", 
function ($scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService,ngToast,sweet) 
{
        sweet.show({
            title: 'Confirm',
            text: 'Delete this file?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                sweet.show('Deleted!', 'The file has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });

    $scope.zoomvalue = 17;
    $scope.loading  = true;
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });

    apiService.listcustomer()
    .then(function (result) 
    {
        $scope.customers = result.Customer;
        $scope.loading  = false;  
    });
    $scope.doSth = function($event,customer)
    {
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
        
        $http.put("http://labtest3-api.int/master/customers/" + idcustomer,serialized,config)
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



