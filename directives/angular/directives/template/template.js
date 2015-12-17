'use strict';
angular.module('myAppModule').directive('radumtaHeader',function()
{
	return {
        templateUrl:'angular/directives/header/header.html',
        restrict: 'E',
        replace: true,
	}
});