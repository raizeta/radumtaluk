angular.module('starter')
.controller('VisitCtrl', function($scope,$location,$ionicLoading,$ionicPopup,$ionicModal,$timeout) 
{
	$scope.openModalMap = function(item) 
    {
        $ionicModal.fromTemplateUrl('templates/visit/new.html', 
        {
            scope: $scope,
            animation: 'fade-in-scale'
        })
        .then(function(modal) 
        {
            $ionicLoading.show
            ({
                template: 'Loading...'
            });
            $scope.modal            = modal;
            $scope.modal.show();
            $timeout(function()
            {
                $ionicLoading.hide();
            },3000);
        });  
    };

    $scope.closeModal = function() 
    {
        $scope.modal.remove();
    };
    $scope.$on('$destroy', function() 
    {
        $scope.modal.remove();
    });

})

.controller('VisitDetailCtrl', function($scope,$location,$ionicLoading,$ionicPopup,$ionicModal,$timeout) 
{
    $scope.images = "Radumta";

});