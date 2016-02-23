myAppModule.controller("DashCompEsmDataMasterProductionController", ["$scope", "$location","$http", "authService", "auth","$window", 
    function ($scope, $location, $http, authService, auth,$window) 
{

    // $scope.loading  = true;
    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);

myAppModule.controller("DashCompEsmPurchasingController", ["$scope", "$location","$http", "authService", "auth","$window",
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
myAppModule.controller("DashCompEsmWarehouseController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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

    var jsonDatawarehouses = $.ajax
    ({
          url: "http://api.lukisongroup.com/chart/esm-warehouses",
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var myData1 = jsonDatawarehouses;
    $scope.fi=JSON.parse(myData1)['WhFactoryItem'];
    $scope.di=JSON.parse(myData1)['WhDistributorItem'];
    $scope.si=JSON.parse(myData1)['WhSubdistItem'];
    $scope.ci=JSON.parse(myData1)['WhCustomerItem'];
    var summary =JSON.parse(myData1)['Wh_Summary'];

    $scope.stock_factory        = summary[0].stock_factory;
    $scope.stock_distributor    = summary[1].stock_distributor;
    $scope.stock_subdist        = summary[2].stock_subdist;
    $scope.stock_customer       = summary[3].stock_customer;

    
    
}]);
myAppModule.controller("DashCompEsmFactoryController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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

myAppModule.controller("DashCompEsmMarketingController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
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

myAppModule.controller("DashCompEsmSalesController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", 
function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var jsonDatasales = $.ajax
    ({
          url: "http://api.lukisongroup.com/chart/esm-sales",
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    if(jsonDatasales)
    {
        var myData = jsonDatasales;
        $scope.mt=JSON.parse(myData)['SalesItem_Mt'];
        $scope.gt=JSON.parse(myData)['SalesItem_Gt'];
        $scope.horeca=JSON.parse(myData)['SalesItem_Horeca'];
        $scope.others=JSON.parse(myData)['SalesItem_Others'];

        var summary =JSON.parse(myData)['Sales_Summary'];

        $scope.sales_mt        = summary[0].sales_mt;
        $scope.sales_gt    = summary[1].sales_gt;
        $scope.sales_horeca        = summary[2].sales_horeca;
        $scope.sales_other       = summary[3].sales_other;

        $scope.loading = false ;
    }
    $scope.logout = function () 
    {  
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

