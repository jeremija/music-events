/*jslint node: true */
'use strict';

var fs = require('fs');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = function listFiles(path, extension) {
    console.log('scanning folder: ' + __dirname + '/' + path);

    var dirs = [__dirname + '/' + path];
    var files = [];

    var currentPath;

    function iterate(item, index) {
        var filename = currentPath + '/' + item;

        var stat = fs.statSync(filename);
        if (stat.isDirectory()) {
            // console.log('found directory: ' + filename);
            dirs.push(filename);
            return;
        }
        if (endsWith(item, extension)) {
            // console.log('adding file: ' + filename);
            files.push(filename);
            return;
        }
        // console.log('ignoring resource: ' + filename);
    }

    while(dirs.length) {
        var dir = dirs.shift();
        currentPath = dir;

        var list = fs.readdirSync(dir);
        list.forEach(iterate);
    }

    return files;
};