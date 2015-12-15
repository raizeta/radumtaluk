
myApp.config(function($stateProvider) {
  $stateProvider
    .state('index', {
      url: "",
      views: 
      {
        "viewA": { templateUrl: "angular/partial/login.html" }
      }
    })
    .state('home', {
      url: "/erp",
      views: {
        "viewA": { templateUrl: "angular/partial/headtemplate.html" },
        "viewC": { templateUrl: "angular/partial/footemplate.html" },
        "viewD": { templateUrl: "angular/partial/home/content.html" }
        
      }
    })
    .state('chart', {
      url: "/erp/chart",
      views: {
        "viewA": { templateUrl: "angular/partial/headtemplate.html" },
        "viewC": { templateUrl: "angular/partial/footemplate.html" },
        "viewD": { templateUrl: "angular/partial/chart/chart.html" }
        
      }
    })
});