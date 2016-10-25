'use strict';
myAppModule.factory('ActivitasFac',function($rootScope,$http,$q,UtilService)
{
	var GetAktivitas = function()
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();

        var url             = getUrl + "master/tipesalesaktivitas/search?STATUS=1&UNTUK_DEVICE=ANDROID";
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
                deferred.resolve(response.Tipesalesaktivitas); 
            }
        })
        .error(function(err)
        {
            deferred.reject(err);
        });

        return deferred.promise;
    }

	return{
            GetAktivitas:GetAktivitas
		}
});