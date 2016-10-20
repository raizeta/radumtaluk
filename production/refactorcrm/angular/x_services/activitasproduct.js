'use strict';
myAppModule.service('ActivitasProductService',function($window)
{
    var ActivitasProduct = function(activitas,product)
    {
        var databarang          = product;
        var resolvesot2type     = activitas;
        var salesaktivitas      = [];

        angular.forEach(resolvesot2type,function(value,key)
        {
            var diffbarangresult = [];
            var diffbarang = _.difference(databarang,diffbarangresult);

            var status={};
            status.bgcolor="bg-aqua";
            status.icon="fa fa-close bg-aqua";
            status.show = true;

            resolvesot2type[key].products  = diffbarang;  
            resolvesot2type[key].status    = status;
            
            salesaktivitas.push(resolvesot2type[key]);
        });

        return salesaktivitas;
    }
    
    var CekStatus = function(statusvalue)
    {
        var status={};
        if(statusvalue == 1 || statusvalue == '1')
        {
            status.bgcolor="bg-green";
            status.icon="fa fa-check bg-green";
            status.show = false;
        }
        else
        {
            status.bgcolor="bg-aqua";
            status.show= true;
            status.icon = "fa fa-close bg-aqua";
        }

        return status;
    }

   return {
        ActivitasProduct:ActivitasProduct,
        CekStatus:CekStatus
   }
});