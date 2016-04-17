'use strict';


myAppModule.factory('authService', ["$http","$q","$window","sweet",function($http, $q, $window,sweet)
{
	var userInfo;
    var geturl = function()
    {
        //return "http://labtest3-api.int/";
        return "http://api.lukisongroup.com/";
    }

    var gettoken = function()
    {
        return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
    }

	var login = function(username,password)
	{
		var urla = geturl();

        var deferred = $q.defer();
		var username = username;
		var password = password;
		var url = urla + "login/users?username=" + username;
		var method ="GET";
		$http({method:method, url:url})
        .success(function(response) 
        {
            //console.log(response);
            var rusername 	= response.uservalidation.username;
            var rid			= response.uservalidation.id;
            var rtoken		= response.uservalidation.token;
            var site		= response.uservalidation.site;

            var url = urla + "login/passwords?id=" + rid + "&token=" + rtoken + "&password=" + password;
			var method ="GET";
			$http({method:method, url:url})
			.success(function(response)
			{
				var statuslogin = response.passwordvalidation.login;
				var rulename	= response.passwordvalidation.rule_nm;
                var accessid    = response.passwordvalidation.accessid;
                //console.log(accessid );
				if(statuslogin == 'true')
					{
						userInfo = 
						{
							accessToken: rtoken,
                    		username: rusername,
                    		rulename:rulename,
                            id:rid,
                            accessid:accessid
                		};
                		$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                		deferred.resolve(userInfo);
					}
                else
                {
                    deferred.reject("error");
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