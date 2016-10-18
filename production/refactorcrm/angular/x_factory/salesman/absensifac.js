'use strict';
myAppModule.factory('AbsensiFac',
function($rootScope,$http,$q,$filter,$window,UtilService)
{
    var getAbsensi = function(auth,tanggalplan)
    {
        var iduser      = auth.id;
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Pragma': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
            }
        };

        var linkurl =   url + "master/salesmanabsensis/search?USER_ID="+ iduser + "&TGL=" + tanggalplan;
        $http({method:'GET', url:linkurl,config:config})
        .success(function(response) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else if(angular.isDefined(response.Salesmanabsensi))
            {
                deferred.resolve(response.Salesmanabsensi); 
            }
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        }); 

        return deferred.promise;
    }
    
    var setAbsensi = function(detail)
    {
        var url                 = UtilService.ApiUrl();
        var deferred            = $q.defer();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "master/salesmanabsensis",serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err)
        {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
    var updateAbsensi = function(AbsenID,detail)
    {
        var url                 = UtilService.ApiUrl();
        var deferred            = $q.defer();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.put(url + "master/salesmanabsensis/" + AbsenID,serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
	return{
            getAbsensi:getAbsensi,
            setAbsensi:setAbsensi,
            updateAbsensi:updateAbsensi
		}
});