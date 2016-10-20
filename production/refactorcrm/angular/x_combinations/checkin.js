'use strict';
myAppModule.factory('CheckinCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,AbsensiSqliteFac,AbsensiFac)
{

    var SetCheckinCombine   = function(auth,tanggalplan,googlemaplat,googlemaplong)
    {
    	var deferred        	= $q.defer();
        return deferred.promise;
    }
    
    return{
            SetCheckinCombine:SetCheckinCombine
        }
});