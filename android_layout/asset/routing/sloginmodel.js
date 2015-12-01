var login = angular.module("sampleApp", []);

login.controller("LoginController", ['$scope','$http','$window', function($scope,$http, $window, $paramRoute) 
{
   $scope.login = function(user) 
    {
        $scope.master = angular.copy(user);
        $scope.username = $scope.master.username;
        $scope.password = $scope.master.password;

		$scope.method = 'GET';
		$scope.url = 'http://api.lukisongroup.com/login/users?username=' + $scope.username;

		$http({method: $scope.method, url: $scope.url})

        .success(function(data,status, headers, config) 
        {
            $scope.rusername = data.uservalidation.username;
            $scope.rtoken	 = data.uservalidation.token;
            $scope.rid 		 = data.uservalidation.id;
            $scope.rstatus 	 = data.uservalidation.status;
            $scope.rsite 	 = data.uservalidation.site;

            if($scope.rusername != 'none')
            {
                $scope.method = 'GET';
    			$scope.url = 'http://api.lukisongroup.com/login/passwords?id=' + $scope.rid + '&token='
                +$scope.rtoken + '&password=' +$scope.password;
    			$http({method: $scope.method, url: $scope.url})
    			
    			.success(function(data,status,header,config)
    			{
    				$scope.rlogin 	    = data.passwordvalidation.login;
    				$scope.rruleid 	    = data.passwordvalidation.rule_id;
                    $scope.rrulename    = data.passwordvalidation.rule_nm;
                    $scope.rusername    = data.passwordvalidation.username;
                    $scope.rtoken        = data.passwordvalidation.token;

                    if($scope.rlogin == 'true')
                    {
                        $window.sessionStorage["userInfo"] = [$scope.rusername,$scope.rtoken];
                        if($scope.rruleid == "1")
                        {
                          alert("Anda Login Sebagai Salesman");
                          window.location.href = "salesman.html#/salesman";
                        }
                        if($scope.rruleid == "2")
                        {
                          alert("Anda Login Sebagai Sales_Promotion_Girl");
                          window.location.href = "spg.html#/spg";
                        }  
                    }
                    
                    else
                    {
                        alert("Your User Credential Invalid. Please Check Your Username Or Your Password");
                    }

                    

    			});
            }
            else
            {
                alert("Username Yang Anda Masukkan Tidak Ada Di Database");
            }
        })

        .error(function (data, status, header, config) 
        {
          alert("Tidak Ada Koneksi Ke Web Service");      
        });
    };

    $scope.logout = function()
    {
        $window.sessionStorage.clear();
        window.location.href = "login.html";
    }

}]);

