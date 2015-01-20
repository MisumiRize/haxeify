var spawn = require('child_process').spawn;
var through = require('through2');
var fs = require('fs');
var path = require('path');
var haxeRe = /\.hx$/i;

function isHaxe(file) {
    return haxeRe.test(file);
}

function haxeToJs(file) {
    return file.replace(haxeRe, '.js');
}

function haxeToClass(file) {
    return path.basename(file.replace(haxeRe, ''));
}

function haxeify(file, options) {
    var cmd, args;

    if (!isHaxe(file)) {
        return through();
    }

    options = options || {};
    cmd = options.haxe || 'haxe';
    args = [haxeToClass(file), '-js', haxeToJs(file)];

    if (typeof options.hxml == 'string') {
        args.unshift(options.hxml);
    }

    if (typeof options.lib == 'string') {
        args.push('-lib', options.lib);
    } else if (Array.isArray(options.lib)) {
        args = options.lib.reduce(function(prev, lib) { return prev.concat(['-lib', lib]); }, args);
    }

    if (typeof options.dce == 'string') {
        args.push('-dce', options.dce);
    }

    console.log(args);

    return through(function(_, __, next) {
        var that = this;
        var stderr = '';
        var process = spawn(cmd, args);

        process.stderr.on('data', function (buf) {
            stderr += buf;
        });

        process.on('close', function (code) {
            if (code !== 0) {
                that.emit('error', stderr);
            }

            fs.readFile(haxeToJs(file), function(err, data) {
                if (err) {
                    that.emit('error', err);
                }

                that.push(data);
                next();
            });
        });
    });
}

module.exports = haxeify;
