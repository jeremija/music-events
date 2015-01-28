define(['Squire'], function(Squire) {
    'use strict';

    var injector = new Squire();

    var koMock = {
        _observableCallCount: 0,
        _observableArrayCallCount: 0,
        _applyBindingsCallCount: 0,
        _computedCallCount: 0,
        _computedCallback: undefined,
        observable: function() {
            this._observableCallCount++;
            return 'ret val observable';
        },
        observableArray: function() {
            this._observableArrayCallCount++;
            return 'ret val observable array';
        },
        applyBindings: function() {
            this._applyBindingsCallCount++;
            return 'ret val apply bindings';
        },
        computed: function(callback) {
            this._computedCallCount++;
            this._computedCallback = callback;
            return 'ret val computed';
        },
        utils: {
            _unwrapCallCount: 0,
            _unwrapParam: undefined,
            unwrapObservable: function(param) {
                this._unwrapCallCount++;
                this._unwrapParam = param;
                return 'ret val unwrap';
            }
        }
    };

    injector.mock({
        ko: koMock
    });

    injector.require(['bind/binder'], function(binder) {
        describe('test/js/bind/binder-test.js', function() {
            it('should be an object', function() {
                expect(binder).to.be.an('object');
            });
            describe('observable()', function() {
                it('should call knockout\'s observable', function() {
                    var retVal = binder.observable();
                    expect(koMock._observableCallCount).to.be(1);
                    expect(retVal).to.be('ret val observable');
                });
            });
            describe('observableArray()', function() {
                it('should call knockout\'s observableArray', function() {
                    var retVal = binder.observableArray();
                    expect(koMock._observableArrayCallCount).to.be(1);
                    expect(retVal).to.be('ret val observable array');
                });
            });
            describe('apply()', function() {
                it('should call knockout\'s applyBindings', function() {
                    var retVal = binder.apply();
                    expect(koMock._applyBindingsCallCount).to.be(1);
                    expect(retVal).to.be('ret val apply bindings');
                });
            });
            describe('computed()', function() {
                it('should call knockout\'s computed', function() {
                    function cb() {}
                    var retVal = binder.computed(cb);
                    expect(koMock._computedCallCount).to.be(1);
                    expect(koMock._computedCallback).to.be(cb);
                    expect(retVal).to.be('ret val computed');
                });
            });
            describe('unwrapObservable()', function() {
                it('should call knockout utils.unwrapObservable', function() {
                    var observable = {};
                    var retVal = binder.unwrapObservable(observable);
                    expect(koMock.utils._unwrapCallCount).to.be(1);
                    expect(koMock.utils._unwrapParam).to.be(observable);
                    expect(retVal).to.be('ret val unwrap');
                });
            });
        });
    });

});