'use strict';
myAppModule.factory('AgendaCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,AgendaSqliteFac,ListKunjunganFac)
{
    var GetCalendarCombine  = function (auth,tanggalplan,SCDL_GROUP)
    {
    	var deferred        = $q.defer();
    	AgendaSqliteFac.GetAgendaByUserAndDate(auth,tanggalplan)
    	.then(function(responselocal)
    	{
    		if(angular.isArray(responselocal) && responselocal.length > 0)
    		{
    			deferred.resolve(responselocal);
    		}
    		else
    		{
    			ListKunjunganFac.GetSingleDetailKunjunganProsedur(auth,tanggalplan,SCDL_GROUP)
    			.then(function(responseserver)
    			{
                    if(angular.isArray(responseserver) && responseserver.length > 0)
    				{
    					angular.forEach(responseserver,function(value,key)
    					{
    						AgendaSqliteFac.SetAgenda(value);
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
                    deferred.reject(error);
    			});
    		}
    	});
    	return deferred.promise;
    }
   
    return{
    		GetCalendarCombine:GetCalendarCombine
        }
});