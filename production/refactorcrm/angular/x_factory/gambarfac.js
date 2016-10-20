'use strict';
myAppModule.factory('GambarFac',function($rootScope,$http,$q,UtilService)
{

    var setGambarAction = function(ID_DETAIL,detail)
    {
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();
        
        $http.get(url + "master/gambars/search?ID_DETAIL="+ ID_DETAIL)
        .success(function(response,status, headers, config) 
        {
            if(angular.isDefined(response.statusCode))
            {
                if (response.statusCode == 404)
                {
                    var result              = UtilService.SerializeObject(detail);
                    var serialized          = result.serialized;
                    var config              = result.config;

                    $http.post(url + "master/gambars",serialized,config)
                    .success(function(response,status, headers, config) 
                    {
                        deferred.resolve(response);
                    });
                }
            }
            else
            {
                deferred.resolve(response.Gambar[0]);  
            }
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var setEndGambarAction = function(ID_DETAIL,gambarkunjungan)
    {
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();
        $http.get(url + "master/gambars/search?ID_DETAIL="+ ID_DETAIL)
        .success(function(data,status, headers, config) 
        {
            var idgambar = data.Gambar[0].ID;
            var result              = UtilService.SerializeObject(gambarkunjungan);
            var serialized          = result.serialized;
            var config              = result.config;

            $http.put(url + "master/gambars/" + idgambar,serialized,config)
            .success(function(data,status, headers, config) 
            {
                deferred.resolve(data);
            });
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });

        return deferred.promise;
    }
    var updateGambarStatus = function(ID_DETAIL,statuskunjungan)
    {
        var url         = UtilService.ApiUrl()();
        var deferred    = $q.defer();
        $http.get(url + "master/statuskunjungans/search?ID_DETAIL=" + ID_DETAIL)
        .success(function(data,status, headers, config) 
        {
            var idstatuskunjungan = data.StatusKunjungan[0].ID;

            var resultstatus            = UtilService.SerializeObject(statuskunjungan);
            var serialized              = resultstatus.serialized;
            var config                  = resultstatus.config;
            
            $http.put(url + "master/statuskunjungans/"+ idstatuskunjungan,serialized,config)
            .success(function(data,status, headers, config) 
            {
                deferred.resolve(data);
            }); 
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });
        return deferred.promise;

    }
	return{
            setGambarAction:setGambarAction,
            updateGambarStatus:updateGambarStatus,
            setEndGambarAction:setEndGambarAction
		}
});