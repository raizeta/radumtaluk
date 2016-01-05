'use strict';
app.factory('LocationService', function ($q) {

var currentLocation = {
    latitude: "",
    longitude: ""
}

return {
    GetLocation: function () {
        var d = $q.defer();
        navigator.geolocation.getCurrentPosition(function (pos) {
            currentLocation.latitude = pos.coords.latitude;
            currentLocation.longitude = pos.coords.longitude;
            d.resolve(currentLocation);
        });
        return d.promise
    }
};

});