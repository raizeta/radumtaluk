'use strict';
myAppModule.factory('CheckInFac',function($http,$q,UtilService)
{
    var SetCheckinAction = function(datacheckin)
    {
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();

        var ID          = datacheckin.ID;
        $http.get(url + "master/detailkunjungans/"+ ID)
        .success(function(resgetcheckin,status,headers,config) 
        {
            if(resgetcheckin.CHECKIN_TIME == null || resgetcheckin.CHECKIN_TIME == '' || resgetcheckin.CHECKIN_TIME == '0000-00-00 00:00:00')
            {
                var result              = UtilService.SerializeObject(datacheckin);
                var serialized          = result.serialized;
                var config              = result.config;

                $http.put(url + "master/detailkunjungans/"+ ID,serialized,config)
                .success(function(resputcheckin,status,headers,config) 
                {
                    deferred.resolve(resputcheckin);
                });
            }
            else
            {
                deferred.resolve(resgetcheckin);
            }    
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });
        return deferred.promise;
    }    
	return{
            SetCheckinAction:SetCheckinAction
		}
});