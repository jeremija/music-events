define(['Squire', 'core/events'], function(Squire, events) {
    'use strict';

    var win = {
        innerHeight: 100,
        scrollY: 200,
        document: {
            body: {
                offsetHeight: 350
            }
        }
    };

    new Squire().mock({
        'window': win,
        'core/events': events
    }).require(['ui/scroll'], function(scroll) {
        describe('test/js/ui/scroll-test.js', function() {
            var count = 0;
            before(function() {
                events.addListener('scrolled-to-bottom', function() {
                    count++;
                });
            });
            it('should add onscroll handler', function() {
                expect(win.onscroll).to.be.a('function');
            });
            it('should dispatch `scrolled-to-bottom` when bottom', function() {
                win.onscroll();
                expect(count).to.be(0);
                win.scrollY = 350;
                win.onscroll();
                expect(count).to.be(1);
            });
        });
    });

});