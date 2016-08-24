'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/',
	{
        templateUrl : 'angular/partial/login.html',
		controller	: 'LoginController',
		resolve: 
		{
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    if(userInfo.site === 'ERP')
                    {
                    	$location.path('/home');
                    }

                } 

            }
        }
	});	
}]);
