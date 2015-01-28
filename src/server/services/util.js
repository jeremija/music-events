'use strict';

module.exports.paramsToString = function(params) {
    var arr = [];
    for(var key in params) {
        if (!params.hasOwnProperty(key)) continue;
        var value = params[key];
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    return arr.join('&');
};

/**
 * Resolves deferred with a response json, or rejects it if it failed to parse
 * @param  {String} body
 * @param  {Deferred}} deferred
 */
module.exports.parseJson = function(body, deferred) {
    var result;
    try {
        result = JSON.parse(body);
    }
    catch(error) {
        deferred.reject(new Error('could not parse response'));
        return;
    }
    deferred.resolve(result);
};