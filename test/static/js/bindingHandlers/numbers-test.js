define(['bindingHandlers/numbers', 'ko'], function(numbers, ko) {
	'use strict';

	describe('test/js/bindingHandlers/numbers-test.js', function() {

		describe('ko.bindingHandlers.number', function() {
			var numberFormat;
			var el, input, allBindings = {
				has: function(what) {
					if (what === 'numberFormat') return !!numberFormat;
				},
				get: function(what) {
					if (what === 'numberFormat') return numberFormat;
				}
			};

			var value = ko.observable();
			function accessor() {
				return value;
			}

			describe('init()', function() {
				beforeEach(function() {
					input = document.createElement('input');
				});
				afterEach(function() {
					ko.cleanNode(input);
					numberFormat = null;
				});
				it('should add event listener on input elements', function() {
					numbers.number.init(input, accessor, allBindings);

					input.value = '123';
					ko.utils.triggerEvent(input, 'change');

					expect(input.value).to.be('123.00');
					expect(value()).to.be(123);
				});
				it('should use custom number formats on input els', function() {
					numberFormat = '0.[00]a';
					numbers.number.init(input, accessor, allBindings);

					input.value = '1234';
					ko.utils.triggerEvent(input, 'change');

					expect(input.value).to.be('1.23k');
					expect(value()).to.be(1234);
				});
				it('should parse inputted numbers', function() {
					numberFormat = '0.[00]a';
					numbers.number.init(input, accessor, allBindings);

					input.value = '1.23k';
					ko.utils.triggerEvent(input, 'change');

					expect(input.value).to.be('1.23k');
					expect(value()).to.be(1230);
				});
			});

			describe('update()', function() {
				beforeEach(function() {
					el = document.createElement('div');
					input = document.createElement('input');
				});
				afterEach(function() {
					ko.cleanNode(el);
					ko.cleanNode(input);
				});
				it('should update text element', function() {
					value('12345');
					numbers.number.init(el, accessor, allBindings);
					numbers.number.update(el, accessor, allBindings);
					expect(el.innerHTML).to.be('12345.00');
				});
				it('should allow custom number formats', function() {
					value('12345');
					numberFormat = '0.[00]a';
					numbers.number.init(el, accessor, allBindings);
					numbers.number.update(el, accessor, allBindings);
					expect(el.innerHTML).to.be('12.35k');
				});
				it('should work with input elements', function() {
					value('12345');
					numbers.number.init(input, accessor, allBindings);
					numbers.number.update(input, accessor, allBindings);
					expect(input.value).to.be('12.35k');
				});
			});
		});

	});

});