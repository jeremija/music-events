/**
 * @module core/json
 */
define([], function() {
    'use strict';

    var exports = {
        /**
         * Attempts to parse the json. It will return the input parameter if
         * it fails.
         * @param  {String} json
         * @return {Object|String} parsed JSON or input parameter if fails to
         * parse
         */
        parse: function(json) {
            try {
                return JSON.parse(json);
            }
            catch(e) {
                return json;
            }
        },
        /**
         * Converts the object to JSON
         * @param  {Object} object to stringify
         * @return {String}
         */
        stringify: function(object) {
            return JSON.stringify(object);
        }
    };

    return exports;

});