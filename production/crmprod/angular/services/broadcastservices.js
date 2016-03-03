myAppModule.service('PollingService', ['$http', '$rootScope', '$interval', 
function($http, $rootScope, $interval) 
{

var updatedData;

    $interval(function() {
      return $http.get(apiUrl).then(function successCallback(response) {
        updatedData = response.data.data;
        $rootScope.$broadcast('got new data!', { data: updatedData });
      }, function failureCallback(reason) {
        console.log(reason);
      })
    }, 5000);

  }]);