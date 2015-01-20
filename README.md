# haxeify

[Browserify](http://browserify.org/) transform to compile [Haxe](http://haxe.org/).

## Installation

With [npm](https://npmjs.org/):

```sh
$ npm install haxeify --save-dev
```

## Usage

foo.js:

```javascript
var bar = require('./Bar.hx');
console.log(bar.Bar.baz());  // => 'qux'
```

Bar.hx:

```haxe
package ;

class Bar {

	@:expose
	static public function baz():String {
		return 'qux';
	}
}
```

To compile:

```sh
$ browserify -t haxeify foo.js > bundle.js
```

You can use haxelib by giving `--lib` options:

```sh
$ browserify -t [ haxeify --lib foo --lib bar --lib baz ] qux.js > bundle.js
```
