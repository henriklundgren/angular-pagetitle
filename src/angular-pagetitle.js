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
    /**
     * @private
     * @param [] Array to check
     * @returns 'str' Returns the tail value of the array
     */
    function arrayTail(arr) {
      return Object.keys(arr).slice(-1).pop();
    }

    var directiveDefinitionObject = {
      template: '{{vhHeading}}',
      replace: false,
      scope: { heading: '@vhHeading' },
      controller: ['$scope', '$element', '$rootScope', '$log', function ($scope, $element, $rootScope, $log) {
 
        // Watch route change
        $rootScope.$on('$routeChangeStart', update);

        // Update title
        function update(ev, next, current) {

          // Dynamic route title
          if ( angular.isDefined(next.$$route.useRouteParamTitle) ) {
            $scope.vhHeading = next.params[arrayTail(next.params)] || next.params[next.$$route.useRouteParamTitle] || null;
          }
          // Static route title
          else {
            $scope.vhHeading = next.title || $scope.heading || null;
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

    /**
     * @private
     * @param [] Array to check
     * @returns 'str' Returns the tail value of the array
     */
    function arrayTail(arr) {
      return Object.keys(arr).slice(-1).pop();
    }

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

          // Dynamic route title
          if ( angular.isDefined(next.$$route.useRouteParamTitle) ) {
            $scope.vhTitle = next.params[arrayTail(next.params)] || next.params[next.$$route.useRouteParamTitle] || null;
          }
          // Static route title
          else {
            $scope.vhTitle = next.title || $scope.title || null;
          }

        };
      }],
      //link: function (scope, elem, attrs) {}
    }

    return directiveDefinitionObject;
  }]);

