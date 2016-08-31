
angular.module('starter')
 
.controller('AppCtrl', function($rootScope,$scope, $state, $ionicPopup, AuthService) 
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

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};
  $scope.login = function(data) 
  {
    AuthService.login(data.username, data.password)
    .then(function(authenticated) 
    {
      $state.go('main.ranking', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, 
    function(err) 
    {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})


.controller('ShopCtrl', function($window,$rootScope,$scope, $state, $http, $ionicPopup, AuthService,ProductService) 
{
  if($window.localStorage.getItem('product-order'))
  {
      var productorders       = JSON.parse($window.localStorage.getItem('product-order'));
      $scope.menu_items       = productorders;

      var jumlahitem                          = JSON.parse($window.localStorage.getItem('jumlah-item'));
      $rootScope.jumlahitemdikeranjang        = jumlahitem;
  }
  else
  {
      ProductService.GetProducts()
      .then (function (response)
      {
        $scope.menu_items = response;
      },
      function (error)
      {

      }); 
  }
  

  $scope.addtocart = function(barangumum)
  {
      $scope.data = {};
      var myPopup = $ionicPopup.show
      ({
          template: '<input type="number" ng-model="data.wifi">',
          title: barangumum.NM_PRODUCT,
          subTitle: 'Quantity/Pcs',
          scope: $scope,
          buttons: 
          [
            { 
              text: 'Cancel',
              type: 'button-assertive', 
            },
            {
              text: '<b>Add</b>',
              type: 'button-positive',
              onTap: function(e) 
              {
                if (!$scope.data.wifi) 
                {
                  e.preventDefault();
                } 
                else 
                {
                  return $scope.data.wifi;
                }
              }
            }
          ]
      });
      myPopup.then(function(res) 
      {
          if(res)
          {
              var products = _.findWhere($scope.menu_items, barangumum);
              if(!(products.quantity))
              {
                $rootScope.jumlahitemdikeranjang += 1;
              }
              products.quantity = res;

              var productorder = JSON.stringify($scope.menu_items);
              $window.localStorage.setItem('product-order', productorder);

              var jumlahitem = JSON.stringify($rootScope.jumlahitemdikeranjang);
              $window.localStorage.setItem('jumlah-item', jumlahitem);
          }
      });
  }

})

.controller('CartCtrl', function($window,$rootScope,$scope, $state, $http, $ionicPopup, AuthService,ProductService) 
{
  if($window.localStorage.getItem('product-order'))
  {
      var productorders       = JSON.parse($window.localStorage.getItem('product-order'));
      $scope.menu_items       = productorders;

      var jumlahitem                          = JSON.parse($window.localStorage.getItem('jumlah-item'));
      $rootScope.jumlahitemdikeranjang        = jumlahitem;

      $scope.cartberisi = true;
  }
  else
  {
      $scope.cartberisi = false;
  }

  $scope.placeanorder = function ()
  {
      var confirmPopup = $ionicPopup.confirm
      ({
          title: 'Check Out',
          template: 'Are You Sure To Place And Order?',
          cancelText:'Cancel',
          cancelType:'button-assertive',
      });

      confirmPopup.then(function(res) 
      {
          if(res) 
          {
              $window.localStorage.removeItem('product-order');
              $window.localStorage.removeItem('jumlah-item');
              $rootScope.jumlahitemdikeranjang = 0;
              $state.go('main.shop');
          } 
          else 
          {
            console.log('You are not sure');
          }
      });
  }
  
})

.controller('RangkingCtrl', function($scope, $state, $http, $ionicPopup, AuthService,$interval) {
  $scope.groups = [];
  for (var i=0; i<5; i++) 
  {
    $scope.groups[i] = 
    {
      name: i,
      items: []
    };

    for (var j=0; j<3; j++) 
    {
      $scope.groups[i].items.push('Pembelian-' + (j + 1) + ' = ' + j);
    }
  }

  $scope.shuffle = function shuffleArray(array) 
  {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  $interval(function() 
  {
    $scope.shuffle($scope.groups);
  },3000);
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $scope.groups = [];
    for (var i=0; i<5; i++) 
    {
      $scope.groups[i] = 
      {
        name: i,
        items: []
      };

      for (var j=0; j<3; j++) 
      {
        $scope.groups[i].items.push('Pembelian-' + (j + 1) + ' = ' + j);
      }
    }
});