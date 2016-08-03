myAppModule.controller("OutCaseController", ["$rootScope","$scope", "$location","$http","auth","$window","CustomerService",
function ($rootScope,$scope, $location, $http,auth,$window,CustomerService)
{
    $scope.userInfo = auth;
    $scope.loading  = true;
    $scope.activeoutcase = "active";

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    $scope.customergroup = function()
    {
        $scope.loading  = true;
        CustomerService.GetGroupCustomers()
        .then(function (result) 
        {
            // $scope.customergroups = result.Customergroup;
            var customergroups   = [];
            _.each(result.Customergroup, function(executes) 
            {
                var customergroup = {};
                customergroup.CREATE_AT = executes.CREATE_AT;
                customergroup.CREATE_BY = executes.CREATE_BY;
                customergroup.ID =executes.ID;
                customergroup.KETERANGAN =executes.KETERANGAN;
                customergroup.SCDL_GROUP_NM =executes.SCDL_GROUP_NM;
                customergroup.STATUS =executes.STATUS;
                customergroup.UPDATE_AT=executes.UPDATE_AT;
                customergroup.UPDATE_BY=executes.UPDATE_BY;
                customergroup.ALIAS = executes.KETERANGAN + " (" + executes.SCDL_GROUP_NM + ")";
                customergroups.push(customergroup);
            });
            $scope.customergroups = customergroups;
            $scope.loading  = false;
            $scope.visible = false;  
        });
    };
    $scope.customergroup();

    $scope.customergroupchange = function()
    {
        $scope.loading  = true;
        CustomerService.GetSingleGroupCustomer($scope.customer.ID)
        .then(function (result) 
        {
            $scope.showcustomer = true;
            $scope.showusers 	= true;
            $scope.customers 	= result.Customer;
            $scope.loading  	= false;
            $scope.visible 		= false;
        });
    }

    $scope.submitForm = function(customer)
    {
        var idcustomer = customer.CUST_KD;
        $location.path("/detailjadwalkunjungan/" + 715);
    }

}]);

