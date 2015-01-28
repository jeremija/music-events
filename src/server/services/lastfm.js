'use strict';

var ctx = require('../context.js');
var request = require('request');
var Q = require('q');
var config = require('../config.js');
var apiUrl = config.settings.lastfm.apiUrl;
var apiKey = config.settings.lastfm.apiKey;

function paramsToString(method, params) {
    var arr = [
        'method=' + encodeURIComponent(method),
        'api_key=' + encodeURIComponent(apiKey),
        'format=json'
    ];
    for(var key in params) {
        if (!params.hasOwnProperty(key)) continue;
        var value = params[key];
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    return '?' + arr.join('&');
}

function get(method, params) {
    var deferred = Q.defer();

    request({
        method: 'GET',
        uri: apiUrl + paramsToString(method, params)
    }, function(error, response, body) {
        if (error) {
            ctx.log.trace('got error: ', error.message);
            deferred.reject(error);
            return;
        }
        var result;
        try {
            ctx.log.trace('parsing json response');
            result = JSON.parse(body);
        }
        catch(error) {
            ctx.log.trace('could not parse json response');
            deferred.reject(new Error('could not parse response'));
            return;
        }
        ctx.log.trace('resolving promise');
        deferred.resolve(result);
    });

    return deferred.promise;
}

module.exports.get = get;
module.exports.geoGetEvents = function(params) {
    return get('geo.getEvents', params).then(function(data) {
        return data && data.events && data.event;
    });
};