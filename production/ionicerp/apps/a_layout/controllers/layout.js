
angular.module('starter')
 
.controller('AppCtrl', function($rootScope,$scope, $state,StorageService) 
{
  var profile = StorageService.get('profile');
  $scope.profile = profile;
  $scope.logout = function() 
  {
    $state.go('login');
  };
  
})

.controller('DashboardCtrl', function($window,$rootScope,$scope, $state,$ionicPopup,$ionicLoading,UtilService,ProductService,ArrayObjectService) 
{
    var menus = [];
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"#/main/charts/sales",judul:"Chart"});
    menus.push({src: "assets/img/img/200x200/money.png",link:"",judul:"SCM"});
    menus.push({src: "assets/img/img/200x200/meeting.png",link:"",judul:"CRM"});
    menus.push({src: "assets/img/img/200x200/meeting.png",link:"",judul:"HRM"});
    menus.push({src: "assets/img/img/200x200/ro.png",link:"#/main/po/inbox",judul:"PO"});
    menus.push({src: "assets/img/img/200x200/chat.png",link:"",judul:"Chat"});
    menus.push({src: "assets/img/img/200x200/clubing.png",link:"#/main/ba/inbox",judul:"B.Acara"});
    $scope.menus = UtilService.ArrayChunk(menus,4);

    var anotherarray = [];
    anotherarray.push({src: "assets/img/img/200x200/chart.jpg",link:"",judul:"Chart"});
    anotherarray.push({src: "assets/img/img/200x200/money.png",link:"",judul:"SCM"});
    anotherarray.push({src: "assets/img/img/200x200/money.png",link:"",judul:"SCM"});
    var diffarray = ArrayObjectService.DiffTwoArrayObject(menus,anotherarray);
    var unikarray = ArrayObjectService.UniqueObjectInArray(anotherarray);
});