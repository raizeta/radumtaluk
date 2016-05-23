'use strict';
myAppModule.directive("offCanvasMenu", function () {
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, element) {
            scope.isMenuOpen = false;
            scope.toggleMenu = function () {
                scope.isMenuOpen = !scope.isMenuOpen;
            };
        }
    };
});

myAppModule.directive('compile', function($compile) {
// directive factory creates a link function
return function(scope, element, attrs) {
    scope.$watch(
        function(scope) {
             // watch the 'compile' expression for changes
            return scope.$eval(attrs.compile);
        },
        function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
        }
    );
};
});