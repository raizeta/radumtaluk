myAppModule.factory('LocationService', function ($q) {

  var currentLocation = {latitude: "",longitude: ""};
  var options = {enableHighAccuracy: true,maximumAge:0};

  var GetGpsLocation = function () 
  {
      var deferred = $q.defer();
      navigator.geolocation.getCurrentPosition(
      function (options) 
      {
          currentLocation.latitude    = options.coords.latitude;
          currentLocation.longitude   = options.coords.longitude;
          currentLocation.statusgps   = "Bekerja";
          deferred.resolve(currentLocation);
      },
      function(err)
      {
          if(err.code == 1 || err.code == "1")
          {
            currentLocation.latitude    = 0;
            currentLocation.longitude   = 0;
            currentLocation.statusgps   = "EC:1";
            deferred.resolve(currentLocation);
          }
          else if(err.code == 2 || err.code == "2")
          {
            currentLocation.latitude    = 0;
            currentLocation.longitude   = 0;
            currentLocation.statusgps   = "EC:2";
            deferred.resolve(currentLocation);
          }
          else if(err.code == 3 || err.code == "3")
          {
            currentLocation.latitude    = 0;
            currentLocation.longitude   = 0;
            currentLocation.statusgps   = "EC:3";
            deferred.resolve(currentLocation);
          }
          else
          {
            deferred.rejected(err);
          }
          
      });
      
      return deferred.promise
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