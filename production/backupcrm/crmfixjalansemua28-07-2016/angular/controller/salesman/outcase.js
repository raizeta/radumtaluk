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
console.log(cartesianProduct(input));

var productdas = [ 
                {KD_PRODUCT:'C001',NM_PRODUCT:'BARANG SATU'},
                {KD_PRODUCT:'C002',NM_PRODUCT:'BARANG DUA'},
                {KD_PRODUCT:'C003',NM_PRODUCT:'BARANG TIGA'},
                {KD_PRODUCT:'C004',NM_PRODUCT:'BARANG EMPAT'},
                {KD_PRODUCT:'C005',NM_PRODUCT:'BARANG LIMA'}
              ];

var typex   = [ 
                {KD_TYPE:'T1',NM_TYPE:'TYPE1',QTY:0},
                {KD_TYPE:'T2',NM_TYPE:'TYPE2',QTY:0},
                {KD_TYPE:'T3',NM_TYPE:'TYPE3',QTY:0},
                {KD_TYPE:'T4',NM_TYPE:'TYPE4',QTY:0},
                {KD_TYPE:'T5',NM_TYPE:'TYPE5',QTY:0}
              ];

function extend(obj, src) 
{
    for (var key in src) 
    {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}
function extendsing(obj, src) 
{
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}

var x = [];
for(i=0;i < productdas.length ; i ++)
{
    for(j=0;j < typex.length ; j ++)
    {
        var detail = {};
        detail.KD_PRODUCT   = productdas[i].KD_PRODUCT;
        detail.NM_PRODUCT   = productdas[i].NM_PRODUCT;
        detail.KD_TYPE      = typex[j].KD_TYPE;
        detail.NM_TYPE      = typex[j].NM_TYPE;
        detail.QTY          = typex[j].QTY;
        x.push(detail);
    }

}

console.log(x);
}]);

