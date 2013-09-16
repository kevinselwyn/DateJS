#DateJS

DateJS is a Javascript port of the native date() function in PHP

##Usage

Include the following in the `<head>` of your document:

```html
<script type="text/javascript" src="dist/DateJS.min.js"></script>
```

To initialize, create a new instance of the DateJS object:

```js
var d = new DateJS();
```

To format the current date, pass a format string into the `.date()` function according to the format characters of the `date()` function in [PHP](http://php.net/manual/en/function.date.php).

```js
console.log(d.date("F j, Y"));
// Will yield: January 1, 2013
```

Additionally, you can include a Unix timestamp as an additional variable to set the exact date that you would like to format:

```js
console.log(d.date("F j, Y", 315550800));
// Will yield: January 1, 1980
```

##Compatibility

This plugin works on all modern browsers. IE8+