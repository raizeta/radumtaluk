'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/agenda/:idtanggal',
    {
        templateUrl : 'angular/app_tester/agenda/views/agenda.html',
        controller  : 'AgendaController',
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
            ResolveAbsensi: function($q,$filter,LoginFac,AbsensiCombFac)
            {
                var tanggalplan             = $filter('date')(new Date(),'yyyy-MM-dd');
                var auth                    = LoginFac.getUserInfo();
                var resolvestatusabsensi    = AbsensiCombFac.getAbsensiCombine(auth,tanggalplan)
                return resolvestatusabsensi;
            },            
        }
    });
}]);
