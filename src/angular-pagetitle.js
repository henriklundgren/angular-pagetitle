'use strict';

/**
 * @author:   Henrik Lundgren
 * @date:     2013-11-19
 * @desc:     https://github.com/henriklundgren/angular-pagetitle
 */

angular.module('vhTitle', [])

  /**
   * Capitalize title filter
   * SEO friendly titles are capitalized,
   * unless not needed.
   */
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
  .directive('vhHeading', ['$rootScope', function($rootScope) {

    var directiveDefinitionObject = {
      template: '{{vhHeading}}',
      replace: false,
      scope: { heading: '@vhHeading' },
      controller: ['$scope', '$element', '$rootScope', '$log', function ($scope, $element, $rootScope, $log) {
 
        // Watch route change
        $rootScope.$on('$routeChangeStart', update);

        // Update title
        function update(ev, next, current) {
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
              $scope.vhHeading = next.params[tailOfArray];

            } else {
              $scope.vhHeading = next.params[useRouteParameter];
            }

          }

          // Static title
          else if ( angular.isDefined(next.title) ) {
            $scope.vhHeading = next.title;
            return 'henrik';
          } else if ( angular.isDefined($scope.heading) ) {
            $scope.vhHeading = $scope.heading;
          } else {
            $log.debug('This route has NO title or heading declared.');
            $scope.vhHeading = null;
          }
          
        };

      }],
      //link: function (scope, element, attrs, ctrl) {};
    };

    return directiveDefinitionObject;

  }])

  /**
   * Angular directive to update the 
   * html title tag.
   */
  .directive('vhPageTitle', [function() {

    var tmpl = '<title data-ng-bind-template="{{vhPrefix}} {{vhTitle | vhCapitalizeTitle}} {{vhSuffix}}"></title>';

    var directiveDefinitionObject = {

      template: tmpl,
      replace: true,
      scope: {
        suffix: '@suffix',
        prefix: '@prefix',
        title: '@vhPageTitle'
      },
      controller: ['$scope', '$element', '$rootScope', '$log', function ($scope, $element, $rootScope, $log) {

        // Watch route change.
        $rootScope.$on('$routeChangeStart', update);

        // Update title
        function update(ev, next, current) {

          // Affixes
          $scope.vhPrefix = next.$$route.customPrefix || $scope.prefix || null;
          $scope.vhSuffix = next.$$route.customSuffix || $scope.suffix || null;

          // Pagetitle
          var useRouteParameter = next.$$route.useRouteParamTitle; // true or name of route param

          // Dynamic route param title
          if ( angular.isDefined(useRouteParameter) ) {

            // If boolean value
            if ( typeof useRouteParameter === 'boolean' ) {
              var arr = Object.keys(next.params);
              var tailOfArray = arr.slice(-1).pop();
              $scope.vhTitle = next.params[tailOfArray];

            } else {
              $scope.vhTitle = next.params[useRouteParameter];
            }

          }

          // Static title
          else if ( angular.isDefined(next.title) ) {
            $scope.vhTitle = next.title;
          } else if ( angular.isDefined($scope.defaultTitle) ) {
            $scope.vhTitle = $scope.title;
          } else {
            $log.debug('This route has NO title declared.');
            $scope.vhTitle = null;
          }

        };

      }],
      //scope: false, // Dont isolate the scope, the alternative is to broadcast the title on the rootScope.
      //link: function (scope, elem, attrs) {}
    }

    return directiveDefinitionObject;
  }]);

