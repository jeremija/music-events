/*jslint node: true */
'use strict';

var settings = source('config.js').settings;

describe('templating-test.js', function() {

	it('GET /index.html', function(done) {

		request(ctx.app)
            .get('/index.html').send()
			.expect(/<!DOCTYPE html>/)
			.expect(200, done);

	});
});