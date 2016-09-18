
angular.module('starter')
 
.controller('AppCtrl', function($rootScope,$scope, $state) 
{
  $scope.setCurrentUsername = function(name) 
  {
    $scope.username = name;
  };
  $scope.logout = function() 
  {
    $state.go('login');
  };
  
})

.controller('DashboardCtrl', function($window,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService,ProductService) 
{
    var menus = [];
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"",judul:"Chart"});
    menus.push({src: "assets/img/img/200x200/money.png",link:"",judul:"SCM"});
    menus.push({src: "assets/img/img/200x200/meeting.png",link:"",judul:"CRM"});
    menus.push({src: "assets/img/img/200x200/meeting.png",link:"",judul:"HRM"});
    menus.push({src: "assets/img/img/200x200/ro.png",link:"",judul:"PO"});
    menus.push({src: "assets/img/img/200x200/chat.png",link:"",judul:"Chat"});
    menus.push({src: "assets/img/img/200x200/clubing.png",link:"",judul:"B.Acara"});
    $scope.menus = UtilService.ArrayChunk(menus,4);

    $ionicLoading.show
    ({
        template: 'Loading...'
    });
    ProductService.GetProducts()
    .then (function (response)
    {
        console.log(response);
    })
    .finally(function() 
    {
        $ionicLoading.hide();
    });
});