'use strict';
myAppModule.factory('AgendaSqliteServices', ["$rootScope","$http","$q","$filter","$window","$cordovaSQLite",
function($rootScope,$http, $q, $filter, $window,$cordovaSQLite)
{
    var getUrl = function()
    {
        return "http://api.lukisongroup.com/master";
    }
    var gettoken = function()
    {
        return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
    }
    
    var getCheckinCheckoutStatus = function (tanggalplan,userid)
    {
        var deferred = $q.defer();
        var queryagendatoday = "SELECT * FROM Agenda WHERE TGL = ? AND USER_ID = ? AND CHECK_IN = ? AND CHECK_OUT = ?";
        $cordovaSQLite.execute($rootScope.db, queryagendatoday, [tanggalplan, userid, 1, 0])
        .then(function(result) 
        {
            console.log("Success getCheckinCheckoutStatus");
            
            if (result.rows.length > 0) 
            {
                deferred.resolve(result.rows.item(0).ID_SERVER);
            }
            else
            {
                deferred.resolve([]);
            }
        },
        function (error)
        {
            alert("Error getCheckinCheckoutStatus")
            deferred.rejected(error);
        });
        return deferred.promise;
    }
    var getAgendaByIdServer = function (ID_SERVER)
    {
        var deferred = $q.defer();
        var queryagendatoday = "SELECT * FROM Agenda WHERE ID_SERVER = ?";
        $cordovaSQLite.execute($rootScope.db, queryagendatoday, [ID_SERVER])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                deferred.resolve(result.rows.item(0));
            }
            else
            {
                deferred.resolve([]);
            }
        },
        function (error)
        {
            alert("Error Get Customer Agenda By Param ID_SERVER");
            deferred.rejected(error);
        });
        return deferred.promise;
    }
    return{
            getCheckinCheckoutStatus:getCheckinCheckoutStatus,
            getAgendaByIdServer:getAgendaByIdServer
        }
}]);