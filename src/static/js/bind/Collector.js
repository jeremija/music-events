define(['bind/binder', 'core/assert'],
    function(binder, assert)
{
    'use strict';

    function Collector(disposables, observable) {
        assert.isArray(disposables, 'disposables should be an array');
        if (observable) {
            assert.isObservable(observable,
                'observable must be an observable if defined');
        }
        this._disposables = disposables;
        this._observable = observable;
    }

    Collector.prototype.computed = function(callback, context) {
        assert.isFunction(callback);

        var computed = binder.computed(callback, context);
        this._disposables.push(computed);
        return computed;
    };

    Collector.prototype.subscribe = function(callback, context, type) {
        var observable = this._observable;
        assert.isObservable(observable);
        assert.isFunction(callback);

        var subscription = observable.subscribe.apply(observable, arguments);
        this._disposables.push(subscription);
        return subscription;
    };

    return Collector;

});