myAppModule.controller("DashDeptHrdPersonaliaController", ["$scope", "$location","$http", "authService", "auth","$window", 
    function ($scope, $location, $http, authService, auth,$window) 
{


    // $scope.userInfo = auth;

    var jsonDatapersonalias = $.ajax
    ({
          url: "http://api.lukisongroup.com/chart/hrm-personalias",
          type: "GET",
          dataType:"json",
          async: false,
    }).responseText;

    var myData1= jsonDatapersonalias;
    $scope.sss_pie_myDatasource=JSON.parse(myData1)['SourcePie_sss'];
    $scope.lipat_pie_myDatasource=JSON.parse(myData1)['SourcePie_lipat'];
    $scope.esm_pie_myDatasource=JSON.parse(myData1)['SourcePie_esm']; 

    $scope.support_attrs=JSON.parse(myData1)['support_attrs'];
    $scope.support_catg=JSON.parse(myData1)['support_catg'];
    $scope.support_dataset=JSON.parse(myData1)['support_dataset'];

    $scope.bisnis_attrs=JSON.parse(myData1)['bisnis_attrs'];
    $scope.bisnis_catg=JSON.parse(myData1)['bisnis_catg'];
    $scope.bisnis_dataset=JSON.parse(myData1)['bisnis_dataset'];

    $scope.Employe_Summary = JSON.parse(myData1)['Employe_Summary']; 
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);

myAppModule.controller("DashDeptHrdRekrutmenController", ["$scope", "$location","$http", "authService", "auth","$window",
function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.loading  = true;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DashDeptHrdAbsensiController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);
myAppModule.controller("DashDeptHrdPayrollController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;

    $scope.logout = function () 
    {  
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DashDeptHrdModulController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;

    $scope.logout = function () 
    {  
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DashDeptHrdGeneralAffairController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;

    $scope.logout = function () 
    {  
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DashDeptHrdEmployeeController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","apiService", 
function ($scope, $location, $http, $routeParams, authService, auth, $window,apiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    apiService.listemployee()
    .then(function (result) 
    {
        $scope.employees = result.Employee;
        $scope.loading = false;
        console.log($scope.employees);
    });

    $scope.logout = function () 
    {  
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

