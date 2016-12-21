angular.module('starter')
.controller('DashCtrl', function($scope,$filter,$location,$state,$ionicLoading,DashboardFac,UtilService,StorageService) 
{
	$scope.exampleForm  = {valuestart:new Date()};
	$scope.onSearchChange = function()
    {
        StorageService.set('tanggalsekarang',$scope.exampleForm.valuestart);
        var tglstart    = $filter('date')($scope.exampleForm.valuestart,'yyyy-MM-dd');
        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
			console.log(tglstart);
			DashboardFac.GetDashboardChart(tglstart)
			.then(function(response)
			{
				$ionicLoading.show({template: 'Loading...',duration: 500});
				$scope.datas = response;
			});
		});
    }
    $scope.onSearchChange();
    $scope.SubmitForm = function(exampleForm)
    {
        var start       = exampleForm.valuestart;
        var end         = new Date();
        if(start > end)
        {
            alert("Tanggal Tidak Boleh Lebih Besar Dari Tanggal Sekarang");
        }
        else
        {
            $scope.onSearchChange();  
        }
    }

    $scope.gotodashdetail = function(key)
    {
        $state.go('tab.dash-call', {'call':key});
    }
})

.controller('CustomerCallCtrl', function($scope,$filter,$stateParams,$ionicLoading,DashboardFac,UtilService,StorageService) 
{
	$scope.params 		= $stateParams.call;
	var tanggalaction 	= StorageService.get('tanggalsekarang');
	$scope.tanggalview  = $filter('date')(tanggalaction,'dd-MM-yyyy');
	var tanggalplan 	= $filter('date')(tanggalaction,'yyyy-MM-dd');
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
    	DashboardFac.GetCustomerCall(tanggalplan,$scope.params)
    	.then(function(response)
    	{
    		var result = UtilService.ArrayChunk(response.CustomerCall,2);
    		$scope.datas = result;
    	})
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 500}); 
        });
    });

})

.controller('CustomerCallJadwalCtrl', function($scope,$filter,$stateParams,$ionicLoading,SalesTrackFac,UtilService,StorageService) 
{
	$scope.params 			= $stateParams.call;
	$scope.users 			= $stateParams.jadwal;

	var tanggalaction 	= StorageService.get('tanggalsekarang');
	$scope.tanggalview  = $filter('date')(tanggalaction,'dd-MM-yyyy');
	var tanggalplan 	= $filter('date')(tanggalaction,'yyyy-MM-dd');

    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        SalesTrackFac.GetSalesTrack(tanggalplan,$scope.users)
        .then(function(response)
        {
            $scope.customers = response;
        })
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 500});
        });
    });

});
