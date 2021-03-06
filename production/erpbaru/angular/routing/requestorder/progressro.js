'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    
    $routeProvider.when('/progress',
    {
        templateUrl : 'angular/partial/requestorder/progress.html',
        controller  : 'ProgressController',
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
    $routeProvider.when('/progress/:iddetail',
    {
        templateUrl : 'angular/partial/requestorder/progressdetail.html',
        controller  : 'ProgressDetailController',
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