'use strict';
myAppModule.factory('LoginFac', ["$http","$q","$window","$rootScope","UtilService",
function($http,$q,$window,$rootScope,UtilService)
{
	var userInfo;

    var Login = function(username,password)
    {
        var urla        = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var username    = username;
        var password    = password;
        var url         = urla + "login/users?username=" + username;
        var method      = "GET";
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
                var gambar1     = response.uservalidation.image64;
                
                var url         = urla + "login/passwords?id=" + rid + "&token=" + rtoken + "&password=" + password;
                var method      = "GET";
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
                            rulename:rulename,
                            id:rid,
                            accessid:accessid,
                            gambar:gambar
                        };
                        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
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
            if(err)
            {
                if(angular.isDefined(err.code))
                {
                    if(err.code == 8 || err.code =='8')
                    {
                        deferred.reject("username_salah");
                    }
                }
            }
            else
            {
                deferred.reject("jaringan");
            }
        });

        return deferred.promise;
    }

    var LoginWithUuid = function(username,password,autouuid)
    {
        var urla        = UtilService.ApiUrl();
        var deferred    = $q.defer();

        var username    = username;
        var password    = password;
        var autouuid    = autouuid;
        var url         = urla + "login/users?username=" + username;
        var method      = "GET";
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
                var rusername       = response.uservalidation.username;
                var rid             = response.uservalidation.id;
                var rtoken          = response.uservalidation.token;
                var site            = response.uservalidation.site;
                var gambar1         = response.uservalidation.image64;

                var url = urla + "login/passwords?id=" + rid + "&token=" + rtoken + "&password=" + password;
                var method ="GET";
                $http({method:method, url:url})
                .success(function(response)
                {

                    var statuslogin = response.passwordvalidation.login;
                    var rulename    = response.passwordvalidation.rule_nm;
                    var accessid    = response.passwordvalidation.accessid;
                    var uuid        = response.passwordvalidation.uuid;
                    if(statuslogin == "false" || statuslogin == false)
                    {
                        deferred.reject("password_salah");
                    }
                    else
                    {
                        if((uuid === '' || uuid === null))
                        {
                            var urluuid = urla + "login/uuids/" + rid;
                            $http.get(urluuid)
                            .success(function(data,status, headers, config) 
                            {
                                data.UUID = autouuid;
                                var result              = $rootScope.seriliazeobject(data);
                                var serialized          = result.serialized;
                                var config              = result.config;
                                $http.put(urluuid,serialized,config)
                                .success(function(data,status, headers, config) 
                                {
                                    var gambar = gambar1;
                                    if(statuslogin == 'true')
                                    {
                                        userInfo = 
                                        {
                                            accessToken: rtoken,
                                            username: rusername,
                                            rulename:rulename,
                                            id:rid,
                                            accessid:accessid,
                                            gambar:gambar,
                                            uuid:uuid
                                        };
                                        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                                        deferred.resolve(userInfo);
                                    }
                                    else
                                    {
                                        deferred.reject("error");
                                    }
                                });
                            });
                        }
                        else if((uuid != autouuid))
                        {
                            statuslogin = 'false';
                            deferred.reject("error uuid");
                        }
                        else if((uuid == autouuid))
                        {
                            var gambar = gambar1;
                            if(statuslogin == 'true')
                            {
                                userInfo = 
                                {
                                    accessToken: rtoken,
                                    username: rusername,
                                    rulename:rulename,
                                    id:rid,
                                    accessid:accessid,
                                    gambar:gambar,
                                    uuid:uuid
                                };
                                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                                deferred.resolve(userInfo);
                            }
                            else
                            {
                                deferred.reject("error");
                            }
                        }  
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
            if(err)
            {
                if(angular.isDefined(err.code))
                {
                    if(err.code == 8 || err.code =='8')
                    {
                        deferred.reject("username_salah");
                    }
                }   
            }
            else
            {
                deferred.reject("jaringan");
            } 
        });

        return deferred.promise;
    }

    var getManagers = function(username,password,autouuid)
    {
        var urla        = UtilService.ApiUrl()();
        var deferred    = $q.defer();

        var autouuid    = autouuid;
        var urluuid = urla + "login/uuids/search?POSITION_ACCESS=1";
        $http.get(urluuid)
        .success(function(response,status, headers, config) 
        {
            if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                }
            }
            else
            {
                deferred.resolve(response.user); 
            }
        })
        .error(function(err)
        {
            deferred.reject("username_salah");
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

	return {
        Login:Login,
        getUserInfo:getUserInfo,
        LoginWithUuid:LoginWithUuid,
        getManagers:getManagers
    }
}]);