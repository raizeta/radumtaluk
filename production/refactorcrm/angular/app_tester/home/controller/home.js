'use strict';
myAppModule.controller("HomeController",
function ($q,$rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ManagerFac) 
{   
    $scope.activehome = "active";
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    ManagerFac.getManagerMemo()
    .then(function(response)
    {
        $scope.loadingcontent = true;
        $scope.salesmanmemo = response;
    })
    .finally(function()
    {
        $scope.loadingcontent= false;
    });

    $scope.memodibuatpada        = $filter('date')(new Date(),'dd-MM-yyyy HH:mm:ss');

    $scope.submitForm = function(formsalesmanmemo)
    {

        $scope.loadingcontent = true;
        var memodibuatpada         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');

        var salesmanmemo = {};
        salesmanmemo.ISI_MESSAGES       = formsalesmanmemo.ISI_MESSAGES
        salesmanmemo.ID_USER            = auth.id;
        salesmanmemo.NM_USER            = auth.username;
        salesmanmemo.STATUS_MESSAGES    = formsalesmanmemo.STATUSMEMO;
        salesmanmemo.CREATE_AT          = memodibuatpada;
        salesmanmemo.CREATE_BY          = auth.id;

        ManagerFac.setManagerMemo(salesmanmemo)
        .then(function(response)
        {
            $scope.salesmanmemo.push(response);
            $scope.salesmanmemo.ISI_MESSAGES = '';
            $scope.salesmanmemo.STATUSMEMO  = null;
        },
        function (error)
        {
            alert("Manager Memo Gagal Disimpan Ke Server");
        })
        .finally(function()
        {
            $scope.loadingcontent = false;  
        });
    }
});



