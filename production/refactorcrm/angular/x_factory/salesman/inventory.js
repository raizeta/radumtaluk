'use strict';
myAppModule.factory('InventoryFac',
function($rootScope,$http,$q,UtilService)
{
	var getInventoryByCustDateAndUser = function(customer,tanggalplan,auth)
    {
        var userid          = auth;
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();

        var url             = getUrl + "master/productinventories/search?CUST_KD=" + customer + "&TGL=" + tanggalplan + "&USER_ID=" + userid;
        var method          = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response,status, headers, config) 
        {
            if(angular.isDefined(response.statusCode))
            {
               if(response.statusCode == 404)
                {
                    deferred.resolve([]);
                }
            }
            else
            {
                deferred.resolve(response.ProductInventory); 
            }
        })
        .error(function(err)
        {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var SetInventoryAction = function(detail)
    {
        var url                 = UtilService.ApiUrl();
        var deferred            = $q.defer();
        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "master/productinventories",serialized,config)
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
            getInventoryByCustDateAndUser:getInventoryByCustDateAndUser,
            SetInventoryAction:SetInventoryAction
		}
});