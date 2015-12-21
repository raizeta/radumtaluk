'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/gosent/new/helpdesk',
    {
        templateUrl : 'angular/partial/company/gosent/helpdesk/newhelpdesk.html',
        controller  : 'NewGosentHelpdeskController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    $routeProvider.when('/company/gosent/list/helpdesk',
    {
        templateUrl : 'angular/partial/company/gosent/helpdesk/listhelpdesk.html',
        controller  : 'ListGosentHelpdeskController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    $routeProvider.when('/company/gosent/detail/helpdesk/:idhelpdesk',
    {
        templateUrl : 'angular/partial/company/gosent/helpdesk/detailhelpdesk.html',
        controller  : 'DetailGosentHelpdeskController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    $routeProvider.when('/company/gosent/edit/helpdesk/:idhelpdesk',
    {
        templateUrl : 'angular/partial/company/gosent/helpdesk/edithelpdesk.html',
        controller  : 'EditGosentHelpdeskController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });
    $routeProvider.when('/company/gosent/delete/helpdesk/:idhelpdesk',
    {
        templateUrl : 'angular/partial/company/gosent/helpdesk/edithelpdesk.html',
        controller  : 'DeleteGosentHelpdeskController',
        resolve: 
        {
            auth: function ($q, authService,$location) 
            {
                var userInfo = authService.getUserInfo();
                if (userInfo) 
                {
                    return $q.when(userInfo);
                } 
                else 
                {
                    $location.path('/');
                }
            }
        }
    });

}]);