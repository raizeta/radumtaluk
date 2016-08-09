'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
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
            }
        }
    });

    $routeProvider.when('/history',
    {
        templateUrl : 'angular/partial/salesman/history.html',
        controller  : 'HistoryController',
        resolve: 
        {
            auth: function ($q,authService,$location) 
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
            resolvesingledetailkunjunganbyiddetail: function (singleapiService,$route) 
            {
                var iddetailkunjungan             = $route.current.params.iddetailkunjungan;
                var resolvesingledetailkunjunganbyiddetail = singleapiService.singledetailkunjunganbyiddetail(iddetailkunjungan);
                return resolvesingledetailkunjunganbyiddetail;
            },
            resolveconfigradius: function($q,configurationService)
            {
                var resolveconfigradius = configurationService.getConfigRadius();
                return resolveconfigradius;
            },
            resolveobjectbarang: function($q,ProductService)
            {
                var resultobjectbarang = ProductService.GetObjectDataBarangs();
                return resultobjectbarang;
            },
            resolveobjectbarangsqlite: function($q,ProductService)
            {
                var resultobjectbarangsqlite = ProductService.GetDataBarangsSqlite();
                return resultobjectbarangsqlite;
            },
            resolvesot2type: function($q,SOT2Services)
            {
                var resultsot2type = SOT2Services.getSOT2Type();
                return resultsot2type;
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
