myAppModule.controller("OutCaseController", ["$rootScope","$scope", "$location","$http","auth","$window","resolvegpslocation","CustomerService",
function ($rootScope,$scope, $location, $http,auth,$window,resolvegpslocation,CustomerService)
{
    // $scope.userInfo = auth;
    // $scope.loading  = true;
    // $scope.activeoutcase = "active";

    // $scope.logout = function () 
    // { 
    //     $scope.userInfo = null;
    //     $window.sessionStorage.clear();
    //     window.location.href = "index.html";
    // }
    // $scope.customergroup = function()
    // {
    //     $scope.loading  = true;
    //     CustomerService.GetGroupCustomers()
    //     .then(function (result) 
    //     {
    //         // $scope.customergroups = result.Customergroup;
    //         var customergroups   = [];
    //         _.each(result.Customergroup, function(executes) 
    //         {
    //             var customergroup = {};
    //             customergroup.CREATE_AT = executes.CREATE_AT;
    //             customergroup.CREATE_BY = executes.CREATE_BY;
    //             customergroup.ID =executes.ID;
    //             customergroup.KETERANGAN =executes.KETERANGAN;
    //             customergroup.SCDL_GROUP_NM =executes.SCDL_GROUP_NM;
    //             customergroup.STATUS =executes.STATUS;
    //             customergroup.UPDATE_AT=executes.UPDATE_AT;
    //             customergroup.UPDATE_BY=executes.UPDATE_BY;
    //             customergroup.ALIAS = executes.KETERANGAN + " (" + executes.SCDL_GROUP_NM + ")";
    //             customergroups.push(customergroup);
    //         });
    //         $scope.customergroups = customergroups;
    //         $scope.loading  = false;
    //         $scope.visible = false;  
    //     });
    // };
    // $scope.customergroup();

    // $scope.customergroupchange = function()
    // {
    //     $scope.loading  = true;
    //     CustomerService.GetSingleGroupCustomer($scope.customer.ID)
    //     .then(function (result) 
    //     {
    //         $scope.showcustomer = true;
    //         $scope.showusers 	= true;
    //         $scope.customers 	= result.Customer;
    //         $scope.loading  	= false;
    //         $scope.visible 		= false;
    //     });
    // }

    // $scope.submitForm = function(customer)
    // {
    //     var idcustomer = customer.CUST_KD;
    //     $location.path("/detailjadwalkunjungan/" + 715);
    // }

var input = [
    { KD_PRODUCT : ['COO1', 'COO2','COO3','COO4','COO5'] },
    { NM_TYPE : ['SELLIN', 'SELLOUT', 'STOCK','RETURN','REQUEST'] },
    { QTY : [0] },
];

function cartesianProduct(input, current) {
   if (!input || !input.length) { return []; }

   var head = input[0];
   var tail = input.slice(1);
   var output = [];

    for (var key in head) {
      for (var i = 0; i < head[key].length; i++) {
            var newCurrent = copy(current);         
            newCurrent[key] = head[key][i];
            if (tail.length) {
                 var productOfTail = 
                         cartesianProduct(tail, newCurrent);
                 output = output.concat(productOfTail);
            } else output.push(newCurrent);
       }
     }    
    return output;
}

function copy(obj) {
  var res = {};
  for (var p in obj) res[p] = obj[p];
  return res;
}
// console.log(cartesianProduct(input));
var customers = [ 
                {KD_CUST:'CUST-01',NM_CUST:'CUST SATU'},
                {KD_CUST:'CUST-02',NM_CUST:'CUST DUA'}
              ];

var productdas = [ 
                {KD_BARANG:'C001',NM_BARANG:'BARANG SATU'},
                {KD_BARANG:'C002',NM_BARANG:'BARANG DUA'},
                {KD_BARANG:'C003',NM_BARANG:'BARANG TIGA'},
                {KD_BARANG:'C004',NM_BARANG:'BARANG EMPAT'},
                {KD_BARANG:'C005',NM_BARANG:'BARANG LIMA'}
              ];

var typepenjualan   = [ 
                {KD_TYPE:'T1',NM_TYPE:'TYPE1',QTY:0},
                {KD_TYPE:'T2',NM_TYPE:'TYPE2',QTY:0},
                {KD_TYPE:'T3',NM_TYPE:'TYPE3',QTY:0},
                {KD_TYPE:'T4',NM_TYPE:'TYPE4',QTY:0},
                {KD_TYPE:'T5',NM_TYPE:'TYPE5',QTY:0}
              ];

    var combination = [];
    for( var k = 0; k < customers.length; k++)
    {
        var  customer = {};
        customer.KD_CUST            = customers[k].KD_CUST;
        customer.NM_CUST            = customers[k].NM_CUST;
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
                detail.KD_TYPE              = typepenjualan[j].KD_TYPE;
                detail.NM_TYPE              = typepenjualan[j].NM_TYPE;
                detail.QTY                  = 0;
                product.penjualan.push(detail);
            }
            customer.products.push(product);
        }
        combination.push(customer);
    }


    var summarypercustomer = [];
    var summary1 = {};
    summary1.KD_CUST                = "CUST-01";
    summary1.KD_BARANG              = "C001";
    summary1.KD_TYPE                = 'T1';
    summary1.QTY                    = 10;
    summarypercustomer.push(summary1);

    var summary2 = {};
    summary2.KD_CUST                = "CUST-01";
    summary2.KD_BARANG              = "C001";
    summary2.KD_TYPE                = 'T2';
    summary2.QTY                    = 5;
    summarypercustomer.push(summary2);

    angular.forEach(summarypercustomer, function (value,key)
    {
        var existcustomer           = _.findWhere(combination, { KD_CUST: value.KD_CUST });
        var existproduct            = _.findWhere(existcustomer.products, { KD_BARANG: value.KD_BARANG });
        var existtypepenjualan      = _.findWhere(existproduct.penjualan, { KD_TYPE: value.KD_TYPE });
        existtypepenjualan.QTY      = value.QTY;
    });
    console.log(combination);
}]);

