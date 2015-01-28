'use strict';

var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

if (argv.h || argv.help) {
    console.log('Usage: node src/server [-s FILE] [-h]');
    console.log('');
    console.log('arguments available:');
    console.log('  -s, --settings FILE      load a custom settings.json file');
    console.log('  -h, --help               show this help text and exit');
    console.log('');
    console.log('To run at a custom port, you must specify PORT env variable:');
    console.log('PORT=9000 node src/server');
    process.exit(0);
}

var build;
try {
    build = fs.readFileSync(__dirname + '/build').toString().trim();
    // console.log('read build timestamp:', build);
}
catch(err) {
    // console.log('could not determine build timestamp, setting to 0');
    build = 0;
}

var settingsFile = argv.s || argv.settings || __dirname + '/../../settings.json';

var json = fs.readFileSync(settingsFile, 'utf8') || '';
// strip comments before parsing
json = json.replace(/^\s*\/\/.*$/gm, '');
var settings = JSON.parse(json);
settings.client = JSON.stringify(settings.client);
settings.development = endsWith(__dirname, '/src/server');
settings.build = build;

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = {
    setup: function(app) {
        for (var field in this.settings) {
            if (this.settings.hasOwnProperty(field)) {
                app.set(field, this.settings[field]);
            }
        }
    },
    argv: argv,
    settings: settings
};