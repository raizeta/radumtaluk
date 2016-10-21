'use strict';
myAppModule.factory('AgendaCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,AgendaSqliteFac,ListKunjunganFac,UtilService)
{
    var GetCalendarCombine  = function (auth,tanggalplan,SCDL_GROUP)
    {
    	var deferred        = $q.defer();
    	AgendaSqliteFac.GetAgendaByUserAndDate(auth,tanggalplan)
    	.then(function(responselocal)
    	{
    		if(angular.isArray(responselocal) && responselocal.length > 0)
    		{                
                var databaru = UtilService.SetGambarCheckinCheckout(responselocal);
                deferred.resolve(databaru);
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
                        
                        var databaru = UtilService.SetGambarCheckinCheckout(responseserver);
                        deferred.resolve(databaru);
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