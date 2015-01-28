define(['core/obj', 'window', 'core/assert'], function(obj, window, assert) {
    'use strict';

    var HTTP = /^http:\/\//,
        HTTPS = /^http:\/\//;

    var exports = {
        get: function(url, getParams) {
            if (typeof url !== 'string') throw new Error('Invalid url ' + url);
            if (!getParams) return url;

            var index = 0;
            var getArgs = '';
            obj.each(getParams, function(value, property) {
                // skip functions
                if (typeof value === 'function') return;

                if (index > 0) getArgs += '&';
                getArgs += window.encodeURIComponent(property) + '=' +
                    window.encodeURIComponent(value);
                index++;
            });
            return getArgs ? url + '?' + getArgs : url;
        },
        getWithContext: function(url, getParams) {
            var ctx = window.document.getElementById('settings-context');
            assert.isInstanceOf(ctx, HTMLInputElement, 'no ctx input element');
            if (HTTP.test(url) || HTTPS.test(url)) return url;
            return this.get(ctx.value + url, getParams);
        },
        redirect: function(url, getParams) {
            url = this.getWithContext(url, getParams);
            window.location.href = url;
        }
    };

    return exports;

});