myAppModule.controller("MenuController", ["$q","$rootScope","$scope", "$location","$http","auth","$window", 
function ($q,$rootScope,$scope, $location, $http,auth,$window) 
{   
    $scope.activemenu  = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.chat = function()
    {
        alert("Lets Chat");
    }
    $scope.telepon = function()
    {
        alert("Lets Call");
    }
}]);

myAppModule.controller("InventoryController", ["$q","$rootScope","$scope", "$location","$http","auth","$window", 
function ($q,$rootScope,$scope, $location, $http,auth,$window) 
{   
    $scope.activeinventory  = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.chat = function()
    {
        alert("Lets Chat");
    }
    $scope.telepon = function()
    {
        alert("Lets Call");
    }
}]);

myAppModule.controller("ChartController", ["$q","$rootScope","$scope", "$location","$http","auth","$window", 
function ($q,$rootScope,$scope, $location, $http,auth,$window) 
{   
    $scope.activechart  = "active";
    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

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

}]);

myAppModule.controller("RequestOrderController", ["$q","$rootScope","$scope", "$location","$http","auth","$window", 
function ($q,$rootScope,$scope, $location, $http,auth,$window) 
{   
    $scope.activerequestorder  = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("ChatController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","$filter","$cordovaSQLite", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,$filter,$cordovaSQLite) 
{   
    $scope.activeinventory  = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    document.addEventListener("deviceready", function () 
    { 
        $cordovaSQLite.execute($rootScope.db, 'SELECT * FROM Messages ORDER BY id DESC')
        .then(function(result) 
        {
            var salesmanmemo = [];
            if (result.rows.length > 0) 
            {
                var l = result.rows.length;
                for (var i=0; i < l; i++) 
                {
                    var detail = {};
                    detail.id                   = result.rows.item(i).id;
                    detail.isichat              = result.rows.item(i).message;
                    detail.username             = result.rows.item(i).person_from;
                    detail.person_to            = result.rows.item(i).person_to;
                    detail.createat             = result.rows.item(i).create_at;
                    if(detail.username == auth.username)
                    {
                        detail.kelassatu  = "";
                        detail.kelasdua   = "pull-left";
                        detail.kelastiga  = "pull-right";
                    }
                    else
                    {
                        detail.kelassatu = "right";
                        detail.kelasdua  = "pull-right";
                        detail.kelastiga = "pull-left";    
                    }
                    salesmanmemo.push(detail);
                }
            }
            $scope.chats = salesmanmemo;
        },
        function(error) 
        {
            alert("Error on loading: " + error.message);
        });
    });

    $scope.submitForm = function(chatingan)
    {
        var chat = {};
        chat.isichat                = chatingan.isichatingan;
        chat.username               = auth.username;
        chat.kelassatu              = "";
        chat.kelasdua               = "pull-left";
        chat.kelastiga              = "pull-right";
        chat.createat               = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        $scope.chats.push(chat);
        

        var message          = chat.isichat;
        var person_from      = chat.username;
        var person_to        = "salesmd01";
        var create_at        = chat.createat;
        $cordovaSQLite.execute($rootScope.db, 'INSERT INTO Messages (message,person_from,person_to,create_at) VALUES (?,?,?,?)', [message,person_from,person_to,create_at])
        .then(function(result) 
        {
            alert("Message saved successful, cheers!");
        }, 
        function(error) 
        {
            $scope.statusMessage = "Error on saving: " + error.message;
        });

        $scope.chat.isichatingan    ='';
    }
}]);

