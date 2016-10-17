'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/',
    {
        templateUrl : 'angular/app_tester/secured/views/login.html',
        controller  : 'LoginController',
        resolve: 
        {
            auth: function ($q,LoginFac,$location) 
            {
                var userInfo = LoginFac.getUserInfo();
                if (userInfo) 
                {
                    if(userInfo.rulename === 'SALESMAN')
                    {
                        $location.path('/home');
                    }
                } 
            }
        }
    }); 
}]);