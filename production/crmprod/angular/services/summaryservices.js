'use strict';
myAppModule.factory('SummaryService', ["$http","$q","$window",function($http, $q, $window)
{
	var getUrl = function()
	{
		return "http://api.lukisongroup.com/master";
	}
	var gettoken = function()
	{
		return "?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa";
	}
	
	var datasummaryall = function(idsalesman,tanggalplan,idgroupcustomer)
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
		var url = globalurl + "/inventorysummaryalls/search?TGL=" + tanggalplan + "&USER_ID=" + idsalesman + "&SCDL_GROUP=" + idgroupcustomer;
		var method ="GET";
        $http({method:method, url:url,config:config})
		.success(function(response,status,headers) 
		{
			console.log(headers());
			if(status === 200)
			{

				var BarangSummaryAll = response.InventorySummaryAll;
		        var filtersproduct   = [];
		        _.each(BarangSummaryAll, function(execute) 
		        {
		            var existingFilter = _.findWhere(filtersproduct, { CUST_ID: execute.CUST_ID });
		            if (existingFilter) 
		            {
		                var index = filtersproduct.indexOf(existingFilter);
		                var product     = {};
		                product.KD_BARANG       = execute.KD_BARANG;
		                product.NM_BARANG       = execute.NM_BARANG;
		                product.STOCK           = execute.STOCK;
		                product.SELL_IN         = execute.SELL_IN;
		                product.SELL_OUT        = execute.SELL_OUT;
		                filtersproduct[index].products.push(product);
		            }
		            else
		            {
		                var filter      = {};
		                var product     = {};
		                filter.CUST_ID      = execute.CUST_ID;
		                filter.CUST_NM      = execute.CUST_NM;

		                product.KD_BARANG       = execute.KD_BARANG;
		                product.NM_BARANG       = execute.NM_BARANG;
		                product.STOCK           = execute.STOCK;
		                product.SELL_IN         = execute.SELL_IN;
		                product.SELL_OUT        = execute.SELL_OUT;

		                filter.products=[];
		                filter.products.push(product);
		                filtersproduct.push(filter);
		            }
		        });
		        var filtersquantity= [];
		        angular.forEach(filtersproduct, function(value, key)
		        {
		            angular.forEach(value.products, function(value, key)
		            {
		                var existingFilter = _.findWhere(filtersquantity, { NM_BARANG: value.NM_BARANG });
		                if (existingFilter) 
		                {
		                    var index = filtersquantity.indexOf(existingFilter);

		                    var xsellin = parseInt(filtersquantity[index].TOTSELL_IN);
		                    var ysellin = parseInt(value.SELL_IN);
		                    var zsellin = xsellin + ysellin;

		                    var xsellout = parseInt(filtersquantity[index].TOTSELL_OUT);
		                    var ysellout = parseInt(value.SELL_OUT);
		                    var zsellout = xsellout + ysellout;

		                    var xstock = parseInt(filtersquantity[index].TOTSTOCK);
		                    var ystock = parseInt(value.STOCK);
		                    var zstock = xstock + ystock;

		                    filtersquantity[index].TOTSELL_IN  = zsellin;
		                    filtersquantity[index].TOTSELL_OUT = zsellout;
		                    filtersquantity[index].TOTSTOCK    = zstock;
		                }
		                else
		                {
		                    var filter      = {};
		                    filter.KD_BARANG            = value.KD_BARANG;
		                    filter.NM_BARANG            = value.NM_BARANG;
		                    filter.TOTSELL_IN           = value.SELL_IN;
		                    filter.TOTSELL_OUT          = value.SELL_OUT;
		                    filter.TOTSTOCK             = value.STOCK;
		                    filtersquantity.push(filter);
		                }
		            });
		        });

				var result = {};
				result.siteres = filtersproduct;
		        result.totalalls = filtersquantity;
		        deferred.resolve(result); 
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

	var datasummarypercustomer = function(tanggalplan,idcustomer,idsalesman)
	{
		var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                
            }
        };
		var url = getUrl();
		var deferred = $q.defer();
		var url = url + "/inventorysummaries/search?TGL=" + tanggalplan + "&CUST_KD=" + idcustomer + "&USER_ID=" + idsalesman;
		var method ="GET";
		$http({method:method, url:url,config:config,cache:false})
		.success(function(response) 
		{
			deferred.resolve(response);
		})
		.error(function(err,status)
        {
			if (status === 404)
			{
	        	deferred.resolve([]);
	      	}
	      	else	
      		{
	        	deferred.reject(err);
	      	}
        });
		return deferred.promise;
	}

	return{
			datasummaryall:datasummaryall,
			datasummarypercustomer:datasummarypercustomer
		}
}]);