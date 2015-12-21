'use strict';
myAppModule.config(['$routeProvider', function($routeProvider,$authProvider)
{
    $routeProvider.when('/company/gosent/new/affiliation',
    {
        templateUrl : 'angular/partial/company/gosent/affiliation/newaffiliation.html',
        controller  : 'NewGosentAffiliationController',
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
    $routeProvider.when('/company/gosent/list/affiliation',
    {
        templateUrl : 'angular/partial/company/gosent/affiliation/listaffiliation.html',
        controller  : 'ListGosentAffiliationController',
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
    $routeProvider.when('/company/gosent/detail/affiliation/:idaffiliation',
    {
        templateUrl : 'angular/partial/company/gosent/affiliation/detailaffiliation.html',
        controller  : 'DetailGosentAffiliationController',
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
    $routeProvider.when('/company/gosent/edit/affiliation/:idaffiliation',
    {
        templateUrl : 'angular/partial/company/gosent/affiliation/editaffiliation.html',
        controller  : 'EditGosentAffiliationController',
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
    $routeProvider.when('/company/gosent/delete/affiliation/:idaffiliation',
    {
        templateUrl : 'angular/partial/company/gosent/affiliation/editaffiliation.html',
        controller  : 'DeleteGosentAffiliationController',
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