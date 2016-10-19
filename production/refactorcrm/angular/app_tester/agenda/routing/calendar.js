'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/calendar',
    {
        templateUrl : 'angular/app_tester/agenda/views/calendar.html',
        controller  : 'CalendarController',
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

}]);
