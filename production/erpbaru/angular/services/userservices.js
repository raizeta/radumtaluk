'use strict';


myAppModule.factory('UserService', ["$rootScope","$http","$q","$window",
function($rootScope,$http, $q, $window)
{

    var geturl = function()
    {
        //return "http://labtest3-api.int/";
        return "http://api.lukisongroup.com/";
    }

    var gettoken = function()
    {
        return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
    }
	var GetUsers = function()
	{
		var url = geturl();

        var deferred = $q.defer();

		var url = url + "login/employes";
		var method ="GET";
		$http({method:method, url:url,cache:true})
        .success(function(response) 
        {
    		deferred.resolve(response);
        })
        .error(function()
        {
            deferred.reject(error);
        });

        return deferred.promise;
	}
	return{GetUsers:GetUsers}
}]);