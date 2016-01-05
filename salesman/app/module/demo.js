// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('myAppModule', 
['ngRoute','mobile-angular-ui','mobile-angular-ui.gestures','ngMap','ngCordova']);

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

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 


// 
// `$touch example`
// 



//
// For this trivial demo we have just a unique MainController 
// for everything
//
