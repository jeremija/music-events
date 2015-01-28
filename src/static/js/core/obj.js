/**
 * Contains helper functions for manipulating JavaScript objects
 * @module core/obj
 */
define([], function() {
    'use strict';

    /**
     * @callback module:core/obj~eachCallback
     * @param {Object|Function} value value of field
     * @param {String|Number} field object's property
     */

    var exports = {
        /**
         * Iterates through object's own properties. Works on arrays too.
         * @param  {Object}   object object to iterate through
         * @param  {module:core/obj~eachCallback} callback to call for each
         * found property
         */
        each: function(object, callback, context) {
            if (!object) return;

            for (var property in object) {
                // convert to number if a string with number
                property = isNaN(property) ? property : +property;
                if (object.hasOwnProperty(property)) {
                    var retVal;
                    retVal = callback.call(context, object[property], property);
                    if (retVal) break;
                }
            }
        },
        /**
         * Finds the number of object's own properties
         * @param  {Object} object
         * @return {Number} number of object's own properties
         */
        size: function(object) {
            var count = 0;
            this.each(object, function(value, key) {
                count++;
            });
            return count;
        },
        /**
         * Creates a shallow copy of object's properties
         * @param  {Object} dest
         * @param  {Object} src
         * @return {Object} dest
         */
        copy: function(dest, src) {
            if (!src || typeof dest !== 'object') return;

            this.each(src, function(value, field) {
                dest[field] = value;
            });

            return dest;
        },
        /**
         * Creates a new object, sets it's prototype and copies all properties
         * from the properties object to the new object.
         * @param  {Object} properties instance properties for new object
         * @param  {Object} prototype prototype object for new object
         * @return {Object} newly created object
         */
        create: function(properties, prototype) {
            if (!prototype) throw new Error('prototype must be defined');

            // create a newObject which has the prototype object set as
            // prototype
            var newObject = Object.create(prototype);

            // copy properties from properties to new object
            this.copy(newObject, properties);

            return newObject;
        },
        isArray: function(object) {
            return Object.prototype.toString.call(object) === '[object Array]';
        },
        read: function(object, property) {
            if (!object) throw new Error('object must be defined');
            if (!property) throw new Error('property must be defined');
            if (typeof property !== 'string')
                throw new Error('property must be a string');
            var value = object,
                props = property.split('.');
            props.forEach(function(prop) {
                value = value[prop];
            });
            return value;
        }
    };

    return exports;

});