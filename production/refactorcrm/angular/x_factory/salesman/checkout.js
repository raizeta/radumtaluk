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


    var UpdateCheckoutStatus = function(datastatus)
    {
        var datastatus          = datastatus;
        var url                 = UtilService.ApiUrl();;
        var deferred            = $q.defer();

        $http.get(url + "master/statuskunjungans/search?ID_DETAIL=" + datastatus.ID_DETAIL)
        .success(function(dataresponsestatus,status, headers, config) 
        {
            if(dataresponsestatus.StatusKunjungan.length > 0)
            {
                var IDSTATUS            = dataresponsestatus.StatusKunjungan[0].ID;
                var result              = UtilService.SerializeObject(datastatus);
                var serialized          = result.serialized;
                var config              = result.config;

                $http.put(url + "master/statuskunjungans/"+ IDSTATUS,serialized,config)
                .success(function(data,status, headers, config) 
                {
                    deferred.resolve(data);
                })
                .error(function(err,status)
                {
                    deferred.reject(err);
                });
            }
            else
            {
                deferred.reject(err);
            }
            
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