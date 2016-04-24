myAppModule.factory('LocationService', function ($q) {

  var currentLocation = {latitude: "",longitude: ""};
  var options = {timeout: 10000, enableHighAccuracy: true};

  var GetGpsLocation = function () 
  {
      var d = $q.defer();
      navigator.geolocation.getCurrentPosition(
      function (options) 
      {
          currentLocation.latitude = options.coords.latitude;
          currentLocation.longitude = options.coords.longitude;
          d.resolve(currentLocation);
      },
      function(err)
      {
        alert("GPS Tidak Hidup");
      });
      
      return d.promise
  }

  var WatchGpsLocation = function () 
  {
      var d = $q.defer();
      navigator.geolocation.watchPosition(
      function (options) 
      {
          currentLocation.latitude = options.coords.latitude;
          currentLocation.longitude = options.coords.longitude;
          d.resolve(currentLocation);
      },
      function(err)
      {
        alert("GPS Tidak Hidup");
      });
      
      return d.promise
  }


  return {
            GetGpsLocation:GetGpsLocation,
            WatchGpsLocation:WatchGpsLocation
        }

});