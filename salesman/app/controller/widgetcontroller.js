'use strict';
app.controller('MapController', function($scope,NgMap,LocationService)
{
    $scope.zoomvalue = 17;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
        console.log(data);
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
});


app.controller('ListCustomerController', function($scope)
{
  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Customer_' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    alert('Congrats you scrolled to the end of the list!');
  };
});

app.controller('DetailCustomerController', 
function($scope,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture)
{
    $scope.scan = function () 
    {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

    $scope.cekrek = function () 
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
    };

    $scope.jepret = function() 
    {
      var options = { limit: 3 };

      $cordovaCapture.captureImage(options)
      .then(function(imageData) 
      {
        
      }, 
      function(err) 
      {
        // An error occurred. Show a message to the user
      });
    };

});

app.controller('CameraCaptureController', function($scope)
{

});


app.controller('BarcodeController', function($scope)
{

});