/*jslint node: true */
'use strict';

var path = require('path');

global.expect = require('expect.js');
global.request = require('supertest');

var source = global.source = function(name) {
	return require(path.normalize(__dirname + '/../../src/server/' + name));
};

var listFiles = require('../listFiles.js');

var files = listFiles('server', '-test.js');

console.log('starting test/server unit test suite');

var config = source('config.js');
config.settings.logLevel = 'off';

global.ctx = source('index.js');

after(function() {
	ctx.server.close();
});

it('global context should be initialized', function() {
	expect(ctx).to.have.keys('app', 'server');
});

files.forEach(function(file) {
	require(file);
});