'use strict';
myAppModule.factory('CalendarCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,CalendarSqliteFac,ListKunjunganFac)
{
    var GetAgendaCombine  = function (auth)
    {
    	var deferred        = $q.defer();
    	CalendarSqliteFac.GetCalendarByUser(auth)
    	.then(function(responselocal)
    	{
    		if(angular.isArray(responselocal) && responselocal.length > 0)
            {
        		deferred.resolve(responselocal);
            }
            else
            {
            	ListKunjunganFac.GetAllAgendaByUser(auth)
            	.then(function(responseserver)
            	{
                    angular.forEach(responseserver,function(value,key)
                    {
                        CalendarSqliteFac.SetCalendar(value);
                    });
                    deferred.resolve(responseserver);
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
            GetAgendaCombine:GetAgendaCombine
        }
});