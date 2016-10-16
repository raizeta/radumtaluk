'use strict';
myAppModule.factory('OutOfCaseFac',
function($rootScope,$http,$q,$filter,$window,UtilService)
{
    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
	var SetCustOutOfCases = function(detail)
    {
        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(globalurl + "master/outofcases",serialized,config)
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
    var SetHeaderOutOfCases = function(detail)
    {
        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(globalurl + "master/jadwalkunjungans",serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            if (status === 404)
            {
                deferred.reject(err);
            }
            else    
            {
                deferred.reject(err);
            }

        });
        return deferred.promise; 
    }

	return{
            SetCustOutOfCases:SetCustOutOfCases,
            SetHeaderOutOfCases:SetHeaderOutOfCases
		}
});