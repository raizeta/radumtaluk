'use strict';
myAppModule.factory('LastVisitService', ["$http","$q","$window",function($http, $q, $window)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}
	
	var LastVisitSummaryAll = function(tanggalplan,idgroupcustomer)
	{
		
		var config = 
        {
            headers : 
            {
                'Origin':'*',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache;no-store',
                'Max-Age' : 0,
                'Pragma': 'no-cache',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'     
            }
        };
		var globalurl = getUrl();
		var deferred = $q.defer();
		var url = globalurl + "/lastvisitallsummaries/search?TGL1=" + tanggalplan + "&SCDL_GROUP=" + idgroupcustomer;
		var method ="GET";
        $http({method:method, url:url,config:config})
		.success(function(response,status,headers) 
		{
			if(status === 200)
			{

				var BarangSummaryAll = response.Jadwalkunjungan;
		        var customers   = [];
		        _.each(BarangSummaryAll, function(executes) 
		        {
		            var existingCustomer = _.findWhere(customers, { CUST_KD: executes.CUST_KD });
		            if (existingCustomer) 
		            {
		            	var products = existingCustomer.products;

		            	var existproducts = _.findWhere(products, { KD_BARANG: executes.KD_BARANG });
		            	if(existproducts)
		            	{
		            		existproducts['TYPE' + executes.SO_TYPE]  = executes.SO_QTY;
		            	}
		            	else
		            	{
		            		var product = {};
		            		product.KD_BARANG = executes.KD_BARANG;
		            		product.NM_BARANG = executes.NM_BARANG;
		            		product['TYPE' + executes.SO_TYPE]  = executes.SO_QTY;
		            		products.push(product);
		            	}

		            }
		            else
		            {
		            	var customer = {};
		            	customer.CUST_KD = executes.CUST_KD;
		            	customer.CUST_NM = executes.CUST_NM;

		            	var products = [];
		            	var product = {};
		            	product.KD_BARANG = executes.KD_BARANG;
		            	product.NM_BARANG = executes.NM_BARANG;
		            	product['TYPE' + executes.SO_TYPE]  = executes.SO_QTY;

		            	products.push(product);
		            	customer.products = products;
		            	customers.push(customer);
		            }
		        });

		        deferred.resolve(customers); 
	        }
	        else if(status === 304)
	        {
	        	alert("Status Sukses Dengan Kode 304");
	        }
		})
		.error(function(err,status)
        {
			if (status === 404)
			{
	        	alert("error" + 404);
	        	deferred.resolve([]);
	      	}
	      	if (status === 304)
			{
	        	alert("Status Error Dengan Status Kode 304");
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });
        return deferred.promise;		  
	}

	return{
			LastVisitSummaryAll:LastVisitSummaryAll,
		}
}]);