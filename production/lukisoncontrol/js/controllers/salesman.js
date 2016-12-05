angular.module('starter')
.controller('SalesmanCtrl', function($scope,$filter,$ionicLoading,SalesTrackFac) 
{
    var tanggalplan         = $filter('date')(new Date(),'yyyy-MM-dd');
    SalesTrackFac.GetSalesTrackAbsensi(tanggalplan)
    .then(function(response)
    {
        $ionicLoading.show({template: 'Loading...',duration: 3000});
        $scope.salesmans = response;
    });

})

.controller('SalesmanDetailCtrl', function($scope,$filter,$ionicLoading,$stateParams,SalesTrackFac) 
{
    var tanggalplan         = $filter('date')(new Date(),'yyyy-MM-dd');
    var userid				= $stateParams.salesmanid;
    
    SalesTrackFac.GetSalesTrack(tanggalplan,userid)
    .then(function(response)
    {
    	$ionicLoading.show({template: 'Loading...',duration: 3000});
        $scope.customers = response;
    });
})

.controller('SalesmanDetailDetailCtrl', function($scope, $stateParams, Chats) 
{
    $scope.chat = Chats.get($stateParams.chatId);
});
