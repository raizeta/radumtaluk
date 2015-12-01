var app = angular.module("sampleApp", []);

app.run(["$rootScope", "$location", function ($rootScope, $location) 
{

    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) 
    {
        if (eventObj.authenticated === false) 
        {
            $location.path("/");
        }
    });
}]);



app.controller("HomeController", ["$scope", "$location", "$window", "authenticationSvc", function($scope,$location,$window,authenticationSvc) 
{
    $scope.login = function() 
    {

        $scope.fromservice = authenticationSvc.login($scope.userName, $scope.password)
        .then(function (result) 
            {
                $scope.userInfo = result;
                $location.path("/");
                alert($scope.userInfo.username);
            },

            function (error) 
            {
                $window.alert("Invalid credentials");
                console.log(error);
            });

    };


}]);

app.controller("SpgController", function($scope,$http) 
{

});

