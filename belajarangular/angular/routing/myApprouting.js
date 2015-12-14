'use strict';
myApp.config(function($stateProvider) {
  $stateProvider
    .state('index', {
      url: "",
      views: {
        "viewA": { templateUrl: "angular/partial/state1.html" }
      }
    })
    .state('route1', {
      url: "/route1",
      views: {
        "viewA": { templateUrl: "angular/partial/state2.html" },
        "viewC": { template: "angular/partial/state1.html" }
      }
    })
    .state('route2', {
      url: "/route2",
      views: {
        "viewA": { template: "route2.viewA" },
        "viewB": { template: "route2.viewB" }
      }
    })
});