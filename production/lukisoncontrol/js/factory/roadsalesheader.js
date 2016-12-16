angular.module('starter')
.factory('RoadSalesHeaderFac',function($http,$q,$filter,UtilService)
{
    var GetRoadSalesHeader = function(tanggalstart)
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = getUrl + "master/roadsalesheaders";
        $http.get(url)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data.Roadsalesheader);
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
    var CreateRoadSalesHeader = function(data)
    {
        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();
        var url                 = globalurl + "master/roadsalesheaders";

        var result              = UtilService.SerializeObject(data);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url,serialized,config)
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
            GetRoadSalesHeader:GetRoadSalesHeader,
            CreateRoadSalesHeader:CreateRoadSalesHeader
		}
});