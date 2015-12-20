myAppModule.controller("ListMapController", ["$scope", "$location","$http", "authService", "auth","$window","NgMap", 
function ($scope, $location, $http, authService, auth,$window,NgMap) 
{
    $scope.userInfo = auth;
  	NgMap.getMap().then(function(map) 
  	{
	    console.log(map.getCenter());
	    console.log('markers', map.markers);
	    console.log('shapes', map.shapes);
  	});
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }  
}]);