define(['core/xhr/urlHelper', 'window'], function(urlHelper, window) {
    'use strict';

    function parse() {
        var queryString = window.location.search || '',
            args = {};
        queryString.substring(1).split('&').forEach(function(pair) {
            pair = pair.split('=');
            if (!pair[0]) return;
            var key = window.decodeURIComponent(pair[0]),
                value = pair[1] ? window.decodeURIComponent(pair[1]) : null;
            args[key] = value;
        });
        exports.parsed = args;
        return args;
    }

    var exports = {
        format: function(url, getParams) {
            return urlHelper.get(url, getParams);
        },
        formatWithContext: function(url, getParams) {
            return urlHelper.getWithContext(url, getParams);
        },
        /**
         * Parses the GET query string and returns an object-map containg all
         * of the key-value pairs present in the GET request. Note that this
         * function will always use the last found query parameter name if
         * there were multiple parameters with the same key.
         *
         * This method always returns an object.
         * @return {Object} map of decoded GET key-value pairs
         */
        parse: parse,
    };

    exports.parsed = parse();

    return exports;

});