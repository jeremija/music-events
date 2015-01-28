define(['core/events/EventListener'], function(EventListener) {
    'use strict';

    describe('test/js/core/events/EventListener-test.js', function() {

        var listener, context;

        beforeEach(function() {
            context = {test: 1};

            listener = new EventListener('event1', function(arg1, arg2) {
                this.test++;
                this.arg1 = arg1;
                this.arg2 = arg2;
            }, context);

        });

        it('should initialize without problems', function() {
            expect(listener).to.be.ok();
        });

        it('invoke() should call callback', function() {
            listener.invoke('value1', 'value2');

            expect(context.test).to.be(2);
            expect(context.arg1).to.be('value1');
            expect(context.arg2).to.be('value2');
        });

    });
});