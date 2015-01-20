var browserify = require('browserify');
var test = require('tap').test;
var haxeify = ('./');

test('bundled with .hx file', function(t) {
    t.plan(2);

    browserify()
        .add(__dirname + '/fixture/TestBundle.hx')
        .transform(haxeify)
        .bundle(function(err, src) {
            t.ok(err == null, 'error should be null');
            t.ok(/TestBundle\.foo = function()/.test(String(src)), 'src has exported function');
        });
});
