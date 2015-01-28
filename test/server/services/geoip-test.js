'use strict';

var geoip = source('services/geoip.js');
var nock = require('nock');

describe('services/geoip-test.js', function() {

    var mock = '{"longitude":-122.0838,"latitude":37.386,"asn":"AS15169","offset":"-7","ip":"8.8.8.8","area_code":"0","continent_code":"NA","dma_code":"0","city":"Mountain View","timezone":"America\/Los_Angeles","region":"California","country_code":"US","isp":"Google Inc.","postal_code":"94035","country":"United States","country_code3":"USA","region_code":"CA"}';

    describe('obtaionLocation', function() {
        before(function() {
            nock('https://www.telize.com').get('/geoip/8.8.8.8')
                .reply(200, mock);
        });
        after(function() {
            nock.cleanAll();
        });
        it('should obtain geoip location', function(done) {
            geoip.obtainLocation('8.8.8.8').then(function(info) {
                expect(info).to.be.ok();
                expect(info).to.only.have.keys('lat', 'lng', 'country', 'city');
                expect(info.lat).to.be.a('number');
                expect(info.lng).to.be.a('number');
                expect(info.country).to.be('United States');
                expect(info.city).to.be('Mountain View');
                done();
            }).done();
        });
    });

});