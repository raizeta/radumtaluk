'use strict';
myAppModule.factory('ActivitasCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,ActivitasSqliteFac,ActivitasFac)
{
    var GetActivitasCombine  = function ()
    {
    	var deferred        = $q.defer();
        ActivitasSqliteFac.GetActivitas()
        .then(function(responselocal)
        {
            if(angular.isArray(responselocal) && responselocal.length > 0)
            {
                deferred.resolve(responselocal)
            }
            else
            {
                ActivitasFac.GetAktivitas()
                .then(function(responseserver)
                {
                    if(angular.isArray(responseserver) && responseserver.length > 0)
                    {
                        angular.forEach(responseserver,function(value,key)
                        {
                            ActivitasSqliteFac.SetActivitas(value);
                        });
                        deferred.resolve(responseserver);
                    }
                    else
                    {
                        deferred.resolve([]);
                    }
                },
                function(error)
                {
                    deferred.rejected(error);
                });
            }
        })
        return deferred.promise;
    }
    
            
    return{
            GetActivitasCombine:GetActivitasCombine
        }
});