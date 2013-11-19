'use strict';

angular.module('vhTitle', [])

  /**
   * Angular directive to update the 
   * html title tag.
   * See Github for info.
   */
  .directive('vhPageTitle', ['$rootScope', '$log', function($rootScope, $log) {

    var directiveDefinitionObject = {
      template: '<title data-ng-bind-template="{{vhPrefix}} {{vhTitle}} {{vhSuffix}}"></title>',
      replace: true,
      scope: false, // Dont isolate the scope, the alternative is to broadcast it on the rootScope.
      controller: function ($scope) {
      
        /**
         * Capitalize function
         * http://stackoverflow.com/a/3291856
         */
        String.prototype.capitalize = function() {
          return this.charAt(0).toUpperCase() + this.slice(1);
        };

      },
      link: function postLink(scope, elem, attrs) {

        // Watch for route change and update route title.
        $rootScope.$on('$routeChangeSuccess', function (ev, current, prev) {

          var firstPageSuffix     = current.$$route.customSuffix;
          var firstPagePrefix     = current.$$route.customPrefix;

          // Path has custom affix.
          if ( angular.isDefined(firstPageSuffix) ) {
            scope.vhPrefix    = null;
            scope.vhSuffix    = ' - ' + firstPageSuffix;
          }
          else if ( angular.isDefined(firstPagePrefix) ) {
            scope.vhSuffix    = null;
            scope.vhPrefix    = firstPagePrefix + ' - ';
          }
          else {

            var defaultSuffix   = attrs.suffix;
            var defaultPrefix   = attrs.prefix;

            if ( angular.isDefined(defaultSuffix) ) {
              scope.vhPrefix    = null;
              scope.vhSuffix    = ' - ' + defaultSuffix;
            }
            else if ( angular.isDefined(defaultPrefix) ) {
              scope.vhSuffix    = null;
              scope.vhPrefix    = defaultPrefix + ' - ';
            }
          }

          // If the title should be the route parameter.
          if ( current.$$route.useRouteParamTitle ) {

            // Which route parameter to use.
            var routeName   = current.routeParamTitle;
            var routeArray  = Object.keys(current.params);
            if ( angular.isDefined(routeName) && routeArray ) {

              // Capitalize title for proper display
              scope.vhTitle = current.params[routeName].capitalize();
            }
            // No route parameter to use declared.
            else {

              // Use the last parameter on the route as title.
              var tailRouteParameter = routeArray.slice(-1).pop();
              scope.vhTitle = current.params[tailRouteParameter].capitalize();
            }
          }
          else if ( angular.isDefined(current.title) ) {
            scope.vhTitle = current.title;
          } else {
            $log.debug('This route has NO title declared.');
            scope.vhTitle = null;
          }
        });
      }
    }

    return directiveDefinitionObject;
  }]);

