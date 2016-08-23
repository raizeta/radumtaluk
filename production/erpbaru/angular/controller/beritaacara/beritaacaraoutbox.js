'use strict';
myAppModule.controller("BeritaAcaraOutboxController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout) 
{   
    $scope.datatab = 
    {
      selectedIndex: 1,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

}]);

myAppModule.controller("BeritaAcaraOutboxDetailController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout) 
{   
    $scope.datatab = 
    {
      selectedIndex: 1,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

}]);
myAppModule.controller("BeritaAcaraOutboxNewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout",
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout) 
{   
    $scope.datatab = 
    {
      selectedIndex: 1,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.imageStrings = [];
    $scope.processFiles = function(files)
    {
        if($scope.imageStrings.length > 0)
        {
            angular.forEach(files, function(flowFile, i)
            {
                var fileReader = new FileReader();
                fileReader.onload = function (event) 
                {
                    var uri = event.target.result;
                    $scope.imageStrings.push(uri);     
                };
              fileReader.readAsDataURL(flowFile.file);
            });
        }
        else
        {
            angular.forEach(files, function(flowFile, i)
            {
                var fileReader = new FileReader();
                fileReader.onload = function (event) 
                {
                    var uri = event.target.result;
                    $scope.imageStrings[i] = uri;     
                };
              fileReader.readAsDataURL(flowFile.file);
            });
        }

        
    };

}]);