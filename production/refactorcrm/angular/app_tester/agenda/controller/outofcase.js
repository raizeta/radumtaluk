'use strict';
myAppModule.controller("OutOfCaseController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ManagerFac,CustomerCombFac,CustomerFac,ListKunjunganFac,OutOfCaseFac,OutOfCaseSqliteFac) 
{   
    $scope.activehome = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    ManagerFac.getManagers()
    .then (function (response)
    {
        $scope.managers = response;
    },
    function (error)
    {
        alert("Error Manager");
    });

    $scope.getcustomers = function()
    {
        $scope.loadingcontent  = true;
        CustomerCombFac.GetCustomerCombine()
        .then(function (result) 
        {
            var customerparents     = [];
            var customers           = [];
            _.each(result, function(executes) 
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
        },
        function (error)
        {
            alert("Gagal Mendapatkan Customer Dari Server.Try Again");
        })
        .finally(function()
        {
            $scope.loadingcontent  = false;   
        });
    };
    $scope.getcustomers();

    $scope.customerparentchange = function()
    {
        $scope.showcustomer         = true;
        $scope.loadingcontent       = false;
        $scope.visible              = false;
    }
    $scope.customerchange = function(customer)
    {
        $scope.showusers            = true;
        $scope.loadingcontent       = false;
        $scope.visible              = false;
    }

    $scope.submitForm = function(customer)
    {
        $scope.loadingcontent = true;
        $scope.isSubmitButtonDisabled = true;

        var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
        var existingFilter = _.findWhere($scope.customers, { CUST_KD: customer.CUST_KD });

        ListKunjunganFac.GetGroupCustomerByTanggalPlan(auth,tanggalsekarang)
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
                detail.NOTE         = customer.MGRS; //MGRS = Managers
                detail.STATUS_CASE  = 1;
                detail.CREATE_AT    = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                detail.CREATE_BY    = auth.id;
                detail.SCDL_GROUP   = response[0].SCDL_GROUP;

                OutOfCaseFac.SetCustOutOfCases(detail)
                .then(function (result) 
                {
                    var data                        = {};
                    data.ID                         = result.ID;
                    data.TGL                        = result.TGL;
                    data.USER_ID                    = result.USER_ID;
                    data.CUST_ID                    = result.CUST_ID;
                    data.CUST_NM                    = existingFilter.CUST_NM;
                    data.SCDL_GROUP                 = result.SCDL_GROUP;

                    OutOfCaseSqliteFac.SetAgendaOutOfCase(data)
                    .then(function(responselocal)
                    {
                        var lanjutkeagenda = confirm("Out Case Berhasil Disimpan.Lanjut Ke Agenda?");
                        if (lanjutkeagenda == true) 
                        {
                            $location.path("/agenda/" + tanggalsekarang);
                        }
                        else
                        {
                            $scope.isSubmitButtonDisabled = false;
                        } 
                    });  
                },
                function (error)
                {
                    alert("Out Case Gagal Ditambahkan");
                })
                .finally(function()
            	{
            		$scope.loadingcontent = false;
            	}); 

                 
            }      
        });  
    }
});



