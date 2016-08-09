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
    // var getSalesAktifitas = function(CUST_ID,PLAN_TGL_KUNJUNGAN)
    // {
    //     var globalurl       = getUrl();
    //     var deferred        = $q.defer();

    //     $http.get(globalurl + "/tipesalesaktivitas/search?UNTUK_DEVICE=ANDROID&STATUS=1")
    //     .success(function(data,status, headers, config) 
    //     {
    //         var x = data.Tipesalesaktivitas;
    //         var salesaktivitas = [];
    //         var i = 0;
    //         var databarang = $rootScope.objectdatabarangs();
    //         console.log(databarang);
    //         angular.forEach(data.Tipesalesaktivitas, function(value, key)
    //         {
    //             var barangaksi = $rootScope.barangaksi(CUST_ID,PLAN_TGL_KUNJUNGAN,value.SO_ID);
    //             var diffbarangresult = [];
    //             angular.forEach(barangaksi, function(value, key)
    //             {
    //                 var existingFilter = _.findWhere(databarang, { KD_BARANG: value });
    //                 diffbarangresult.push(existingFilter);
    //             });
    //             var diffbarang = _.difference(databarang,diffbarangresult);
    //             if(diffbarang.length == 0)
    //             {
    //                 var status={};
    //                 status.bgcolor="bg-green";
    //                 status.icon="fa fa-check bg-green";
    //                 status.show = true;
    //             }
    //             else
    //             {
    //                 var status={};
    //                 status.bgcolor="bg-aqua";
    //                 status.icon="fa fa-close bg-aqua";
    //                 status.show = true;
    //             }
                
    //             x[i].products = diffbarang;  
                
    //             x[i].status = status;
    //             salesaktivitas.push(x[i]);
    //             i = i + 1;
    //         });
    //         deferred.resolve(salesaktivitas);
    //     },
    //     function (error)
    //     {
    //         deferred.rejected(error);
    //     });
    //     return deferred.promise;
    // }
    var getSalesAktifitas = function(CUST_ID,PLAN_TGL_KUNJUNGAN)
    {
        var globalurl       = getUrl();
        var deferred        = $q.defer();
        getPureSalesAktifitas()
        .then (function (responsepuresalesaktifitas)
        {
            ProductService.GetObjectDataBarangs()
            .then (function (responseobjectdatabarang)
            {
                var databarang = responseobjectdatabarang;
                var x = responsepuresalesaktifitas;
                var salesaktivitas = [];
                var i = 0;
                angular.forEach(responsepuresalesaktifitas, function(value, key)
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
                    
                    x[i].products = diffbarang;  
                    
                    x[i].status = status;
                    salesaktivitas.push(x[i]);
                    i = i + 1;
                });
                deferred.resolve(salesaktivitas);

            });
        });
        return deferred.promise;
    }

    var getPureSalesAktifitas = function()
    {
        var globalurl       = getUrl();
        var deferred        = $q.defer();

        $http.get(globalurl + "/tipesalesaktivitas/search?UNTUK_DEVICE=ANDROID&STATUS=1")
        .success(function(response,status, headers, config) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
                deferred.resolve(response.Tipesalesaktivitas);   
            }  
        },
        function (error)
        {
            deferred.rejected(error);
        });
        return deferred.promise;  
    }

	return{
            getSalesAktifitas:getSalesAktifitas,
            getPureSalesAktifitas:getPureSalesAktifitas

		}
}]);