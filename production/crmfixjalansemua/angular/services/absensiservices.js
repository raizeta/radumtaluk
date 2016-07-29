'use strict';
myAppModule.factory('AbsensiService', ["$rootScope","$http","$q","$filter","$window","LocationService",
function($rootScope,$http, $q, $filter, $window,LocationService)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}

    var getAbsensi = function(auth,tanggalplan)
    {
        var iduser = auth.id;
        var url = getUrl();
        var deferred = $q.defer();

        $http.get(url + "/salesmanabsensis/search?USER_ID="+ iduser + "&&TGL=" + tanggalplan,{cache:false})
        .success(function(response,status,headers,config) 
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
               deferred.resolve(response); 
            } 
        })
        .error(function(err,status)
        {
            if (status === 404)
            {
                deferred.resolve([]);
            }
            else if (status === -1)
            {
                deferred.resolve([]);
            }
            else    
            {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }
    var setAbsensi = function(detail)
    {
        var url = getUrl();
        var deferred = $q.defer();

        var result              = $rootScope.seriliazeobject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "/salesmanabsensis",serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            if (status === 404)
            {
                deferred.resolve([]);
            }
            else    
            {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }
    var updateAbsensi = function(idsalesmanabsensi,detail)
    {
        var url = getUrl();
        var deferred = $q.defer();

        var result              = $rootScope.seriliazeobject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.put(url + "/salesmanabsensis/" + idsalesmanabsensi,serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            if (status === 404)
            {
                deferred.resolve([]);
            }
            else    
            {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }
    
	return{
            getAbsensi:getAbsensi,
            setAbsensi:setAbsensi,
            updateAbsensi:updateAbsensi
		}
}]);