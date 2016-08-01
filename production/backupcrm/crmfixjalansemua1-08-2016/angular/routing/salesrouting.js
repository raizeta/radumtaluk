'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
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
            historyresolve: function($q,JadwalKunjunganService,authService)
            {
                var userInfo        = authService.getUserInfo();
                var resolvehistory  = JadwalKunjunganService.GetListHistory(userInfo);
                if(resolvehistory)
                {
                    return $q.when(resolvehistory);
                }
            },
            resolveabsensi: function ($q,AbsensiService,authService,$filter) 
            {
                var userInfo                = authService.getUserInfo();
                var tglhariini              = $filter('date')(new Date(),'yyyy-MM-dd');
                var resolveabsensi          = AbsensiService.getAbsensi(userInfo,tglhariini);
                if(resolveabsensi)
                {
                    return $q.when(resolveabsensi);
                }
            }
        }
    });

    $routeProvider.when('/home',
    {
        templateUrl : 'angular/partial/salesman/home.html',
        controller  : 'HomeController',
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

    $routeProvider.when('/help',
    {
        templateUrl : 'angular/partial/salesman/help.html',
        controller  : 'HelpController',
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
            resolvegpslocation: function ($q,LocationService) 
            {
                var resolvegpslocation = LocationService.GetGpsLocation();
                if(resolvegpslocation)
                {
                    return $q.when(resolvegpslocation);
                }
            },
            resolveabsensi: function ($q,AbsensiService,authService,$filter) 
            {
                var userInfo                = authService.getUserInfo();
                var tglhariini              = $filter('date')(new Date(),'yyyy-MM-dd');
                var resolveabsensi = AbsensiService.getAbsensi(userInfo,tglhariini);
                if(resolveabsensi)
                {
                    return $q.when(resolveabsensi);
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
    $routeProvider.when('/salestrack',
    {
        templateUrl : 'angular/partial/salesman/salestrack.html',
        controller  : 'SalesTrackController',
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
    $routeProvider.when('/salestrack/:idsalesman',
    {
        templateUrl : 'angular/partial/salesman/salestrackperuser.html',
        controller  : 'SalesTrackPerUserController',
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
            },
            resolveabsensi: function ($q,AbsensiService,authService,$filter) 
            {
                var userInfo                = authService.getUserInfo();
                var tglhariini              = $filter('date')(new Date(),'yyyy-MM-dd');
                var resolveabsensi = AbsensiService.getAbsensi(userInfo,tglhariini);
                if(resolveabsensi)
                {
                    return $q.when(resolveabsensi);
                }
            }  
        }
    });

    $routeProvider.when('/outcase',
    {
        templateUrl : 'angular/partial/salesman/outcase.html',
        controller  : 'OutCaseController',
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
                    var tglhariini = $filter('date')(new Date(),'yyyy-MM-dd');

                    var xxx = JSON.parse($window.localStorage.getItem('my-storage'));
                    if((iddetailkunjungan != xxx.iddetailkunjungan) && (tglhariini == xxx.tanggalkunjungan))
                    {
                        var tanggalkunjungan = $filter('date')(xxx.tanggalkunjungan,'dd-MM-yyyy');
                        alert("Check Out Terlebih Dulu Dari " + xxx.namakustomer + " !");
                        //sweetAlert("Oops", "Check Out Terlebih Dulu Dari " + xxx.namakustomer + " !", "error");
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
            },
            resolvedatabarangall: function(ProductService)
            {
                var resolvedatabarang = ProductService.GetDataBarangs();
                return resolvedatabarang;
            },
            resolveconfigradius: function($q,configurationService)
            {
                var resolveconfigradius = configurationService.getConfigRadius();
                return resolveconfigradius;
            },
        }
    });

    $routeProvider.when('/dblocal',
    {
        templateUrl : 'angular/partial/salesman/dblocal.html',
        controller  : 'DBLocalController',
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
    $routeProvider.otherwise({redirectTo:'/error/404'});

}]);
