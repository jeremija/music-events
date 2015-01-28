define(['bindingHandlers/dates', 'ko'], function(dates, ko) {
    'use strict';

    describe('test/js/bindingHandlers/dates-test.js', function() {
        describe('ko.bindingHandlers.date', function() {

            var el;
            before(function() {
                el = document.createElement('div');
            });

            var value;
            function accessor() {
                return ko.observable(value);
            }

            describe('init()', function() {
                it('should not be defined', function() {
                    expect(dates.date.init).to.not.be.ok();
                });
            });

            describe('update()', function() {
                it('should be a function', function() {
                    expect(dates.date.update).to.be.a('function');
                });
                it('should format element as long date', function() {
                    value = '2014-09-01';

                    var allBindings = {
                        has: function() {},
                        get: function() {}
                    };

                    dates.date.update(el, accessor, allBindings, {}, {});
                    expect(el.innerHTML).to.be('01 Sep 2014');
                });
            });

        });
    });

});