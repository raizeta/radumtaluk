'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/complete',
    {
        templateUrl : 'angular/partial/requestorder/complete.html',
        controller  : 'CompleteController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {

                    return $q.when(userInfo);
                }
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    $routeProvider.when('/complete/:iddetail',
    {
        templateUrl : 'angular/partial/requestorder/completedetail.html',
        controller  : 'CompleteDetailController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {

                    return $q.when(userInfo);
                }
                else 
                {
                    $location.path('/');
                }
            }
        }
    });

}]);