'use strict';
myAppModule.controller("ChartEsmController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.userInfo = auth;
    var revenueChart = new FusionCharts(
    {
        type: 'column2d',
        renderAt: 'chart-container',
        width: '100%',
        height: '300',
        dataFormat: 'json',
        dataSource: 
        {
            "chart": 
            {
                "caption": "Top 4 Chocolate Brands Sold",
                "subCaption": "Last Year",
                "xAxisName": "Brand",
                "yAxisName": "Amount (In USD)",
                "yAxisMaxValue": "120000",
                "numberPrefix": "$",
                "theme": "fint",
                "PlotfillAlpha" :"0",
                "placeValuesInside" : "0",
                "rotateValues" : "0",
                "valueFontColor" : "#333333"
                
            },
            "annotations": 
            {
                "width": "500",
                "height": "300",
                "autoScale": "1",
                "groups": 
                [
                    {
                        "id": "user-images",
                        "xScale_" : "20",
                        "yScale_" : "20",
                        "items": 
                        [
                            {
                                "id": "butterFinger-icon",
                                "type": "image",
                                "url": "http://static.fusioncharts.com/sampledata/images/butterFinger.png",
                                "x": "$xaxis.label.0.x - 30",
                                "y": "$canvasEndY - 150",
                                "xScale" : "80",
                                "yScale" : "40",
                            },
                            {
                                "id": "tom-user-icon",
                                "type": "image",
                                "url": "http://static.fusioncharts.com/sampledata/images/snickrs.png",
                                "x": "$xaxis.label.1.x - 26",
                                "y": "$canvasEndY - 141",
                                "xScale" : "48",
                                "yScale" : "38"
                            },
                            {
                                "id": "Milton-user-icon",
                                "type": "image",
                                "url": "http://static.fusioncharts.com/sampledata/images/coffee_crisp.png",
                                "x": "$xaxis.label.2.x - 22",
                                "y": "$canvasEndY - 134",
                                "xScale" : "43",
                                "yScale" : "36"
                            },
                            {
                                "id": "Brian-user-icon",
                                "type": "image",
                                "url": "http://static.fusioncharts.com/sampledata/images/100grand.png",
                                "x": "$xaxis.label.3.x - 22",
                                "y": "$canvasEndY - 131",
                                "xScale" : "43",
                                "yScale" : "35"
                            }
                        ]
                    }
                ]
            },
            "data": 
            [
                {
                    "label": "Butterfinger",
                    "value": "92000"
                }, 
                {
                    "label": "Snickers",
                    "value": "87000"
                }, 
                {
                    "label": "Coffee Crisp",
                    "value": "83000"
                }, 
                {
                    "label": "100 Grand",
                    "value": "80000"
                }
            ]
        }
    }).render();

    
    var jsonDatasales = $.ajax
    ({
          url: "http://api.lukisongroup.com/chart/esm-sales",
          type: "GET",
          dataType:"json",
          async: false
    }).responseText;

    var myData = jsonDatasales;
    $scope.mt=JSON.parse(myData)['SalesItem_Mt'];
    $scope.gt=JSON.parse(myData)['SalesItem_Gt'];
    $scope.horeca=JSON.parse(myData)['SalesItem_Horeca'];
    $scope.others=JSON.parse(myData)['SalesItem_Others'];
    
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("ChartWarehousesController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.userInfo = auth;
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

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("ChartHrmController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.userInfo = auth;
    var jsonDatapersonalias = $.ajax
    ({
          url: "http://api.lukisongroup.com/chart/hrm-personalias",
          type: "GET",
          dataType:"json",
          async: false,
    }).responseText;

    var myData2= jsonDatapersonalias;
    $scope.sss_pie_myDatasource=JSON.parse(myData2)['SourcePie_sss'];
    $scope.lipat_pie_myDatasource=JSON.parse(myData2)['SourcePie_lipat'];
    $scope.esm_pie_myDatasource=JSON.parse(myData2)['SourcePie_esm']; 

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);


myAppModule.controller("ChartHrmEmployeTurnOverController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.userInfo = auth;
    var jsonDatapersonalias = $.ajax
    ({
          url: "http://api.lukisongroup.com/chart/hrm-personalias",
          type: "GET",
          dataType:"json",
          async: false,
    }).responseText;

    var myData1= jsonDatapersonalias;

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

