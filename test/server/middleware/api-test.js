'use strict';
var app = source('context.js').app;
var Q = require('q');
var lastfm = source('services/lastfm.js');
var geoip = source('services/geoip.js');

describe('middleware/api-test.js', function() {

	describe('GET /api/events without location', function() {
        var getOld = lastfm.get;
        var obtainLocationOld = geoip.obtainLocation;
		before(function() {
            lastfm.get = function(method, params) {
                expect(method).to.be('geo.getEvents');
                expect(params).to.have.keys('location', 'lat', 'long');
                expect(params.location).to.be('Amsterdam');
                expect(params.lat).to.be(4.9);
                expect(params.long).to.be(52.3667);
                var deferred = Q.defer();
                deferred.resolve([{name: 'event1'}]);
                return deferred.promise;
            };
            geoip.obtainLocation = function(ip) {
                expect(ip).to.be('192.168.0.10');
                var deferred = Q.defer();
                deferred.resolve({
                    lat: 4.9,
                    lng: 52.3667,
                    city: 'Amsterdam',
                    country: 'Netherlands'
                });
                return deferred.promise;
            };
		});
        after(function() {
            lastfm.get = getOld;
            geoip.obtainLocation = obtainLocationOld;
        });
		it('should forward request to api', function(done) {
			request(app).get('/api/events')
                .set('x-forwarded-for', '192.168.0.10')
				.expect(200).expect(/event1/, done);
		});
	});

    describe('GET /api/events with location', function() {
        var getOld = lastfm.get;
        var obtainLocationOld = geoip.obtainLocation;
        before(function() {
            lastfm.get = function(method, params) {
                expect(method).to.be('geo.getEvents');
                expect(params).to.have.keys('location');
                expect(params.location).to.be('Amsterdam');
                var deferred = Q.defer();
                deferred.resolve([{name: 'event1'}]);
                return deferred.promise;
            };
            geoip.obtainLocation = function(ip) {
                throw new Error('should not get here');
            };
        });
        after(function() {
            lastfm.get = getOld;
            geoip.obtainLocation = obtainLocationOld;
        });
        it('should forward request to api', function(done) {
            request(app).get('/api/events?location=Amsterdam')
                .set('x-forwarded-for', '192.168.0.10')
                .expect(200).expect(/event1/, done);
        });
        it('should read values from cache', function(done) {
            lastfm.get = function(method, params) {
                throw new Error('should not get here');
            };
            geoip.obtainLocation = function(ip) {
                throw new Error('should not get here');
            };

            request(app).get('/api/events?location=Amsterdam')
                .set('x-forwarded-for', '192.168.0.10')
                .expect(200).expect(/event1/, done);
        });
    });

});