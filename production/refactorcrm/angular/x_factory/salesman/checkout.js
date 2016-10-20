'use strict';
myAppModule.factory('CheckOutFac',function($http,$q,UtilService)
{
    var SetCheckoutAction = function(datacheckout)
    {
        var url                 = UtilService.ApiUrl();
        var deferred            = $q.defer();

        var ID                  = datacheckout.ID;
        var result              = UtilService.SerializeObject(datacheckout);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.put(url + "master/detailkunjungans/" + ID,serialized,config)
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
            SetCheckoutAction:SetCheckoutAction
		}
});