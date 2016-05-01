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

    $routeProvider.when('/absensi',
    {
        templateUrl : 'angular/partial/salesman/absensi.html',
        controller  : 'AbsensiController',
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
            },
            resolvegpslocation: function (LocationService) 
            {
                var resolvegpslocation = LocationService.GetGpsLocation();
                return resolvegpslocation;
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
            paksachekin: function ($q,$location,$route,$window,$filter) 
            {
                var iddetailkunjungan  = $route.current.params.iddetailkunjungan;
                if($window.localStorage.getItem('my-storage'))
                {
                    var xxx = JSON.parse($window.localStorage.getItem('my-storage'));
                    if(iddetailkunjungan != xxx.iddetailkunjungan)
                    {
                        var tanggalkunjungan = $filter('date')(xxx.tanggalkunjungan,'dd-MM-yyyy');
                        alert("Check Out Terlebih Dahulu Dari Customer " + xxx.namakustomer + " Di Tanggal " + tanggalkunjungan);
                        
                        $location.path('/agenda/' + $filter('date')(xxx.tanggalkunjungan,'yyyy-MM-dd'));
                    }
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
