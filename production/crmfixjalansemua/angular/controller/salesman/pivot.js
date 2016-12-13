'use strict';
myAppModule.controller("StockPivotController",
function ($rootScope,$scope,$location,auth,$window,$filter,StockPivotFac) 
{   
    $scope.activepivot    = "active";
    $scope.userInfo     = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        $window.location.href = "index.html";
    }
    

    var firstDay            = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    var lastDay             = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    $scope.exampleForm      = {valuestart:firstDay,valueend:lastDay};
    $scope.onSearchChange = function()
    {
        var tglstart    = $filter('date')($scope.exampleForm.valuestart,'yyyy-MM-dd');
        var tglend      = $filter('date')($scope.exampleForm.valueend,'yyyy-MM-dd');
        $scope.loadingcontent = true;
	    StockPivotFac.GetStockPivot()
	    .then(function (response)
	    {
            $scope.stockpivots = response.Pivot;
	    },
	    function(error)
	    {
	    	alert("Gagal Mendapatkan Data Dari Server");
	    })
	    .finally(function()
    	{
    		$scope.loadingcontent = false;
    	});
    }
    $scope.onSearchChange();
    $scope.SubmitForm = function(exampleForm)
    {
        var start       = exampleForm.valuestart;
        var end         = exampleForm.valueend;
        if(start > end)
        {
            alert("Tanggal End Harus Lebih Besar Dari Tanggal Start");
        }
        else
        {
            $scope.onSearchChange();  
        }
    }
});




