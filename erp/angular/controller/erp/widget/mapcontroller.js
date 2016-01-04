myAppModule.controller("ListMapController", ["$scope", "$location","$http", "authService", "auth","$window","NgMap","LocationService", 
function ($scope, $location, $http, authService, auth,$window,NgMap,LocationService) 
{
    $scope.zoomvalue = 17;
    LocationService.GetLocation().then(function(data)
    {
        $scope.lat = data.latitude;
        $scope.long = data.longitude;
        console.log(data);
    });
    
    $scope.toggleBounce = function() 
    {
      if (this.getAnimation() != null) 
      {
        this.setAnimation(null);
        
      } 
      else 
      {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    
    $scope.userInfo = auth;
  	// NgMap.getMap().then(function(map) 
  	// {

  	// });
      
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }  
}]);