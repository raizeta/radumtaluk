angular.module('starter')
.controller('NooNewCtrl', function($scope,$state,$ionicPopup,$ionicLoading,CustomerFac) 
{
	$ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
		CustomerFac.GetNooCustomers()
		.then(function(response)
		{
			$scope.customers = response;
		},
        function(error)
        {
            console.log(error);
        })
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 300}); 
        });
	});
});