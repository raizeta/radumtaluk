app.factory("authenticationSvc", ["$http","$q","$window",function ($http, $q, $window) 
{

    var userInfo;
    var deferred = $q.defer();
    function login(username, password)
    {

        var method = 'GET';
        var url = 'http://api.lukisongroup.com/login/users?username=' + username;
        $http({method: method, url: url})
        .success(function(data,status, headers, config) 
        {
            var rusername = data.uservalidation.username;
            var rtoken    = data.uservalidation.token;
            var rid       = data.uservalidation.id;
            var rstatus   = data.uservalidation.status;
            var rsite     = data.uservalidation.site;

            if(rusername != 'none')
            {
                var method = 'GET';
                var url = 'http://api.lukisongroup.com/login/passwords?id=' + rid + '&token='
                + rtoken + '&password=' + password;
                $http({method: method, url: url})
                
                .success(function(data,status,header,config)
                {
                    var rlogin       = data.passwordvalidation.login;
                    var rruleid      = data.passwordvalidation.rule_id;
                    var rrulename    = data.passwordvalidation.rule_nm;
                    var rusername    = data.passwordvalidation.username;
                    var rtoken       = data.passwordvalidation.token;

                    if(rlogin == 'true')
                    {
                        userInfo = {username:rusername,accesToken:rtoken, rule:rrulename};
                        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                        deferred.resolve(userInfo);

                    }
                    else
                    {
                        alert("Invalid Credential");
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
    
    return {login:login,getUserInfo:getUserInfo,};
}]);