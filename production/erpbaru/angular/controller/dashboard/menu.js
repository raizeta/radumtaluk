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

