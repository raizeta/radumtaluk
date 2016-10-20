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
                var databaru = [];
                angular.forEach(responselocal, function(value, key) 
                {
                    alert(value.STSCHECK_IN);
                    if(value.STSCHECK_IN  == 0 || value.STSCHECK_IN  == null)
                    {
                        value.imagecheckout = "asset/admin/dist/img/normal.jpg";
                    }
                    else
                    {
                        if((value.STSCHECK_OUT  == 1))
                        {
                            value.imagecheckout = "asset/admin/dist/img/customer.jpg";
                        }
                        else
                        {
                            value.imagecheckout = "asset/admin/dist/img/customerlogo.jpg";
                        } 
                    }
                    databaru.push(value);
                });
                deferred.resolve(databaru);
    		}
    		else
    		{
    			ListKunjunganFac.GetSingleDetailKunjunganProsedur(auth,tanggalplan,SCDL_GROUP)
    			.then(function(responseserver)
    			{
                    if(angular.isArray(responseserver) && responseserver.length > 0)
    				{
    					var databaru = [];
                        angular.forEach(responseserver,function(value,key)
    					{
    						AgendaSqliteFac.SetAgenda(value);
                            alert(value.STSCHECK_IN);
                            if(value.STSCHECK_IN  == 0 || value.STSCHECK_IN  == null)
                            {
                                value.imagecheckout = "asset/admin/dist/img/normal.jpg";
                            }
                            else
                            {
                                if((value.STSCHECK_OUT  == 1))
                                {
                                    value.imagecheckout = "asset/admin/dist/img/customer.jpg";
                                }
                                else
                                {
                                    value.imagecheckout = "asset/admin/dist/img/customerlogo.jpg";
                                } 
                            }
                            databaru.push(value);
    					});
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