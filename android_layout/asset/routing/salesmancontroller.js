var salesman = angular.module("sampleApp", ['ngRoute','login']);
salesman.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/salesman', {
                templateUrl: 'asset/partial/salesman/home.html',
                controller: 'HomeController',
                resolve: {
                    auth: function ($q, authenticationSvc) 
                    {
                        var userInfo = authenticationSvc.getUserInfo();
                        if (userInfo) 
                        {
                            return $q.when(userInfo);
                        } 
                        else 
                        {
                            return $q.reject({ authenticated: false });
                        }
                    }
                }
            }).
            when('/salesman/barangumum', {
                templateUrl: 'asset/partial/salesman/home/listbarangumum.html',
                controller: 'HomeController'
            }).
            when('/salesman/newbarangumum', {
                templateUrl: 'asset/partial/salesman/home/newbarangumum.html',
                controller: 'HomeController'
            }).

            when('/salesman/edit/barangumum/:id', {
                templateUrl: 'asset/partial/salesman/home/editbarangumum.html',
                controller: 'SingleController'
            }).
            when('/salesman/kategori', {
                templateUrl: 'asset/partial/salesman/home/listkategori.html',
                controller: 'HomeController'
            }).
            when('/salesman/typebarang', {
                templateUrl: 'asset/partial/salesman/home/listtypebarang.html',
                controller: 'HomeController'
            }).
            when('/salesman/suplier', {
                templateUrl: 'asset/partial/salesman/home/listsuplier.html',
                controller: 'HomeController'
            }).
            when('/salesman/jadwalkunjungan', {
                templateUrl: 'asset/partial/salesman/home/jadwalkunjungan.html',
                controller: 'HomeController'
            }).
            when('/salesman/petacustomer', {
                templateUrl: 'asset/partial/salesman/home/petacustomer.html',
                controller: 'HomeController'
            }).
            when('/salesman/absensi', {
                templateUrl: 'asset/partial/salesman/home/absensi.html',
                controller: 'HomeController'
            }).
            when('/salesman/profile', {
                templateUrl: 'asset/partial/salesman/home/profile.html',
                controller: 'HomeController'
            }).
            when('/salesman/dailysellingout', {
                templateUrl: 'asset/partial/salesman/home/dailysellingout.html',
                controller: 'HomeController'
            }).
            when('/salesman/dailystockharian', {
                templateUrl: 'asset/partial/salesman/home/dailystockharian.html',
                controller: 'HomeController'
            }).
            when('/salesman/monthlysellingout', {
                templateUrl: 'asset/partial/salesman/home/monthlysellingout.html',
                controller: 'HomeController'
            }).
            when('/salesman/monthlystockharian', {
                templateUrl: 'asset/partial/salesman/home/monthlystockharian.html',
                controller: 'HomeController'
            }).

            when('/salesman/chatting', {
                templateUrl: 'asset/partial/salesman/chatting.html',
                controller: 'ChattingController'
            }).
            when('/salesman/faq', {
                templateUrl: 'asset/partial/salesman/faq.html',
                controller: 'FaqController'
            }).
            when('/salesman/tips', {
                templateUrl: 'asset/partial/salesman/tips.html',
                controller: 'TipsController'
            }).

            otherwise({
                redirectTo: '/salesman/'
            });
    }]);

