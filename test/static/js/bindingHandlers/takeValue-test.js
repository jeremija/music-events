define(['ko', 'kotest', 'bindingHandlers/takeValue', 'jquery'],
	function(ko, kotest, takeValue, $)
{
	'use strict';

	describe('test/js/bindingHandlers/takeValue-test.js', function() {

		var obs = ko.observable(),
			obs2 = ko.observable('preset value');

		var config = kotest().defineBinding('takeValue', takeValue.takeValue);

		config.binding('takeValue', obs, '<input value="test2">')
			.test('preset input value and empty observable', function(ctx) {
				it('should update observable\'s value to test2', function() {
					expect(ctx.element.value).to.be('test2');
					expect(obs()).to.be('test2');
				});
				it('should update element\'s value from obs', function() {
					obs('test3');
					expect(ctx.element.value).to.be('test3');
				});
				it('should update observable from element', function() {
					$(ctx.element).val('test4').change();
					expect(obs()).to.be('test4');
				});
			});

		config.binding('takeValue', obs2, '<input value="test2">')
			.test('preset observable', function(ctx) {
				it('update element from observable', function() {
					expect(ctx.element.value).to.be('preset value');
					expect(obs2()).to.be('preset value');
				});
			});
	});

});