myAppModule.controller("DepartmentPilotScheduleController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    var  jsonData1= $.ajax
    ({
          url: "http://labtest3-api.int/chart/pilotps?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",
          type: "GET",
          dataType:"json",
          data:"id_user=1&pilih=0", /*[0=Dept,1=user]*/
          async: false
    }).responseText;

  $scope.departmentpilotproject = jsonData1;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("EmployeePilotScheduleController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    var  jsonData1= $.ajax
    ({
          url: "http://labtest3-api.int/chart/pilotps?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",
          type: "GET",
          dataType:"json",
          data:"id_user=1&pilih=1", /*[0=Dept,1=user]*/
          async: false
    }).responseText;

  $scope.employeepilotproject = jsonData1;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

