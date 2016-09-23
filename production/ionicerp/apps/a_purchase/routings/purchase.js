angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider)
{
    $stateProvider.state('main.po', 
    {
      url: '/po',
      abstract:true,
      views: 
      {
          'po-tab': 
          {
            templateUrl: 'apps/a_purchase/views/po.html',
            controller:'PurchaseCtrl'
          }
      }
    });
    $stateProvider.state('main.po.inbox', 
    {
          url: "/inbox",
          views: {
              'po-inbox': {
                  templateUrl: "apps/a_purchase/views/po-inbox.html",
                  controller:'PurchaseInboxCtrl'
              }
          }
    });
    $stateProvider.state('main.po.inboxdetail', 
    {
          url: "/inboxdetail/:id",
          views: {
              'po-inbox': {
                  templateUrl: "apps/a_purchase/views/po-inbox-detail.html",
                  controller:'PurchaseInboxDetailCtrl'
              }
          }
    });
    $stateProvider.state('main.po.accept', 
    {
          url: "/accept",
          views: {
              'po-accept': {
                  templateUrl: "apps/a_purchase/views/po-accept.html",
                  controller:'PurchaseAcceptCtrl'
              }
          }
    });
    $stateProvider.state('main.po.acceptdetail', 
    {
          url: "/acceptdetail/:id",
          views: {
              'po-accept': {
                  templateUrl: "apps/a_purchase/views/po-accept-detail.html",
                  controller:'PurchaseAcceptDetailCtrl'
              }
          }
    });
    $stateProvider.state('main.po.reject', 
    {
          url: "/reject",
          views: {
              'po-reject': {
                  templateUrl: "apps/a_purchase/views/po-reject.html",
                  controller:'PurchaseRejectCtrl'
              }
          }
    });
    $stateProvider.state('main.po.rejectdetail', 
    {
          url: "/rejectdetail/:id",
          views: {
              'po-reject': {
                  templateUrl: "apps/a_purchase/views/po-reject-detail.html",
                  controller:'PurchaseRejectDetailCtrl'
              }
          }
    });
});