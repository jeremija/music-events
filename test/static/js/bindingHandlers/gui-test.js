define(['ko', 'jquery', 'bindingHandlers/gui', 'kotest'],
	function(ko, $, gui, kotest)
{
	'use strict';

	describe('test/js/bindingHandlers/gui-test.js', function() {

		describe('ko.bindingHandlers.collapse', function() {
			var collapseOrig, collapseAction, collapseElement, el;
			before(function() {
				value = ko.observable();
				el = document.createElement('div');

				collapseOrig = $.fn.collapse;
				$.fn.collapse = function(action) {
					collapseElement = this[0];
					collapseAction = action;
				};
			});
			after(function() {
				$.fn.collapse = collapseOrig;
			});

			var value;
			function accessor() {
				return value;
			}

			it('should be an object', function() {
				expect(gui.collapse).to.be.an('object');
			});
			describe('init()', function() {
				it('should add collapse class to element', function() {
					gui.collapse.init(el);
					expect($(el).hasClass('collapse')).to.be(true);
				});
			});
			describe('update()', function() {
				beforeEach(function() {
					ko.utils.domData.set(el, 'last-command', null);
				});
				it('should show collapsible if truthy', function() {
					value = true;
					gui.collapse.init(el, accessor);
					gui.collapse.update(el, accessor);

					expect(collapseElement).to.be(el);
					expect(collapseAction).to.be('show');
				});
				it('should show collapsible if array length > 0', function() {
					value = ['test'];
					gui.collapse.init(el, accessor);
					gui.collapse.update(el, accessor);

					expect(collapseElement).to.be(el);
					expect(collapseAction).to.be('show');
				});
				it('should hide collapsible if array length == 0', function() {
					value = [];
					gui.collapse.init(el, accessor);
					gui.collapse.update(el, accessor);

					expect(collapseElement).to.be(el);
					expect(collapseAction).to.be('hide');
				});
				it('should hide collapsible if falsy', function() {
					value = undefined;
					gui.collapse.init(el, accessor);
					gui.collapse.update(el, accessor);

					expect(collapseElement).to.be(el);
					expect(collapseAction).to.be('hide');
				});
			});
		});

		describe('ko.bindingHandlers.tooltip', function() {
			var element, $el, value = ko.observable();
			function accessor() {
				return value;
			}
			describe('init()', function() {
				before(function() {
					gui.tooltip._animation = false;

					$el = $('<div>').attr('id', 'my').appendTo('#test')
						.text('tooltip test').attr('title', 'jerko');
					element = $el[0];

					gui.tooltip.init(element, accessor);
				});
				after(function() {
					ko.cleanNode(element);
					gui.tooltip._animation = true;
					$el.remove();
				});
				it('should initialize a tooltip', function() {
					$el.trigger('mouseenter');
					expect($('#test .tooltip').size()).to.be(1);
				});
				it('should destroy tooltip on ko.cleanNode', function() {
					ko.cleanNode(element);
					expect($('#test .tooltip').size()).to.be(0);
				});
			});

			describe('update()', function() {
				before(function() {
					gui.tooltip._animation = false;

					$el = $('<div>').attr('id', 'my').appendTo('#test')
						.text('tooltip test').attr('title', 'jerko');
					element = $el[0];

					gui.tooltip.init(element, value);
				});
				after(function() {
					ko.cleanNode(element);
					gui.tooltip._animation = true;
					$el.remove();
				});
				it('should update tooltip value', function() {
					value('new tooltip title');
					gui.tooltip.update(element, accessor);

					$el.trigger('mouseenter');
					var $tooltip = $('#test .tooltip');
					expect($tooltip.size()).to.be(1);
					expect($tooltip.text()).to.be('new tooltip title');
				});
			});
		});

		describe('ko.bindingHandlers.scrollTo', function() {
			var value = ko.observable();
			function accessor() { return value(); }
			var element;

			var origAnimate, animateParam;
			before(function() {
				element = document.createElement('div');
				$(element).appendTo('#test');
				$.fn.animate = function(param) {
					animateParam = param;
				};
			});
			after(function() {
				$.fn.animate = origAnimate;
				$(element).remove();
			});
			describe('update()', function() {
				it('should call scrollTop to element', function(done) {
					value(true);
					gui.scrollTo.update(element, accessor);

					setTimeout(function() {
						expect(animateParam).to.eql({
							scrollTop: $(element).position().top
						});
						done();
					});
				});
				it('should do nothing if value is false', function(done) {
					animateParam = null;
					value(false);
					gui.scrollTo.update(element, accessor);

					setTimeout(function() {
						expect(animateParam).to.be(null);
						done();
					});
				});
			});
		});

	});

});