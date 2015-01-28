/**
 * AMD module which wraps window.console, keeps the original line numbers, and
 * stubs the methods for older browsers which do not have window.console.log
 * method, or no Function.prototype.bind method defined.
 * @module log
 */
define(['window', 'config'], function(window, config) {
    'use strict';

    var dummy = {
        d: function() {},
        w: function() {},
        e: function() {}
    };

    if (!config.logEnabled || window.mochaPhantomJS) return dummy;
    if (typeof window.Function.prototype.bind !== 'function') return dummy;
    if (!window.console || typeof window.console.log !== 'function')
        return dummy;

    var exports = {
        /**
         * Forwards the call to console.log
         * @function
         */
        d: window.console.log.bind(window.console),
        /**
         * Forwards the call to console.warn
         * @function
         */
        w: window.console.warn.bind(window.console),
        /**
         * Forwards the call to console.error
         * @function
         */
        e: window.console.error.bind(window.console)
    };

    return exports;

});