'use strict';
var lastfm = source('services/lastfm.js');
var config = source('config.js');
var apiKey = config.settings.lastfm.apiKey;
var nock = require('nock');

describe('services/lastfm-test.js', function() {

    var mock = '{"events": {"event": [{}],"@attr": {"location": "Madrid, Spain","page": "1","perPage": "10","totalPages": "19","total": "188","festivalsonly": "0","tag": ""}}}';

    describe('get()', function() {
        before(function() {
            nock('https://ws.audioscrobbler.com')
            .get('/2.0/?method=geo.getevents&api_key=' + apiKey +
                '&format=json&location=amsterdam')
                .reply(200, mock);
        });
        after(function() {
            nock.cleanAll();
        });
        it('should connect to lastfm and obtain json data', function(done) {
            lastfm.get('geo.getevents', {
                location: 'amsterdam'
            }).then(function(data) {
                expect(data).to.be.ok();
                expect(data).to.have.property('events');
                expect(data.events).to.have.property('event');
                expect(data.events.event).to.be.an('array');
                expect(data.events.event.length).to.be.greaterThan(0);
                done();
            }).done();
        });
    });

});