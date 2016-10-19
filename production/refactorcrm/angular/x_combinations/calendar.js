'use strict';
myAppModule.factory('CalendarCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,CalendarSqliteFac,ListKunjunganFac)
{
    var GetCalendarCombine  = function (auth)
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

    var GetCalendarByUserAndDateCombine  = function (auth,tanggalplan)
    {
        var deferred        = $q.defer();
        CalendarSqliteFac.GetCalendarByUserAndDate(auth,tanggalplan)
        .then(function(responselocal)
        {
            if(angular.isArray(responselocal) && responselocal.length > 0)
            {
                deferred.resolve(responselocal[0]);
            }
            else
            {
                ListKunjunganFac.GetGroupCustomerByTanggalPlan(auth,tanggalplan)
                .then(function(responseserver)
                {
                    if(angular.isArray(responseserver) && responseserver.length > 0)
                    {
                        CalendarSqliteFac.SetCalendar(responseserver[0]);
                        deferred.resolve(responseserver[0]); 
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
            GetCalendarCombine:GetCalendarCombine,
            GetCalendarByUserAndDateCombine:GetCalendarByUserAndDateCombine
        }
});