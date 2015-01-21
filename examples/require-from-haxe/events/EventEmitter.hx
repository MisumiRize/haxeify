package events;

@:jsRequire('events', 'EventEmitter')
extern class EventEmitter {
	function on(event:String, dn:Dynamic -> Void):Dynamic;
	function emit(event:String, ?arg:Dynamic):Void;
}
