'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/summary',
    {
        templateUrl : 'angular/app_tester/summary/views/summary.html',
        controller  : 'SummaryController',
        resolve: 
        {
            auth: function ($q,LoginFac,$location) 
            {
                var userInfo = LoginFac.getUserInfo();
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
            rescalendar: function($q,CalendarCombFac,LoginFac)
            {
                var auth            = LoginFac.getUserInfo();
                var calendaragenda  = CalendarCombFac.GetCalendarCombine(auth);
                return calendaragenda;
            }
        }
    });
    $routeProvider.when('/summary/:idtanggal',
    {
        templateUrl : 'angular/app_tester/summary/views/summaryperdate.html',
        controller  : 'SummaryPerDateController',
        resolve: 
        {
            auth: function ($q,LoginFac,$location) 
            {
                var userInfo = LoginFac.getUserInfo();
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
            ProductCombRes: function($q,ProductCombFac)
            {
                var resultobjectbarangsqlite = ProductCombFac.getProductCombine();
                return resultobjectbarangsqlite;
            },
            ActivitasCombRes: function($q,ActivitasCombFac)
            {
                var     resaktifitas = ActivitasCombFac.GetActivitasCombine();
                return  resaktifitas;
            }
        }
    });
    $routeProvider.when('/summary/:idtanggal/:idcustomer',
    {
        templateUrl : 'angular/app_tester/summary/views/summaryperdatepercustomer.html',
        controller  : 'SummaryPerDatePerCustController',
        resolve: 
        {
            auth: function ($q,LoginFac,$location) 
            {
                var userInfo = LoginFac.getUserInfo();
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
            ProductCombRes: function($q,ProductCombFac)
            {
                var resultobjectbarangsqlite = ProductCombFac.getProductCombine();
                return resultobjectbarangsqlite;
            },
            ActivitasCombRes: function($q,ActivitasCombFac)
            {
                var     resaktifitas = ActivitasCombFac.GetActivitasCombine();
                return  resaktifitas;
            }
        }
    });	
}]);
