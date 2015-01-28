define(['Squire', 'core/obj'], function(Squire, obj) {
	'use strict';

	var injector = new Squire();

	var win = {};

	injector.mock({
		window: win
	});

	injector.require(['core/events/dom'], function(domEvents) {
		describe('test/js/core/events/dom-test.js', function() {
			describe('createEvent()', function() {
				beforeEach(function() {
					obj.each(win, function(value, key) {
						delete win[key];
					});
				});
				it('should create new window.Event if possible', function() {
					win.Event = function(type) {
						this._type = type;
					};

					var event = domEvents.createEvent('click');

					expect(event instanceof win.Event).to.be(true);
					expect(event._type).to.be('click');
				});
				it('should then try with document.createEvent()', function() {
					function Event() {
					}
					Event.prototype.initEvent = function(type, bubbles, canc) {
						this._type = type;
						this._bubbles = bubbles;
						this._cancelable = canc;
					};

					win.document = {
						createEvent: function(what) {
							if (what === 'Event') return new Event();
						}
					};

					var event = domEvents.createEvent('click');

					expect(event instanceof Event).to.be(true);
					expect(event._type).to.be('click');
					expect(event._bubbles).to.be(true);
					expect(event._cancelable).to.be(true);
				});
			});
			describe('stopPropagation()', function() {
				var event, stopPropagationCalled,
					preventDefaultCalled;
				beforeEach(function() {
					stopPropagationCalled = false;
					preventDefaultCalled = false;
					event = {
						stopPropagation: function() {
							stopPropagationCalled = true;
						},
						preventDefault: function() {
							preventDefaultCalled = true;
						}
					};
				});
				it('should call available callbacks', function() {
					var ret = domEvents.stopPropagation(event);

					expect(ret).to.be(false);
					expect(stopPropagationCalled).to.be(true);
					expect(preventDefaultCalled).to.be(true);
					expect(event.cancelBubble).to.be(true);
				});
				it('should not fail if no stopPropagation()', function() {
					delete event.stopPropagation;

					var ret = domEvents.stopPropagation(event);

					expect(ret).to.be(false);
					expect(stopPropagationCalled).to.be(false);
					expect(preventDefaultCalled).to.be(true);
					expect(event.cancelBubble).to.be(true);
				});
				it('should not fail if no preventDefault()', function() {
					delete event.preventDefault;

					var ret = domEvents.stopPropagation(event);

					expect(ret).to.be(false);
					expect(stopPropagationCalled).to.be(true);
					expect(preventDefaultCalled).to.be(false);
					expect(event.cancelBubble).to.be(true);
				});
				it('should not fail if there are neither', function() {
					delete event.stopPropagation;
					delete event.preventDefault;

					var ret = domEvents.stopPropagation(event);

					expect(ret).to.be(false);
					expect(stopPropagationCalled).to.be(false);
					expect(preventDefaultCalled).to.be(false);
					expect(event.cancelBubble).to.be(true);
				});
			});
		});
	});
});