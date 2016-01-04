myAppModule.controller("BarCodeController", ["$scope", "$location","$http", "authService", "auth","$window","$cordovaBarcodeScanner","apiService", function ($scope, $location, $http, authService, auth,$window,$cordovaBarcodeScanner,apiService) 
{
    
    $scope.scanbarcode = function()
    {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });

    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);