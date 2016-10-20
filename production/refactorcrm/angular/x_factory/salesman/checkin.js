'use strict';
myAppModule.factory('CheckInFac',function($http,$q,UtilService)
{
    var SetCheckinAction = function(ID_DETAIL,detail)
    {
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();

        $http.get(url + "master/detailkunjungans/"+ ID_DETAIL)
        .success(function(data,status,headers,config) 
        {
            if(data.CHECKIN_TIME == null || data.CHECKIN_TIME == '' || data.CHECKIN_TIME == '0000-00-00 00:00:00')
            {
                var result              = UtilService.SerializeObject(detail);
                var serialized          = result.serialized;
                var config              = result.config;

                $http.put(url + "master/detailkunjungans/"+ ID_DETAIL,serialized,config)
                .success(function(data,status,headers,config) 
                {
                    deferred.resolve(data);
                });
            }
            else
            {
                deferred.resolve(data);
            }    
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
    
    var UpdateCheckinStatus = function(ID_DETAIL,statuskunjungan)
    {
        var url         = UtilService.ApiUrl;
        var deferred    = $q.defer();
        $http.get(url + "master/statuskunjungans/search?ID_DETAIL=" + ID_DETAIL)
        .success(function (response,status, headers, config) 
        {
            if(angular.isDefined(headers()['last-modified']))
            {
                console.log("Dari Cache");
                console.log("Update Status Check In");
            }
            else
            {
                if(angular.isDefined(response.statusCode))
                {
                   if(response.statusCode == 404)
                    {
                        var result              = UtilService.SerializeObject(statuskunjungan);
                        var serialized          = result.serialized;
                        var config              = result.config;

                        $http.post(url + "master/statuskunjungans",serialized,config)
                        .success(function(data,status, headers, config) 
                        {
                            data.StatusAda = "BelumAda";
                            deferred.resolve(data);
                        });
                    } 
                }
                else
                {
                    response.StatusAda = "SudahAda";
                    deferred.resolve(response);
                }    
            }
              
        })
        .error(function (error)
        {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    var GetCheckinStatus = function(tanggalplan,auth)
    {
        var url = UtilService.ApiUrl();
        var deferred = $q.defer();
        $http.get(url + "master/statuskunjungans/search?TGL=" + tanggalplan + "&USER_ID=" + auth + "&CHECK_IN=1" + "&CHECK_OUT=0")
        .success(function(response,status, headers, config) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
              deferred.resolve(response.StatusKunjungan[0]);  
            }
            
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
            SetCheckinAction:SetCheckinAction,
            UpdateCheckinStatus:UpdateCheckinStatus,
            GetCheckinStatus:GetCheckinStatus
		}
});