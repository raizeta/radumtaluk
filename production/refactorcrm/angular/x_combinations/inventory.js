'use strict';
myAppModule.factory('InventoryCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,InventorySqliteFac,InventoryFac)
{

    var SetInventoryComb   = function(datainventory,DIALOG_TITLE)
    {
    	var deferred        	= $q.defer();
        InventoryFac.SetInventoryAction(datainventory)
        .then(function(responseserver)
        {
            InventorySqliteFac.SetInventory(responseserver,DIALOG_TITLE)
            .then (function (responselocal)
            {
                deferred.resolve(responselocal);  
            });
        },
        function(error)
        {
            deferred.reject(error);
        });
        return deferred.promise;
    }
   
    return{
            SetInventoryComb:SetInventoryComb,
        }
});