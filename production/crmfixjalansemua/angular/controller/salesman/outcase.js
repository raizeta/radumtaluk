myAppModule.controller("OutCaseController", ["$rootScope","$scope", "$location","$http","$filter","$timeout","$window","auth","CustomerService","OutCaseService","JadwalKunjunganService","authService",
function ($rootScope,$scope, $location, $http,$filter,$timeout,$window,auth,CustomerService,OutCaseService,JadwalKunjunganService,authService)
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
    authService.getManagers()
    .then (function (response)
    {
        $scope.managers = response;
    },
    function (error)
    {

    });

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

    $scope.getcustomers = function()
    {
        $scope.loading  = true;
        CustomerService.GetCustomers()
        .then(function (result) 
        {
            var customerparents     = [];
            var customers           = [];
            _.each(result.Customer, function(executes) 
            {
                if(executes.CUST_KD == executes.CUST_GRP)
                {
                    customerparents.push(executes)
                }
                else
                {
                    customers.push(executes);
                }
            });
            $scope.customeparents   = customerparents;
            $scope.customers        = customers;
            $scope.loading  = false;
        });
    };
    $scope.getcustomers();

    $scope.customerparentchange = function()
    {
        $scope.showcustomer = true;
        $scope.loading      = false;
        $scope.visible      = false;
    }
    $scope.customerchange = function()
    {
        $scope.showusers    = true;
        $scope.loading      = false;
        $scope.visible      = false;
    }

    $scope.submitForm = function(customer)
    {
        console.log(customer);
        $scope.loading = true;
        $scope.isSubmitButtonDisabled = true;

        
        var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
        JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalsekarang)
        .then(function(response)
        {
            if(response.length == 0)
            {
                $scope.loading = false;
                alert("Belum Ada Jadwal Kunjungan Anda Hari Ini");
            }
            else
            {
                var detail = {};
                detail.TGL          = $filter('date')(new Date(),'yyyy-MM-dd')
                detail.CUST_ID      = customer.CUST_KD;
                detail.USER_ID      = auth.id;
                detail.NOTE         = customer.MGRS;
                detail.STATUS_CASE  = 1;
                detail.CREATE_AT    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                detail.CREATE_BY    = auth.id;
                detail.SCDL_GROUP   = response.SCDL_GROUP;
                OutCaseService.SetOutOfCases(detail)
                .then(function (result) 
                {
                    $timeout(function()
                    {
                        var lanjutkeagenda = confirm("Out Case Berhasil Disimpan.Lanjut Ke Agenda?");
                        if (lanjutkeagenda == true) 
                        {
                            $location.path("/agenda/" + tanggalsekarang);
                        }
                        else
                        {
                            $scope.loading = false;
                            $scope.isSubmitButtonDisabled = false;
                        }
                        
                    },2000);
                },
                function (error)
                {
                    alert("Out Case Gagal Ditambahkan");
                }); 
            }      
        });
    }

}]);

