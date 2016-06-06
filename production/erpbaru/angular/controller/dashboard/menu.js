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

myAppModule.controller("ChatController", ["$q","$rootScope","$scope", "$location","$http","auth","$window","$filter", 
function ($q,$rootScope,$scope, $location, $http,auth,$window,$filter) 
{   
    $scope.activeinventory  = "active";
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    var chats = [];
    var chat = {};
    chat.username   = "salesman";
    chat.isichat    = "nama saya salesman";
    chat.createat   = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    chat.kelassatu  = "";
    chat.kelasdua   = "pull-left";
    chat.kelastiga  = "pull-right";
    chats.push(chat);
    var chat = {};
    chat.username  = "salesmd";
    chat.isichat   = "nama saya salesmd";
    chat.createat  = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
    chat.kelassatu = "right";
    chat.kelasdua  = "pull-right";
    chat.kelastiga = "pull-left";
    chats.push(chat);
    $scope.chats = chats;

    $scope.submitForm = function(chatingan)
    {
        var chat = {};
        chat.isichat  = chatingan.isichatingan;
        chat.kelassatu      = "";
        chat.kelasdua       = "pull-left";
        chat.kelastiga      = "pull-right";
        chat.createat       = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        $scope.chats.push(chat);
        $scope.chat.isichatingan='';

    }
}]);