'use strict';
myAppModule.factory('CheckinSqliteFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,UtilService)
{
    
    var SetCheckin = function(datacheckin)
    {
        var deferred = $q.defer();
        var LAG                      = datacheckin.LAG;  //GPS LAT LOCATION
        var LAT                      = datacheckin.LAT; //GPS LNG LOCATION
        var CHECKIN_TIME             = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        var STSCHECK_IN              = 1;
        var ID                       = datacheckin.ID;

        var isitable        = [LAG,LAT,CHECKIN_TIME,STSCHECK_IN,ID];
        var querycheckin    = 'UPDATE Agenda SET LAG = ?, LAT = ?, CHECKIN_TIME = ?, STSCHECK_IN = ? WHERE ID = ?';
        $cordovaSQLite.execute($rootScope.db,querycheckin,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
            console.log(result);
        },
        function(error) 
        {
            deferred.reject(error);
            console.log(error);
        });
        return deferred.promise; 

    }

    var SetCheckout = function(datacheckout)
    {
        var deferred = $q.defer();
        var CHECKOUT_TIME            = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');  
        var STSCHECK_OUT             = 1; 
        var ID                       = datacheckout.ID;

        var isitable        = [CHECKOUT_TIME,STSCHECK_OUT,ID];
        var querycheckout   = 'UPDATE Agenda SET CHECKOUT_TIME = ?, STSCHECK_OUT = ? WHERE ID = ?';
        $cordovaSQLite.execute($rootScope.db,querycheckout,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
            console.log("Checkout Berhasil Di Update");
        },
        function(error) 
        {
            deferred.reject(error);
            console.log(error);
        });
        return deferred.promise; 

    }

    return{
            SetCheckin:SetCheckin,
            SetCheckout:SetCheckout
        }
});