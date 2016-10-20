'use strict';
myAppModule.factory('CheckOutFac',function($http,$q,UtilService)
{
    var SetCheckoutAction = function(ID_DETAIL,datacheckout)
    {
        var url                 = UtilService.ApiUrl();
        var deferred            = $q.defer();
        var result              = UtilService.SerializeObject(datacheckout);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.put(url + "master/detailkunjungans/" + ID_DETAIL,serialized,config)
        .success(function(data,status, headers, config) 
        {
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    var UpdateCheckoutStatus = function(idstatuskunjungan,statuskunjungan)
    {
        var url                     = UtilService.ApiUrl;
        var deferred                = $q.defer();

        var resultstatus            = $rootScope.seriliazeobject(statuskunjungan);
        var serialized              = resultstatus.serialized;
        var config                  = resultstatus.config;

        $http.put(url + "master/statuskunjungans/"+ idstatuskunjungan,serialized,config)
        .success(function(data,status, headers, config) 
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
            SetCheckoutAction:SetCheckoutAction,
            UpdateCheckoutStatus:UpdateCheckoutStatus
		}
});