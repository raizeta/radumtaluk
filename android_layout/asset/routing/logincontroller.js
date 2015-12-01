var app = angular.module("sampleApp", ['ngRoute']);

app.config(['$routeProvider',function($routeProvider) 
{
    $routeProvider.when('/', {
        templateUrl: 'index.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/home', {
        templateUrl: 'asset/partial/salesman/home/absensi.html',
        controller: 'SpgController',
        requireLogin: true
    });
    
    $routeProvider.when('/spg', {
            templateUrl: 'asset/partial/spg/home.html',
            controller: 'SpgController',
            requireLogin: true
        });
    $routeProvider.when('/spg/stockgudang', {
            templateUrl: 'asset/partial/spg/home/stockgudang.html',
            controller: 'SpgController',
            requireLogin: true
        });


}]);

