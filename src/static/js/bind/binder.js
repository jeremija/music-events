define(['ko'], function(ko) {
    'use strict';

    var exports = {
        observable: function() {
            return ko.observable.apply(ko, arguments);
        },
        observableArray: function() {
            return ko.observableArray.apply(ko, arguments);
        },
        isObservable: function(value) {
            return ko.isObservable(value);
        },
        apply: function() {
            // var element = arguments[1],
                // info = element ? ' on element ' + element.id : '';
            return ko.applyBindings.apply(ko, arguments);
        },
        computed: function(fcn, context) {
            return ko.computed(fcn, context);
        },
        unwrapObservable: function(observable) {
            return ko.utils.unwrapObservable(observable);
        },
        assertObservable: function(object, name) {
            var message = 'Expected object \'' + name + '\' to be an observable';
            if (!this.isObservable(object)) throw new Error(message);
        }
    };

    return exports;

});