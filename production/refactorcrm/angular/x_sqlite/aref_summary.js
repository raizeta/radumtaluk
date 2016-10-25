'use strict';
myAppModule.factory('SummarySqliteFac',function($rootScope,$http,$q,$filter,$window,$cordovaSQLite)
{
    var GetSummaryAllCustomers = function (auth,tanggalplan,resolvebarang,resolveaktifitas)
    {
        var deferred = $q.defer();

        var productdas      = resolvebarang;
        var typepenjualan   = resolveaktifitas;
        var auth            = auth;
        var tanggalplan     = tanggalplan;

        var querysummary = 'SELECT * FROM Inventory WHERE USER_ID = ? AND TGL = ? ';
        $cordovaSQLite.execute($rootScope.db, querysummary, [auth.id,tanggalplan])
        .then(function(result) 
        {
            if (result.rows.length > 0) 
            {
                var summaryallcustomer = [];
                var l = result.rows.length;
                for (var i=0; i < l; i++) 
                {
                    var summary = {};
                    summary.KD_BARANG           = result.rows.item(i).KD_BARANG;
                    summary.NM_BARANG           = result.rows.item(i).NM_BARANG;
                    summary.CUST_KD             = result.rows.item(i).CUST_KD;
                    summary.CUST_NM             = result.rows.item(i).CUST_NM;
                    summary.SO_TYPE             = result.rows.item(i).SO_TYPE;
                    var checknegatif            = result.rows.item(i).SO_QTY;
                    if(checknegatif < 0)
                	{
                    	summary.SO_QTY = 0;
                	}
                    else
                	{
                    	summary.SO_QTY = checknegatif;
                	}
                    summary.DIALOG_TITLE        = result.rows.item(i).DIALOG_TITLE;
                    summaryallcustomer.push(summary);
                }

                var queryagendatoday = "SELECT * FROM Agenda WHERE USER_ID = ? AND  TGL = ?";
                $cordovaSQLite.execute($rootScope.db, queryagendatoday, [auth.id,tanggalplan])
                .then(function(result) 
                {
                    if (result.rows.length > 0) 
                    {
                        var l = result.rows.length;
                        var customers = [];
                        for (var i=0; i < l; i++) 
                        {
                            var customer = {};
                            customer.ID                         = result.rows.item(i).ID_SERVER;
                            customer.CUST_ID                    = result.rows.item(i).CUST_ID;
                            customer.CUST_NM                    = result.rows.item(i).CUST_NM;
                            customers.push(customer);
                        }
                        
                        var combination = [];
                        for( var k = 0; k < customers.length; k++)
                        {
                            var  customer = {};
                            customer.CUST_KD            = customers[k].CUST_ID;
                            customer.CUST_NM            = customers[k].CUST_NM;
                            customer.products           = [];
                            
                            for(var i=0;i < productdas.length ; i ++)
                            {
                                var product = {};
                                product.KD_BARANG            = productdas[i].KD_BARANG;
                                product.NM_BARANG            = productdas[i].NM_BARANG;
                                
                                product.penjualan = [];
                                for(var j=0;j < typepenjualan.length ; j ++)
                                {
                                    var detail = {};
                                    detail.SO_TYPE              = typepenjualan[j].SO_TYPE;
                                    detail.SO_ID                = typepenjualan[j].SO_ID;
                                    detail.DIALOG_TITLE         = typepenjualan[j].DIALOG_TITLE;
                                    detail.QTY                  = 0;
                                    detail.TOTALQTY             = 0;
                                    product.penjualan.push(detail);
                                }
                                customer.products.push(product);
                            }
                            combination.push(customer);
                        }

                        var total = combination[0].products;
                        angular.forEach(summaryallcustomer, function (value,key)
                        {
                            var existcustomer           = _.findWhere(combination, { CUST_KD: value.CUST_KD });
                            var existproduct            = _.findWhere(existcustomer.products, { KD_BARANG: value.KD_BARANG });
                            var existtypepenjualan      = _.findWhere(existproduct.penjualan, { SO_ID: value.SO_TYPE });
                            existtypepenjualan.QTY      = value.SO_QTY;

                            var existproductontotal     = _.findWhere(total, { KD_BARANG: value.KD_BARANG });
                            
                            var existtotal              = _.findWhere(existproductontotal.penjualan, { SO_ID: value.SO_TYPE });
                            var total_temp              = existtotal.TOTALQTY;
                            existtotal.TOTALQTY         = parseInt(total_temp) + parseInt(value.SO_QTY);
                        });

                        deferred.resolve(combination);
                    }
                });
            }
            else
            {
                var queryagendatoday = "SELECT * FROM Agenda WHERE USER_ID = ? AND  TGL = ?";
                $cordovaSQLite.execute($rootScope.db, queryagendatoday, [auth.id, tanggalplan])
                .then(function(result) 
                {
                    if (result.rows.length > 0) 
                    {
                        var l = result.rows.length;
                        var customers = [];
                        for (var i=0; i < l; i++) 
                        {
                            var customer = {};
                            customer.ID                         = result.rows.item(i).ID_SERVER;
                            customer.CUST_ID                    = result.rows.item(i).CUST_ID;
                            customer.CUST_NM                    = result.rows.item(i).CUST_NM;
                            customers.push(customer);
                        }
                        
                        var combination = [];
                        for( var k = 0; k < customers.length; k++)
                        {
                            var  customer = {};
                            customer.CUST_KD            = customers[k].CUST_ID;
                            customer.CUST_NM            = customers[k].CUST_NM;
                            customer.products           = [];
                            
                            for(var i=0;i < productdas.length ; i ++)
                            {
                                var product = {};
                                product.KD_BARANG            = productdas[i].KD_BARANG;
                                product.NM_BARANG            = productdas[i].NM_BARANG;
                                
                                product.penjualan = [];
                                for(var j=0;j < typepenjualan.length ; j ++)
                                {
                                    var detail = {};
                                    detail.SO_TYPE              = typepenjualan[j].SO_TYPE;
                                    detail.SO_ID                = typepenjualan[j].SO_ID;
                                    detail.DIALOG_TITLE         = typepenjualan[j].DIALOG_TITLE;
                                    detail.QTY                  = 0;
                                    detail.TOTALQTY             = 0;
                                    product.penjualan.push(detail);
                                }
                                customer.products.push(product);
                            }
                            combination.push(customer);
                        }
                        deferred.resolve(combination);
                    }
                    else
                    {
                        deferred.resolve([]);
                    } 
                });
            }
        },
        function(error) 
        {
            deferred.resolve(error.message);
        });
        return deferred.promise;  
    }

    return{
            GetSummaryAllCustomers:GetSummaryAllCustomers
        }
});