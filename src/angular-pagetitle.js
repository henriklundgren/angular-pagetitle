'use strict';

/**
 * @author:   Henrik Lundgren
 * @date:     2013-11-19
 * @desc:     https://github.com/henriklundgren/angular-pagetitle
 */

angular.module('vhTitle', [])

  .filter('vhCapitalizeTitle', function () {
    return function (input) {
      /**
       * Capitalize function
       * http://stackoverflow.com/a/3291856
       */
      if ( angular.isDefined(input) ) {
        return input.charAt(0).toUpperCase() + input.slice(1);
      } else {
        return;
      }
    }
  })

  /**
   * Headlines
   */
  .directive('vhHeading', ['$rootScope', '$log', function($rootScope, $log) {
    return {
      template: '{{vhTitle}}',
      replace: false,
      scope: {},
      link: function postLink(scope, element, attrs) {
        
        // Get title
        $rootScope.$on('$routeChangeStart', function (ev, next, current) {
          /**
           * Title
           * Set titles or declare to use dynamic names on your route.
           *
           **********************************************************/
          var useRouteParameter = next.$$route.useRouteParamTitle; // true or name of route param

          // Dynamic route param title
          if ( angular.isDefined(useRouteParameter) ) {

            // If boolean value
            if ( typeof useRouteParameter === 'boolean' ) {
              var arr = Object.keys(next.params);
              var tailOfArray = arr.slice(-1).pop();
              scope.vhTitle = next.params[tailOfArray];

            } else {
              scope.vhTitle = next.params[useRouteParameter];
            }

          }

          // Static title
          else if ( angular.isDefined(next.title) ) {
            scope.vhTitle = next.title;
          } else {
            $log.debug('This route has NO title declared.');
            scope.vhTitle = null;
          }
          
        });
      }
    }
  }])

  /**
   * Angular directive to update the 
   * html title tag.
   */
  .directive('vhPageTitle', ['$rootScope', '$log', function($rootScope, $log) {

    var tmpl = '<title data-ng-bind-template="{{vhPrefix}} {{vhTitle | vhCapitalizeTitle}} {{vhSuffix}}"></title>';

    var directiveDefinitionObject = {

      template: tmpl,
      replace: true,
      scope: {
        suffix: '@suffix',
        prefix: '@prefix'
      },
      //scope: false, // Dont isolate the scope, the alternative is to broadcast the title on the rootScope.
      link: function postLink(scope, elem, attrs) {

        // Watch for route change and update route title.
        $rootScope.$on('$routeChangeStart', function (ev, next, current) {

          /**
           * Affixes
           * Set default affix on element or custom affix on route.
           *
           ********************************************************/
          var customSuffix        = next.$$route.customSuffix;
          var customPrefix        = next.$$route.customPrefix;

          if ( angular.isDefined(customPrefix) ) {
            scope.vhPrefix = customPrefix + ' - ' || null;
          } 
          
          else if ( angular.isDefined(customSuffix) ) {
            scope.vhSuffix = ' - ' + customSuffix || null;
          }

          else if ( angular.isDefined(scope.prefix) ) {
            scope.vhPrefix = scope.prefix + ' - ' || null;
          }

          else if ( angular.isDefined(scope.suffix) ) {
            scope.vhSuffix = ' - ' + scope.suffix || null;
          }

          else {
            return;
          }

          /**
           * Title
           * Set titles or declare to use dynamic names on your route.
           *
           **********************************************************/
          var useRouteParameter = next.$$route.useRouteParamTitle; // true or name of route param

          // Dynamic route param title
          if ( angular.isDefined(useRouteParameter) ) {

            // If boolean value
            if ( typeof useRouteParameter === 'boolean' ) {
              var arr = Object.keys(next.params);
              var tailOfArray = arr.slice(-1).pop();
              scope.vhTitle = next.params[tailOfArray];

            } else {
              scope.vhTitle = next.params[useRouteParameter];
            }

          }

          // Static title
          else if ( angular.isDefined(next.title) ) {
            scope.vhTitle = next.title;
          } else {
            $log.debug('This route has NO title declared.');
            scope.vhTitle = null;
          }
        });
      }
    }

    return directiveDefinitionObject;
  }]);

