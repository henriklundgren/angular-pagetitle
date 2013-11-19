# angular-pageTitle
Angular directive for HTML title tag.


## Installation
This project depends on having routes. Hence you have to use angular-route.

### Bower
Coming soon.

### Manual

* Download projectfile - 'angular-pagetitle.js'.
* Add projectfile to your HTML index file:
  <script src="angular-pagetitle.js"></script>

## Usage
Add the directive to your title tag.
  <title vh-page-title></title>

Add module to your project.
  angular.module('yourApp', ['vhTitle']);

Give your routes titles.
  .when('/', {
    title: 'AngularJS'
  })

### Affixes
You can add affixes to your title.
* Default suffix:
  <title vh-page-title *suffix="This shows on all your pages after your main title"*></title>
Output for above with the previous route title would be:
*AngularJS - This shows on all your pages after your main title*
* Custom suffix:
  .when('/', {
    title: 'AngularJS',
    customSuffix: 'This text only visible on this route'
  })

To use prefixes instead, swap the text where appropriate.

### Dynamic titles
Titles based on route variables.
  when('/:name', {
    useRouteParamTitle: true,
    routeParamTitle: 'name'
  })

If you exclude routeParamTitle variable it will pick the last route parameter.

### Global scope variables
Add/bind vhTitle to HTML tag to show the current title in your template.
  <h1 ng-bind="vhTitle"></h1>
Or...
  <h1>{{vhTitle}}</h1>

## License
Do what you want.

