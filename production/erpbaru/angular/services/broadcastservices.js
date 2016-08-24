myAppModule.service('PollingService', ['$http', '$rootScope', '$interval', 
function($http, $rootScope, $interval) 
{

  var globalurl       = $rootScope.linkurl.linkurl;
  var updatedData;

    $interval(function() 
    {
      return $http.get(apiUrl)
      .then(function successCallback(response) 
      {
        updatedData = response.data.data;
        $rootScope.$broadcast('got new data!', { data: updatedData });
      }, 
      function failureCallback(reason) 
      {
        console.log(reason);
      })
    }, 5000);

  }]);

myAppModule.factory("greetingService", function($q, $http,$timeout)
{

  var getGreeting = function(userinfo)
  {
      var url = globalurl;
      var iduser = userinfo.id;
      var deferred = $q.defer();
      var url = url + "/jadwalkunjungans/search?USER_ID=" + iduser;
      var method ="GET";
      $http({method:method, url:url})
      .success(function(response) 
      {
        deferred.resolve(response);
      })

      .error(function()
      {
          deferred.reject(error);
      });

      return deferred.promise;
  }

   return {
       getGreeting: getGreeting
     }
});

myAppModule.factory('timestampMarker', [function() 
{  
    var timestampMarker = 
    {
        request: function(config) 
        {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) 
        {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);