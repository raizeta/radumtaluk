'use strict';
myAppModule.controller("LoginController",
function ($rootScope,$scope,$location,$window,LoginFac,focus,$cordovaDevice) 
{

    focus('focusUsername');
    $scope.userInfo = null;
    $scope.login = function (user) 
    {
        document.addEventListener("deviceready", function () 
        {
            $scope.devicemodel      = $cordovaDevice.getModel();
            $scope.deviceplatform   = $cordovaDevice.getPlatform();
            $scope.deviceuuid       = $cordovaDevice.getUUID();
            $scope.deviceversion    = $cordovaDevice.getVersion();
        }, false);

        $scope.loginLoading = true;
        $scope.disableInput = true;
        $scope.user           = angular.copy(user);
    	var username          = $scope.user.username;
    	var password	      = $scope.user.password;
        

        // LoginFac.LoginWithUuid(username, password,$scope.deviceuuid)
    	//LoginFac.Login(username, password,$scope.deviceuuid)
        LoginFac.Login(username, password,$scope.deviceuuid)
        .then(function (result) 
        {
            if(result == "username_salah")
            {
                alert("Username Tidak Ditemukan");
                $scope.user.username    = "";
                $scope.user.password    = "";
                focus('focusUsername');
                $scope.loginLoading     = false;
                $scope.disableInput     = false;
            }
            else
            {
                $scope.userInfo = result;
                var rulename = result.rulename;
                if(rulename == 'SALESMAN')
                {
                    $location.path('/absen');
                }

                if(rulename == 'SALES_PROMOTION')
                {
                    $location.path('/spg');
                }
                $scope.loading = false;
            }
        }, 
        function (err) 
        {          
            if(err == 'error uuid')
            {
                alert("Login Dari HP Orang Tidak Diijinkan");
                $scope.user.username    = "";
                $scope.user.password    = "";
                focus('focusUsername');
            }
            else if(err == 'password_salah')
            {
                alert("Password Salah");
                $scope.user.password    = "";
                focus('focusPassword'); 
            }
            else if(err == 'username_salah')
            {
                alert("Username Tidak Ditemukan");
                $scope.user.username    = "";
                $scope.user.password    = "";
                focus('focusUsername');
            }
            else if(err == 'jaringan')
            {
                alert("Koneksi Internet Diperlukan.Pastikan Sinyal dan Paket Data Anda Ada.");
                $scope.user.username    = "";
                $scope.user.password    = "";
                focus('focusUsername');
            }
            
            $scope.loginLoading     = false;
            $scope.disableInput     = false; 
        });
    }
});
