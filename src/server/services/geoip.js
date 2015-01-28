'use strict';

var request = require('request');
var util = require('./util.js');
var Q = require('q');
var url = 'https://www.telize.com/geoip/';

function obtainLocation(ip) {
    var deferred = Q.defer();
    request({
        method: 'GET',
        url: url + ip,
    }, function(error, response, body) {
        util.parseJson(body, deferred);
    });
    return deferred.promise;
}

module.exports.obtainLocation = function(ip) {
    return obtainLocation(ip).then(function(location) {
        return {
            lat: location.latitude,
            lng: location.longitude,
            city: location.city,
            country: location.country
        };
    });
};

//req.headers['x-forwarded-for'] || req.connection.remoteAddress;