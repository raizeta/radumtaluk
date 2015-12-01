
var spg = angular.module("sampleApp", ['ngRoute']);

spg.config(['$routeProvider',function($routeProvider) 
    {
        $routeProvider.
            when('/spg', {
                templateUrl: 'asset/partial/spg/home.html',
                controller: 'SpgHomeController'
            });
        $routeProvider.when('/spg/stockgudang', {
                templateUrl: 'asset/partial/spg/home/stockgudang.html',
                controller: 'SpgHomeController'
            });

        $routeProvider.when('/spg/stockpromo', {
                templateUrl: 'asset/partial/spg/home/stockpromo.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/penjualan', {
                templateUrl: 'asset/partial/spg/home/penjualan.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/penjualanpromo', {
                templateUrl: 'asset/partial/spg/home/penjualanpromo.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/jadwalkunjungan', {
                templateUrl: 'asset/partial/spg/home/jadwalkunjungan.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/petacustomer', {
                templateUrl: 'asset/partial/spg/home/petacustomer.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/absensi', {
                templateUrl: 'asset/partial/spg/home/absensi.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/profile', {
                templateUrl: 'asset/partial/spg/home/profile.html',
                controller: 'SpgHomeController'
            }).
            
            when('/spg/produk', {
                templateUrl: 'asset/partial/spg/home/produk.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/penjualanharian', {
                templateUrl: 'asset/partial/spg/home/penjualanharian.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/penjualanbulanan', {
                templateUrl: 'asset/partial/spg/home/penjualanbulanan.html',
                controller: 'SpgHomeController'
            }).
            when('/spg/penjualantahunan', {
                templateUrl: 'asset/partial/spg/home/penjualantahunan.html',
                controller: 'SpgHomeController'
            }).

            when('/spg/setting', {
                templateUrl: 'asset/partial/spg/setting.html',
                controller: 'SpgSettingController'
            }).

            when('/spg/chatting', {
                templateUrl: 'asset/partial/spg/chatting.html',
                controller: 'SpgChattingController'
            }).
            when('/spg/faq', {
                templateUrl: 'asset/partial/spg/faq.html',
                controller: 'SpgFaqController'
            }).
            when('/spg/tips', {
                templateUrl: 'asset/partial/spg/tips.html',
                controller: 'SpgTipsController'
            }).

            when('/spg/setting', {
                templateUrl: 'asset/partial/spg/setting.html',
                controller: 'SpgSettingController'
            }).

            otherwise({
                redirectTo: '/spg/'
            });
    }]);

