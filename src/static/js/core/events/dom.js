/**
 * Makes it easier to manipulate with DOM events.
 * @module core/events/dom
 */
define(['window'], function(window) {
    'use strict';

    var exports = {
        /**
         * Creates new event instance which can be dispatched to a DOM element
         * @param  {String} type event tpye
         * @return {external:Event} new event instance
         */
        createEvent: function(type) {
            if (typeof window.Event === 'function') {
                return new window.Event(type);
            }
            var event = window.document.createEvent('Event');
            event.initEvent(type, true, true);
            return event;
        },
        stopPropagation: function(event) {
            if (event.stopPropagation) event.stopPropagation();
            if (event.preventDefault) event.preventDefault();
            event.cancelBubble = true;
            return false;
        }

    };

    return exports;

});