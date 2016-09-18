angular.module('starter')
.factory('SecuredFac',function($http, $q, $window,$rootScope)
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


    var Login = function(username,password,uuid)
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
            if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve("username_salah");
                }
            }
            else
            {
                var rusername   = response.uservalidation.username;
                var rid         = response.uservalidation.id;
                var rtoken      = response.uservalidation.token;
                var site        = response.uservalidation.site;
                var gambar1      = response.uservalidation.image64;
                var url = urla + "login/passwords?id=" + rid + "&token=" + rtoken + "&password=" + password;
                var method ="GET";
                $http({method:method, url:url})
                .success(function(response)
                {
                    var statuslogin = response.passwordvalidation.login;
                    var rulename    = response.passwordvalidation.rule_nm;
                    var accessid    = response.passwordvalidation.accessid;
                    var gambar      = gambar1;
                    if(statuslogin == 'true')
                    {
                        userInfo = 
                        {
                            accessToken: rtoken,
                            username: rusername,
                            site:site,
                            rulename:rulename,
                            id:rid,
                            accessid:accessid,
                            gambar:gambar
                        };
                        deferred.resolve(userInfo);
                    }
                    else
                    {
                        deferred.reject("password_salah");
                    }
                })
                .error(function(err)
                {
                    deferred.reject("username_salah");
                });  
            }
            
        })
        .error(function(err,status)
        {
            if(angular.isDefined(err.code))
            {
                if(err.code == 8 || err.code =='8')
                {
                    deferred.reject("username_salah");
                }
            }
            else
            {
                deferred.reject("jaringan");
            }
        });

        return deferred.promise;
    }

	return{
            Login:Login,
        }
});