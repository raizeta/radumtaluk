myAppModule.controller("OutCaseController", ["$rootScope","$scope", "$location","$http","$filter","$timeout","$window","auth","CustomerService","OutCaseService","JadwalKunjunganService","authService","$cordovaSQLite",
function ($rootScope,$scope, $location, $http,$filter,$timeout,$window,auth,CustomerService,OutCaseService,JadwalKunjunganService,authService,$cordovaSQLite)
{
    $scope.userInfo = auth;
    $scope.loadingcontent  = true;
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
        $scope.loadingcontent  = true;
        CustomerService.GetSingleGroupCustomer($scope.customer.ID)
        .then(function (result) 
        {
            $scope.showcustomer = true;
            $scope.showusers 	= true;
            $scope.customers 	= result.Customer;
            $scope.loadingcontent  	= false;
            $scope.visible 		= false;
        },
        function (error)
        {
            alert("Gagal Mendapat Group Customer Dari Server");
        });
    }

    $scope.getcustomers = function()
    {
        $scope.loadingcontent  = true;
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
            $scope.loadingcontent  = false;
        },
        function (error)
        {
            alert("Gagal Mendapatkan Customer Dari Server");
        });
    };
    $scope.getcustomers();

    $scope.customerparentchange = function()
    {
        $scope.showcustomer = true;
        $scope.loadingcontent      = false;
        $scope.visible      = false;
    }
    $scope.customerchange = function(customer)
    {
        $scope.showusers    = true;
        $scope.loadingcontent      = false;
        $scope.visible      = false;
    }

    $scope.submitForm = function(customer)
    {
        $scope.loadingcontent = true;
        $scope.isSubmitButtonDisabled = true;

        //Mencari Nama Customer Ketika Hanya Diketahui Kodenya Saja
        //Penting Jangan Dihapus
        var existingFilter = _.findWhere($scope.customers, { CUST_KD: customer.CUST_KD });

        var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
        JadwalKunjunganService.GetGroupCustomerByTanggalPlan(auth,tanggalsekarang)
        .then(function(response)
        {
            if(response.length == 0)
            {
                $scope.loadingcontent = false;
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
                    var newID_SERVER                = result.ID;
                    var newTGL                      = tanggalsekarang;
                    var newUSER_ID                  = auth.id;
                    var newCUST_ID                  = result.CUST_ID;
                    var newCUST_NM                  = existingFilter.CUST_NM;
                    var newLAG                      = null;
                    var newLAT                      = null;
                    var newMAP_LAT                  = null;
                    var newMAP_LNG                  = null;
                    var newCHECKIN_TIME             = null;
                    var newCHECKOUT_TIME            = null;
                    var newCHECK_IN                 = 0;
                    var newCHECK_OUT                = 0;
                    var newINVENTORY_EXPIRED        = 0;
                    var newINVENTORY_SELLIN         = 0;
                    var newINVENTORY_SELLOUT        = 0;
                    var newINVENTORY_STOCK          = 0;
                    var newREQUEST                  = 0;
                    var newSTART_PIC                = 0;
                    var newEND_PIC                  = 0;
                    var newSCDL_GROUP               = response.SCDL_GROUP;
                    var newISON_SERVER              = 1;

                    var queryinsertagendatoday = 'INSERT INTO Agenda (ID_SERVER,TGL,USER_ID,CUST_ID,CUST_NM,LAG,LAT,MAP_LAT,MAP_LNG,CHECKIN_TIME,CHECKOUT_TIME,CHECK_IN,CHECK_OUT,INVENTORY_EXPIRED,INVENTORY_SELLIN,INVENTORY_SELLOUT,INVENTORY_STOCK,REQUEST,START_PIC,END_PIC,SCDL_GROUP,ISON_SERVER) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                    $cordovaSQLite.execute($rootScope.db,queryinsertagendatoday,[newID_SERVER,newTGL,newUSER_ID,newCUST_ID,newCUST_NM,newLAG,newLAT,newMAP_LAT,newMAP_LNG,newCHECKIN_TIME,newCHECKOUT_TIME,newCHECK_IN,newCHECK_OUT,newINVENTORY_EXPIRED,newINVENTORY_SELLIN,newINVENTORY_SELLOUT,newINVENTORY_STOCK,newREQUEST,newSTART_PIC,newEND_PIC,newSCDL_GROUP,newISON_SERVER])
                    .then(function(result) 
                    {
                        console.log("Customer Untuk Out Of Case Berhasil Disimpan Di Local!");
                    }, 
                    function(error) 
                    {
                        alert("Customer Untuk Out Of Case Gagal Disimpan Ke Local: " + error.message);
                    });

                    $timeout(function()
                    {
                        var lanjutkeagenda = confirm("Out Case Berhasil Disimpan.Lanjut Ke Agenda?");
                        if (lanjutkeagenda == true) 
                        {
                            $location.path("/agenda/" + tanggalsekarang);
                        }
                        else
                        {
                            $scope.loadingcontent = false;
                            $scope.isSubmitButtonDisabled = false;
                        }
                        
                    },2000);
                },
                function (error)
                {
                    alert("Out Case Gagal Ditambahkan");
                    $scope.loadingcontent = false;
                }); 
            }      
        });
    }

}]);

