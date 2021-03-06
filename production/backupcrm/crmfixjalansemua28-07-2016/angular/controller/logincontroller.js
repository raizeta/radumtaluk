/* global myAppModule */
/* global angular */
'use strict';
myAppModule.controller("LoginController", ["$rootScope","$scope", "$location", "$window", "authService","focus",
function ($rootScope,$scope, $location, $window, authService,focus) 
{
    	// http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
        // directive di file directives/numberonly.js
        focus('focusUsername');
        var autouuid = $rootScope.deviceuuid;
        // var autouuid = 'sayarara';
        $scope.userInfo = null;
	    $scope.login = function (user) 
	    {
            $scope.loginLoading = true;
            $scope.disableInput = true;
            $scope.user = angular.copy(user);
	    	var username = $scope.user.username;
	    	var password	= $scope.user.password;
	    	authService.login(username, password,autouuid)
            .then(function (result) 
            {
                $scope.userInfo = result;
                var rulename = result.rulename;
                if(rulename == 'SALESMAN')
                {
                	$location.path('/history');
                }

                if(rulename == 'SALES_PROMOTION')
                {
                	$location.path('/spg');
                }
                $scope.loading = false;
                
            }, 
            function (err) 
            {          
                if(err == 'error uuid')
                {
                    alert("Login Dari HP Orang Tidak Diijinkan");
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
                
                //sweetAlert("Oops...", "Username Or Password Wrong", "error");
                $scope.loginLoading     = false;
                $scope.disableInput     = false; 
            });
	    }
}]);
