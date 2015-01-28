define(['bindingHandlers/sort', 'ko', 'jquery'], function(sort, ko, $) {
    'use strict';

    describe('test/js/bindingHandlers/sort-test.js', function() {

        describe('ko.bindingHandlers.sort', function() {
            var john = {
                name: 'john'
            };
            var andrew = {
                name: 'andrew'
            };
            var zaz = {
                name: 'zaz'
            };
            var $el, list = [john, andrew, zaz];
            var observable = ko.observableArray(list);
            function accessor() {
                return {
                    data: observable,
                    property: 'name'
                };
            }

            before(function() {
                $el = $('<div>').text('sortable');
                $('<span>').appendTo($el);
            });
            after(function() {
                ko.cleanNode('sort-test');
            });

            function triggerClick() {
                // $el.click(); does not work well in mocha-phantomjs so we invoke
                // the click manually
                var event = document.createEvent('UIEvents');
                event.initUIEvent('click', true, true);
                $el[0].dispatchEvent(event);
            }

            describe('init()', function() {
                it('should be a function', function() {
                    expect(sort.sort.init).to.be.a('function');
                    sort.sort.init($el[0], accessor);
                });
                describe('first click', function() {
                    it('should sort descending', function() {
                        triggerClick();
                        expect(list[0]).to.be(andrew);
                        expect(list[1]).to.be(john);
                        expect(list[2]).to.be(zaz);
                    });
                    it('should add caret', function() {
                        expect($el.find('.caret').length).to.be(1);
                        expect($el.hasClass('dropup')).to.be(true);
                    });
                });
                describe('second click', function() {
                    it('should sort ascending', function() {
                        triggerClick();
                        expect(list[0]).to.be(zaz);
                        expect(list[1]).to.be(john);
                        expect(list[2]).to.be(andrew);
                    });
                    it('should reverse caret', function() {
                        expect($el.find('.caret').length).to.be(1);
                        expect($el.hasClass('dropup')).to.be(false);
                    });
                });
                describe('third click', function() {
                    it('should sort descending', function() {
                        triggerClick();
                        expect(list[0]).to.be(andrew);
                        expect(list[1]).to.be(john);
                        expect(list[2]).to.be(zaz);
                    });
                    it('should add caret', function() {
                        expect($el.find('.caret').length).to.be(1);
                        expect($el.hasClass('dropup')).to.be(true);
                    });
                });
            });

            describe('update()', function() {
                it('should not be defined', function() {
                    expect(sort.sort.update).to.not.be.ok();
                });
            });

        });
    });
});