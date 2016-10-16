'use strict';
myAppModule.factory('SalesmanFac',
function($rootScope,$http,$q,UtilService)
{
	var getSalesmans = function()
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();

        var autouuid        = autouuid;
        var urluuid         = getUrl + "login/uuids/search?POSITION_ACCESS=1";
        $http.get(urluuid)
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
                deferred.resolve(response.user); 
            }
        })
        .error(function(err)
        {
            deferred.reject("username_salah");
        });

        return deferred.promise;
    }

	return{
            getSalesmans:getSalesmans
		}
});