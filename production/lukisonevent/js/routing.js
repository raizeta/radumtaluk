angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider, USER_ROLES,$ionicConfigProvider,$ionicConfigProvider) 
{
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider
  .state('auth', 
  {
    url: '/',
    templateUrl: 'templates/mainlogin.html',
    abstract:true,

  })
  .state('auth.login', 
  {
    url: 'auth/login',
    views: 
    {
        'login-tab': 
        {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl',
          parent: "main",
        }
    }
  })
  .state('auth.register', 
  {
    url: 'auth/register',
    views: 
    {
        'register-tab': 
        {
          templateUrl: 'templates/register.html',
        }
    }
  })

  .state('main', 
  {
    url: '/',
    abstract: true,
    templateUrl: 'templates/main.html',
  })

  .state('main.orders', 
  {
    url: 'main/orders',
    cache: false,
    views: 
    {
        'orders-tab': 
        {
          templateUrl: 'templates/orders.html',
          controller: 'OrderCtrl'
        }
    }
  })

  .state('main.ranking', 
  {
    url: 'main/rangking',
    views: 
    {
        'rangking-tab': 
        {
          templateUrl: 'templates/rangking.html',
          controller: 'RangkingCtrl'
        }
    }
  })

  .state('main.profile', 
  {
    url: 'main/profile',
    views: 
    {
        'profile-tab': 
        {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
    }
  })

  .state('main.shop',
  {
    url: 'main/shop',
    cache: false,
    views: 
    {
        'shop-tab': 
        {
          templateUrl: 'templates/shop.html',
          controller: 'ShopCtrl'
        }
    },
    data: 
    {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
  .state('main.cart',
  {
    url: 'main/cart',
    cache: false,
    views: 
    {
      'cart-tab':
      {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl' 
      }  
    }
  });
  
  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function ($injector, $location) 
  {
    var $state = $injector.get("$state");
    $state.go("main.ranking");
  });
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
});