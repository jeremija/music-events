define([], function() {
    'use strict';

    /**
     * @class handles information about event listener and it's callback
     * @name modules/EventListener
     * @private
     */
    function EventListener(name, callback, context) {
        this.name = name;
        this.callback = callback;
        this.context = context;
    }

    EventListener.prototype.invoke = function(/** variable arguments */) {
        this.callback.apply(this.context, arguments);
    };

    return EventListener;
});