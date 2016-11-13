'use strict';
myAppModule.controller("NOOController",
function ($rootScope,$scope,$location,auth,$window,$filter,$cordovaCamera,$cordovaCapture) 
{   
    $scope.activenoo  = "active";
    $scope.userInfo = auth;
    $scope.customer = {};
    $scope.customer.ktp 	= auth.gambar;
    $scope.customer.npwp 	= auth.gambar;
    $scope.customer.siub 	= auth.gambar;
    $scope.customer.ttd 	= auth.gambar;
    $scope.customer.fs1 	= auth.gambar;
    $scope.customer.fs2 	= auth.gambar;

	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.ambilgambar = function(value)
    {
    	document.addEventListener("deviceready", function () 
        {
            var options = $rootScope.getCameraOptions();
            $cordovaCamera.getPicture(options)
            .then(function (imageData) 
            {
                if(value == 'KTP')
                {
            		$scope.customer.ktp   = imageData;
                }
                else if(value == 'NPWP')
                {
                	$scope.customer.npwp   = imageData;
                }
                else if(value == 'SIUB')
                {
                	$scope.customer.siub   = imageData;
                }
                else if(value == 'TTD')
                {
                	$scope.customer.ttd   = imageData;
                }
                else if(value == 'FS1')
                {
                	$scope.customer.FS1   = imageData;
                }
                else if(value == 'FS2')
                {
                	$scope.customer.FS2   = imageData;
                }
                
            }, 
            function(err) 
            {
                $scope.loadingcontent = false;
            });

        }, false);
    }
   	$scope.submitForm = function(customer)
    {
        console.log(customer);      
    }
});



