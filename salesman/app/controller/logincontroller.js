/* global myAppModule */
/* global angular */
'use strict';
app.controller("LoginController", ["$scope", "$location", "$window", "authService",
function ($scope, $location, $window, authService) 
{
    	
        $scope.userInfo = null;

	    $scope.login = function (user) 
	    {
            $scope.user = angular.copy(user);
	    	var username = $scope.user.username;
	    	var password	= $scope.user.password;
	    	authService.login(username, password)
            .then(function (result) 
            {
                $scope.userInfo = result;
                var rulename = result.rulename;
                if(rulename == 'SALESMAN')
                {
                	$location.path('/dash');
                }
            },

            function (error) 
            {          
                $window.alert("Invalid credentials");
                
            });

	    }
}]);
