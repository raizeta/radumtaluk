
var app = angular.module('MobileAngularUiExamples', 
  ['ngRoute','mobile-angular-ui','mobile-angular-ui.gestures']);


app.run(function($transform) {window.$transform = $transform;});

