'use strict';
myAppModule.factory('authService', ["$http","$q","$window",function($http, $q, $window)
{
	var userInfo;
	var login = function(username,password)
	{
		var deferred = $q.defer();
		var username = username;
		var password = password;
		var url = "http://api.lukison.int/login/users?username=" + username;
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
            var rusername 	= response.uservalidation.username;
            var rid			= response.uservalidation.id;
            var rtoken		= response.uservalidation.token;
            var site		= response.uservalidation.site;

            var url = "http://api.lukison.int/login/passwords?id=" + rid + "&token="
                + rtoken + "&password=" + password;
			var method ="GET";
			$http({method:method, url:url})
			.success(function(response)
			{
				var statuslogin = response.passwordvalidation.login;
				var rulename	= response.passwordvalidation.rule_nm;
				if(statuslogin == 'true')
					{
						userInfo = 
						{
							accessToken: rtoken,
                    		username: rusername,
                    		rulename:rulename
                		};
                		$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                		deferred.resolve(userInfo);
					}
                else
                {
                    alert("You Have Invalid Credential");
                }
			})
            .error(function()
            {
                deferred.reject(error);
            });
        })

        .error(function()
        {
            deferred.reject(error);
        });

        return deferred.promise;
	}

	function getUserInfo() 
	{
        return userInfo;
    }
    function init() 
    {
        if ($window.sessionStorage["userInfo"]) 
        {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();
	return{login:login,getUserInfo:getUserInfo}
}]);