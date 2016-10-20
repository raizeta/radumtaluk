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
    var SetHeaderOutOfCases = function(auth)
    {
        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();

        var detail = {};
        
        detail.TGL1         = $filter('date')(new Date(),'yyyy-MM-dd');
        detail.TGL2         = $filter('date')(new Date(),'yyyy-MM-dd');
        detail.SCDL_GROUP   = 'OUTOFCASE';
        detail.USER_ID      = auth.id;
        detail.NOTE         = 'OUTOFCASE';
        detail.STATUS       = 1;
        detail.CREATE_BY    = auth.id;
        detail.CREATE_AT    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.UPDATE_BY    = auth.id;
        detail.STT_UBAH     = 1;
        detail.UPDATE_AT    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

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