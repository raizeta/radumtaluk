'use strict';
myAppModule.factory('ProductCombFac',
function($rootScope,$http,$q,$filter,$cordovaSQLite,ProductFac,ProductSqliteFac)
{
    var getProductCombine  = function ()
    {
     	var deferred 		= $q.defer();
     	ProductSqliteFac.GetProductsSqlite()
     	.then(function(response)
     	{
     		if(angular.isArray(response) && response.length > 0)
            {
        		deferred.resolve(response);
            }
            else
            {
            	ProductFac.GetSearchProductsAll()
            	.then(function(responseserver)
            	{
                    angular.forEach(responseserver,function(value,key)
                    {
                        ProductSqliteFac.InsertProdutsSqlite(value)
                        .then(function(response)
                        {
                            console.log("Product Berhasil Di Insert");
                        })
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
    var UpdateProductCombine  = function (ID_PRODUCT,STATUS)
    {
        var deferred        = $q.defer();
        ProductFac.UpdateProduct(ID_PRODUCT,STATUS)
        .then(function(responseserver)
        {
            ProductSqliteFac.UpdateProdutsSqlite([STATUS,ID_PRODUCT])
            .then(function(responselocal)
            {
                deferred.resolve(responselocal);
            })
        },
        function(error)
        {
            deferred.reject(error);
        });
        return deferred.promise;   
    }
          
    return{
    		getProductCombine:getProductCombine,
            UpdateProductCombine:UpdateProductCombine
        }
});