define(['bind/Collector', 'ko'], function(Collector, ko) {
    'use strict';
    describe('test/js/bind/Collector-test.js', function() {

        describe('new Collector()', function() {
            it('should throw error when no array param', function() {
                expect(function() {
                    new Collector({});
                }).to.throwError(/disposables should be an array/);
            });
            it('should throw error when 2nd param not observable', function() {
                expect(function() {
                    new Collector([], {});
                }).to.throwError(/observable must be an observable if defined/);
            });
            it('should construct a new object', function() {
                var c = new Collector([]);
            });
        });

        var disposables, collector, context, observable, observableArray;
        function prepare() {
            context = {};
            disposables = [];
            observable = ko.observable();
            observableArray = ko.observableArray();
        }
        function cleanup() {
            disposables.forEach(function(disposable) {
                disposable.dispose();
            });
        }

        describe('computed()', function() {
            before(function() {
                prepare();
                collector = new Collector(disposables);
            });
            after(cleanup);
            var c;
            it('should create a new computed observable', function() {
                var a = ko.observable();

                c = collector.computed(function() {
                    this.b = 'b';
                    return a() + 1;
                }, context);

                a(1);
                expect(c()).to.be(2);
                expect(context.b).to.be('b');
            });
            it('should add computed observable to disposables', function() {
                expect(disposables[0]).to.be(c);
                expect(c.dispose).to.be.a('function');
            });
        });

        describe('subscribe()', function() {
            before(function() {
                prepare();
                collector = new Collector(disposables, observable);
            });
            after(cleanup);
            var subscription;
            it('should subscribe to observable', function() {
                subscription = collector.subscribe(function(value) {
                    context.b = value;
                }, context);

                observable(3);
                expect(context.b).to.be(3);
            });
            it('should add observable to disposables', function() {
                expect(disposables[0]).to.be(subscription);
                expect(subscription.dispose).to.be.a('function');
            });
        });

        describe('subscribe() with observableArray', function() {
            before(function() {
                prepare();
                collector = new Collector(disposables, observableArray);
            });
            after(cleanup);
            it('should subscribe to observableArray', function() {
                var subscription = collector.subscribe(function(changes) {
                    this.changes = changes;
                }, context, 'arrayChange');

                observableArray([1, 2]);
                expect(context.changes).to.be.an('array');
                expect(context.changes.length).to.be(2);

                expect(disposables[0]).to.be(subscription);
                expect(subscription.dispose).to.be.a('function');
            });
        });

    });

});