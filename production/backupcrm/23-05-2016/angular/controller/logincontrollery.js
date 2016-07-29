/* global myAppModule */
/* global angular */
'use strict';
myAppModule.controller("LoginController", ["$rootScope","$scope", "$location", "$window", "authService","$http",
function ($rootScope,$scope, $location, $window, authService,$http) 
{
    	
        var url = $rootScope.linkurl;
        $scope.userInfo = null;
	    $scope.login = function (user) 
	    {
            $scope.loginLoading = true;
            $scope.disableInput = true;
            $scope.user = angular.copy(user);
	    	var username = $scope.user.username;
	    	var password	= $scope.user.password;

            var url = "http://api.lukisongroup.com/login/users?username=" + username;
            var method ="GET";
            var ambillogin = function()
            {

                $http.get(url)
                .success(function(data,status, headers, config) 
                {
                    console.log(data);
                    var rusername   = data.uservalidation.username;
                    var rid         = data.uservalidation.id;
                    var rtoken      = data.uservalidation.token;
                    var site        = data.uservalidation.site;

                    var urls = "http://api.lukisongroup.com/login/passwords?id=" + rid + "&token=" + rtoken + "&password=" + password;
                    var datalogin = $.ajax
                    ({
                          url: urls,
                          type: "GET",
                          dataType:"json",
                          async: false
                    }).responseText;
                    var resultlogin = JSON.parse(datalogin)['passwordvalidation'];

                    var statuslogin = resultlogin.login;
                    var rulename    = resultlogin.rule_nm;
                    var accessid    = resultlogin.accessid;
                });
            }
            ambillogin();

	    }
}]);
