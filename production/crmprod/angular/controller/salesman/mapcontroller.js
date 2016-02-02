myAppModule.controller("SalesMapController", ["$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService","apiService", 
function ($scope, $location, $http, authService, auth,$window,NgMap,LocationService,apiService) 
{
    $scope.zoomvalue = 17;
    $scope.loading  = true;
    var geocoder = new google.maps.Geocoder;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
        console.log(data);
    });

    apiService.listcustomer()
    .then(function (result) 
    {
        $scope.customers = result.Customer;
        $scope.loading  = false;
        console.log($scope.customers);   
    });
    //http://stackoverflow.com/questions/5968559/retrieve-latitude-and-longitude-of-a-draggable-pin-via-google-maps-api-v3
    $scope.doSth = function($event,customer)
    {
        var idcustomer = customer.CUST_KD;
        alert(idcustomer);
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
        
        $http.put("http://lukison.int/master/customers/" + idcustomer,serialized,config)
        .success(function(data,status, headers, config) 
        {
            //$location.path("/mapcustomer");
            alert("Sukses");

        })
        .error(function (data, status, header, config) 
        {
            console.log(data);
            console.log(status);
            console.log(header);
            console.log(config);      
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

    $scope.toggleBounce = function() 
    {
      if (this.getAnimation() != null) 
      {
        this.setAnimation(null);    
      } 
      else 
      {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
}]);



myAppModule.controller("DetailCustomerController", ["$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService",
function ($scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService) 
{
    $scope.loading = true;
    var idcustomer = $routeParams.idcustomer;
    $scope.zoomvalue = 17;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
    });

    singleapiService.singlelistcustomer(idcustomer)
    .then(function (result) 
    {
        $scope.customers = result;
        $scope.loading  = false;  
    });
    
    $scope.toggleBounce = function() 
    {
      if (this.getAnimation() != null) 
      {
        this.setAnimation(null);
        
      } 
      else 
      {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    
    $scope.scanbarcode = function()
    {
        $cordovaBarcodeScanner.scan().then(function(imageData) 
        {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, 
        function(error) 
        {
            console.log("An error happened -> " + error);
        });
    }

    $scope.takeapicture = function()
    {
        document.addEventListener("deviceready", function () {

          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
            // error
          });

        }, false);
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);