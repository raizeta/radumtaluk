var app = angular.module('myAppModule', 
['ngRoute','mobile-angular-ui','mobile-angular-ui.gestures',
'ngMap','ngCordova','ngAnimate','ngSanitize']);


app.run(function($rootScope,$transform) 
{
  	window.$transform = $transform;
    $rootScope.$on('$routeChangeStart', function()
    {
	    $rootScope.loading = true;
  	});

  	$rootScope.$on('$routeChangeSuccess', function()
	 {
	    $rootScope.loading = false;
	 });
});


