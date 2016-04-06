'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider,$locationProvider)
{
	$routeProvider.when('/test',
	{
		templateUrl	: 'angular/partial/erp/masterbarang/test/index.html',
		controller 	: 'EditableRowCtrl',
		resolve: 
		{
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
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