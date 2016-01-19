myAppModule.controller("GeoController", ["$scope", "$location", "$http", "authService", "auth", "$window", "NgMap","$cordovaGeolocation","LocationService",
function ($scope, $location, $http, authService, auth, $window, NgMap,$cordovaGeolocation,LocationService) 
{
    $scope.posisiku= function()
    {
        LocationService.GetLocation().then(function(data)
        {
            alert(data.latitude);
            alert(data.longitude);
        });
    }
}]);