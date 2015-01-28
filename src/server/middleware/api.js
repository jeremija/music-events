'use strict';

var ctx = require('../context.js');
var app = ctx.app;
var Q = require('q');
var lastfm = require('../services/lastfm.js');
var geoip = require('../services/geoip.js');

var NodeCache = require('node-cache');
var lastfmCache = new NodeCache({ stdTTL: 60 * 30 }); // 30 mins
var ipCache = new NodeCache({ stdTTL: 60 * 30 }); // 30 mins

function callLastfmMethod(method, query, res) {
    var cacheKey = method + JSON.stringify(query);
    var data = lastfmCache.get(cacheKey)[cacheKey];
    if (data) {
        ctx.log.trace('using lastfm value from cache');
        res.json(data);
        return;
    }

    ctx.log.trace('calling lastfm method:', method, 'with query:', query);
    lastfm.get(method, query).then(function(data) {
        ctx.log.trace('got response from lastfm');
        lastfmCache.set(cacheKey, data);
        res.json(data);
    }).catch(function(error) {
        ctx.log.error('lastfm call resulted in error:', error.message);
    }).done();
}

function obtainLocation(req) {
    ctx.log.trace('attempting to obtain location...');
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    var location = ipCache.get(ip)[ip];
    if (location) {
        ctx.log.trace('using ip location from cache');
        var deferred = Q.defer();
        deferred.resolve(location);
        return deferred.promise;
    }

    return geoip.obtainLocation(ip).then(function(location) {
        ctx.log.trace('obtained location:', location);
        return location;
    });
}

app.get('/api/lastfm/:method', function(req, res) {
    callLastfmMethod(req.params.method, req.query, res);
});

app.get('/api/events', function(req, res) {
    var promise;
    if (req.query.location && req.query.location[0] !== '(' ||
        req.query.lat && req.query.long)
    {
        callLastfmMethod('geo.getEvents', req.query, res);
        return;
    }
    obtainLocation(req).then(function(location) {
        if (location.city) req.query.location = location.city;
        else delete req.query.location;
        req.query.lat = location.lat;
        req.query.long = location.lng;
        callLastfmMethod('geo.getEvents', req.query, res);
    });
});

