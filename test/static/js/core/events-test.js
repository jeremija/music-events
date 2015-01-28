define(['core/events', 'core/obj'], function(events, obj) {
    'use strict';

    describe('test/js/core/events-test.js', function() {

        it('should be initialized', function() {
            expect(events).to.be.ok();

            expect(events.addListener).to.be.a('function');
            expect(events.addListeners).to.be.a('function');
            expect(events.dispatch).to.be.a('function');
        });

        function cleanup() {
            var listeners = events._getAllListeners();
            obj.each(listeners, function(value, property) {
                delete listeners[property];
            });
        }

        describe('addListener() and dispatch()', function() {
            var count = 0, args;
            function callback() {
                args = [].slice.call(arguments);
                count++;
            }
            beforeEach(function() {
                args = undefined;
                count = 0;
            });
            afterEach(cleanup);

            it('should invoke listener with dispatch()', function() {
                events.addListener('my event', callback);

                events.dispatch('my event');

                expect(count).to.be(1);
            });

            it('should invoke multiple listeners with dispatch()', function() {
                events.addListener('my event', callback, context);
                events.addListener('my event', callback, context);

                events.dispatch('my event', 1, 2);

                expect(count).to.be(2);
                expect(args[0]).to.be(1);
                expect(args[1]).to.be(2);
            });

            it('should invoke listener with specific context', function() {
                var context = {};

                function cb(arg) {
                    /*jshint validthis:true */
                    this.value = arg;
                }

                events.addListener('my event', cb, context);

                events.dispatch('my event', 123);

                expect(context.value).to.be(123);

                events.removeListener('my event', cb);
            });
        });

        describe('addListener() and dispatch()', function() {
            var context;
            beforeEach(function() {
                // require.undef('core/events');
                // events = require('core/events');
                context = {
                    firstEventCount: 0,
                    secondEventCount: 0
                };
            });
            afterEach(cleanup);
            it('should add multiple listeners with same context', function() {
                events.addListeners({
                    'first event': function() {
                        this.firstEventCount++;
                    },
                    'second event': function() {
                        this.secondEventCount++;
                    }
                }, context);

                events.dispatch('first event');
                expect(context.firstEventCount).to.be(1);
                expect(context.secondEventCount).to.be(0);

                events.dispatch('second event');
                expect(context.firstEventCount).to.be(1);
                expect(context.secondEventCount).to.be(1);
            });
        });

        describe('removeListener()', function() {
            var context;
            beforeEach(function() {
                context = {
                    called: false
                };
            });
            afterEach(cleanup);

            it('should be able to remove listener', function() {
                function callback() {
                    /*jshint validthis:true */
                    this.called = true;
                }

                events.addListener('my event', callback, context);

                events.removeListener('my event', callback);

                events.dispatch('my event');
                expect(context.called).to.be(false);
            });
        });

        describe('removeListeners()', function() {
            var context1, context2;
            beforeEach(function() {
                context1 = {};
                context2 = {};

                events.addListeners({
                    'event1': function() {
                        this.event1 = true;
                    },
                    'event2': function() {
                        this.event2 = true;
                    },
                }, context1);

                events.addListeners({
                    'event1': function() {
                        this.event1 = true;
                    },
                    'event2': function() {
                        this.event2 = true;
                    }
                }, context2);

                events.addListener('event1', function() {
                    this.event1 = true;
                }, context1);
            });
            afterEach(cleanup);

            it('should be able to remove listeners with context', function() {
                events.removeListeners(context1);

                events.dispatch('event1', function() {
                    expect(context1.event1).to.not.be.ok();
                    expect(context2.event1).to.be(true);
                });

                events.dispatch('event2', function() {
                    expect(context1.event2).to.not.be.ok();
                    expect(context2.event2).to.be(true);
                });
            });
        });

    });

});