'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
	$routeProvider.when('/home',
	{
		templateUrl	: 'angular/partial/salesman/home.html',
		controller 	: 'HomeController',
		resolve: 
		{
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {
                   if (userInfo.rulename === 'SALESMAN') 
                    {
                        return $q.when(userInfo);
                    }
                    else
                    {
                        $location.path('/error/404');
                    } 
                }
                else 
                {
                    $location.path('/');
                }
            }
        }
	});

    $routeProvider.when('/setposition',
    {
        templateUrl : 'angular/partial/salesman/setposition.html',
        controller  : 'SetPositionController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {
                   if (userInfo.rulename === 'SALESMAN') 
                    {
                        return $q.when(userInfo);
                    }
                    else
                    {
                        $location.path('/error/404');
                    } 
                }
                else 
                {
                    $location.path('/');
                }
            }
        }
    });

    $routeProvider.when('/detailcustomer/:idcustomer/:idtanggal',
    {
        templateUrl : 'angular/partial/salesman/detailcustomer.html',
        controller  : 'DetailCustomerController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {
                   if (userInfo.rulename === 'SALESMAN') 
                    {
                        return $q.when(userInfo);
                    }
                    else
                    {
                        $location.path('/error/404');
                    } 
                }
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    
    $routeProvider.when('/agenda/:idtanggal',
    {
        templateUrl : 'angular/partial/salesman/agenda.html',
        controller  : 'DetailAgendaController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {
                   if (userInfo.rulename === 'SALESMAN') 
                    {
                        return $q.when(userInfo);
                    }
                    else
                    {
                        $location.path('/error/404');
                    } 
                }
                else 
                {
                    $location.path('/');
                }
            },
            ResolveIdGroupCustomer: function (authService,JadwalKunjunganService,$route) 
            {
                var tanggalplan             = $route.current.params.idtanggal;
                var userInfo                = authService.getUserInfo();
                return JadwalKunjunganService.GetGroupCustomerByTanggalPlan(userInfo,tanggalplan);
            }   
        }

    });

    $routeProvider.when('/history',
    {
        templateUrl : 'angular/partial/salesman/history.html',
        controller  : 'HistoryController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {
                   if (userInfo.rulename === 'SALESMAN') 
                    {
                        return $q.when(userInfo);
                    }
                    else
                    {
                        $location.path('/error/404');
                    } 
                }
                else 
                {
                    $location.path('/');
                }
            },
            historyresolve: function(JadwalKunjunganService,authService)
            {
                var userInfo = authService.getUserInfo();
                return JadwalKunjunganService.GetListHistory(userInfo);
            }
        }
    });

    $routeProvider.when('/detailjadwalkunjungan/:iddetailkunjungan',
    {
        templateUrl : 'angular/partial/salesman/detailjadwalkunjungan.html',
        controller  : 'DetailJadwalKunjunganController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if(userInfo)
                {
                   if (userInfo.rulename === 'SALESMAN') 
                    {
                        return $q.when(userInfo);
                    }
                    else
                    {
                        $location.path('/error/404');
                    } 
                }
                else 
                {
                    $location.path('/');
                }
            },
            resolvegpslocation: function (LocationService) 
            {
                var resolvegpslocation = LocationService.GetGpsLocation();
                return resolvegpslocation;
            },
            resolvesingledetailkunjunganbyiddetail: function (singleapiService,$route) 
            {
                var iddetailkunjungan             = $route.current.params.iddetailkunjungan;
                var resolvesingledetailkunjunganbyiddetail = singleapiService.singledetailkunjunganbyiddetail(iddetailkunjungan);
                return resolvesingledetailkunjunganbyiddetail;
            }
        }
    });

    $routeProvider.otherwise({redirectTo:'/error/404'});

}]);
