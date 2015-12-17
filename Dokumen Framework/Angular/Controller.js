var demoApp = angular.module('demoApp',[]);

demoApp.controller('SimpleController', function($scope)
{
	$scope.customers=
	[
		{"name":"Radumta Sitepu", "city":"Medan"},
		{"name":"Perjon Zet", "city":"Medan"}
	];
});

########################################################

var demoApp = angular.module('demoApp',[]);

demoApp.controller('SimpleController', function($scope)
{
	$scope.customers=
	[
		{name:"Radumta Sitepu", city:"Medan"},
		{name:"Perjon Zet", city:"Medan"}
	];
});


########################################################

var demoApp = angular.module('demoApp',[]);

demoApp.controller('SimpleController', function($scope)
{
	$scope.customers=
	[
		{'name':"Radumta Sitepu", 'city':"Medan"},
		{'name':"Perjon Zet", 'city':"Medan"}
	];
});