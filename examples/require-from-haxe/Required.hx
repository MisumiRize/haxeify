package ;

import events.EventEmitter;

class Required {

	@:expose
	static public function foo() {
		var c = new Emitter();
		c.on('bar', function(_:Dynamic) {
			Another.baz();
		});
		c.emit('bar');
	}
}

class Emitter extends EventEmitter {
	public function new() { }
}

@:jsRequire('./another')
extern class Another {
	static function baz():Void;
}
