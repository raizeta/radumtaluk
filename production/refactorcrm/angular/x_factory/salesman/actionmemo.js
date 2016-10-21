'use strict';
myAppModule.factory('ActionMemoFac',function($http,$q,UtilService)
{

	var SetMemo = function(salesmanmemo)
    {
        var url             = UtilService.ApiUrl();
        var deferred        = $q.defer();

        var result          = UtilService.SerializeObject(salesmanmemo);
        var serialized      = result.serialized;
        var config          = result.config;

        $http.post(url + "master/messageskunjungans",serialized,config)
        .success(function(data,status, headers, config) 
        {
            var statusmemokunjungan                         = {};

            statusmemokunjungan.bgcolor                     = "bg-green";
            statusmemokunjungan.icon                        = "fa fa-check bg-green";
            statusmemokunjungan.messageskunjungandisabled   = true;

            deferred.resolve(statusmemokunjungan);
        })
        .error(function(err)
        {
            deferred.reject(err);
        });

        return deferred.promise;
    }
    
    var GetMemo = function(ID_DETAIL)
    {
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();

        $http.get(url + "master/messageskunjungans/search?ID_DETAIL=" + ID_DETAIL)
        .success(function(response,status, headers, config) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
                var statusmemokunjungan                         = {};
                statusmemokunjungan.ISI_MESSAGES                = response.Messageskunjungan[0].ISI_MESSAGES;
                statusmemokunjungan.bgcolor                     = "bg-green";
                statusmemokunjungan.icon                        = "fa fa-check bg-green";
                statusmemokunjungan.messageskunjungandisabled   = true;
                deferred.resolve(statusmemokunjungan); 
            }
        })
        .error(function(err)
        {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }

    return{
            SetMemo:SetMemo,
            GetMemo:GetMemo
		}
});