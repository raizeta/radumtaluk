angular.module('starter')
.controller('DashCtrl', function($scope,$location,DashboardFac,UtilService,$ionicLoading) 
{
	DashboardFac.GetDashboardChart()
	.then(function(response)
	{
		$ionicLoading.show({template: 'Loading...',duration: 3000});
		$scope.datas = response;
	});
})

.controller('CustomerCallCtrl', function($scope,$filter,$stateParams,DashboardFac,UtilService,$ionicLoading) 
{
	$scope.params 		= $stateParams.call;
	var tanggalplan 	= $filter('date')(new Date(),'yyyy-MM-dd');
	DashboardFac.GetCustomerCall(tanggalplan,$scope.params)
	.then(function(response)
	{
		$ionicLoading.show({template: 'Loading...',duration: 3000});
		var result = UtilService.ArrayChunk(response.CustomerCall,3);
		$scope.datas = result;
	});

})

.controller('CustomerCallJadwalCtrl', function($scope,$filter,$stateParams,$ionicLoading,SalesTrackFac,UtilService) 
{
	$scope.params 			= $stateParams.call;
	var tanggalplan         = $filter('date')(new Date(),'yyyy-MM-dd');
    var userid				= 55;
    
    SalesTrackFac.GetSalesTrack(tanggalplan,userid)
    .then(function(response)
    {
    	$ionicLoading.show({template: 'Loading...',duration: 3000});
        $scope.customers = response;
    });

});
