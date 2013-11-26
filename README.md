# angular-pagetitle
Angular directive for HTML title tag.


## Installation
Angular route is a dependency.

### Bower
Manually.

### Manual

* Download projectfile - angular-pagetitle.js.
* Add to your HTML index file:

```html
<script src="angular-pagetitle.js"></script>
```

## Usage
Add the directive to your title tag.

```html
<title vh-page-title></title>
```

Add module to your project.

```html
angular.module('yourApp', ['vhTitle']);
```

Give your routes titles.

```html
.when('/', {
  title: 'AngularJS'
})
```

### Affixes
You can add affixes to your title.
* Default suffix:

```html
<title vh-page-title suffix="This shows on all your pages after your main title"></title> // Or prefix for prefixes
```

Output for above with the previous route title would be:
**AngularJS - This shows on all your pages after your main title**
* Custom suffix:

```html
.when('/', {
  title: 'AngularJS',
  customSuffix: 'This text only visible on this route' // Or customPrefix for prefixes
})
```


### Dynamic titles
Titles based on route variables.

```html
when('/:name', {
  useRouteParamTitle: true, // or // string value 'routeParam'
})
```

If you specify boolean value it will pick the final/last parameter.

### Heading tag
To add heading tag use:

```html
<h1 vh-heading></h1>
```

## License
Public Domain - Do what you want.
