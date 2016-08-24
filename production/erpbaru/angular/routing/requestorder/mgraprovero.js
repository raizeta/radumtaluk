'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/mgraprove',
    {
        templateUrl : 'angular/partial/requestorder/mgraprove.html',
        controller  : 'MgrAproveController',
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

    $routeProvider.when('/mgraprove/:iddetail',
    {
        templateUrl : 'angular/partial/requestorder/mgraprovedetail.html',
        controller  : 'MgrAproveDetailController',
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