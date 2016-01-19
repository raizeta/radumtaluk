myAppModule.controller("UserSignatureController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
	$scope.done = function () 
	{
      	var signature = $scope.accept();
      	$scope.signature = signature.dataUrl;
    };

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);