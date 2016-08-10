'use strict';
myAppModule.factory('SalesAktifitas', ["$rootScope","$http","$q","$filter","$window","ProductService",
function($rootScope,$http, $q, $filter, $window, ProductService)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}
    
    var getSalesAktifitas = function(CUST_ID,PLAN_TGL_KUNJUNGAN,resolveobjectbarang,resolvesot2type)
    {
        var globalurl       = getUrl();
        var deferred        = $q.defer();

        var databarang = resolveobjectbarang;
        var salesaktivitas = [];
        var i = 0;
        
        angular.forEach(resolvesot2type, function(value, key)
        {
            var barangaksi = $rootScope.barangaksi(CUST_ID,PLAN_TGL_KUNJUNGAN,value.SO_ID);
            var diffbarangresult = [];
            angular.forEach(barangaksi, function(value, key)
            {
                var existingFilter = _.findWhere(databarang, { KD_BARANG: value });
                diffbarangresult.push(existingFilter);
            });
            var diffbarang = _.difference(databarang,diffbarangresult);
            if(diffbarang.length == 0)
            {
                var status={};
                status.bgcolor="bg-green";
                status.icon="fa fa-check bg-green";
                status.show = true;
            }
            else
            {
                var status={};
                status.bgcolor="bg-aqua";
                status.icon="fa fa-close bg-aqua";
                status.show = true;
            }
            
            resolvesot2type[i].products  = diffbarang;  
            resolvesot2type[i].status    = status;
            
            salesaktivitas.push(resolvesot2type[i]);
            i = i + 1;
        });
        deferred.resolve(salesaktivitas);

        return deferred.promise;
    }

	return{
            getSalesAktifitas:getSalesAktifitas,
		}
}]);