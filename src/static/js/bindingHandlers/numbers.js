define(['numeral', 'ko'], function(numeral, ko) {
	'use strict';

	var exports = {};

	function formatNumber(element, value) {
		var format = ko.utils.domData.get(element, 'numberFormat');
		format = ko.utils.unwrapObservable(format) || '0.00';
		value = ko.utils.unwrapObservable(value);

		var formatted = numeral(value).format(format);

		if (element.tagName === 'INPUT') element.value = formatted;
		else element.innerHTML = formatted;
	}

	exports.number = {
		init: function(element, valueAccessor, allBindings, viewModel, ctx) {
			var numberFormat = allBindings.get('numberFormat');
			ko.utils.domData.set(element, 'numberFormat', numberFormat);
			var value = valueAccessor();

			if (element.tagName === 'INPUT') {
				ko.utils.registerEventHandler(element, 'change', function() {
					var val = numeral().unformat(element.value);
					if (ko.isObservable(value)) value(val);
					formatNumber(element, val);
				});
			}

		},
		update: function(element, valueAccessor, allBindings, viewModel, ctx) {
			formatNumber(element, valueAccessor());
		}
	};

	return exports;

});