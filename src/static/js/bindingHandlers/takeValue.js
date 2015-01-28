define(['ko'], function(ko) {
	'use strict';

	var exports = {};
	exports.takeValue = {
		init: function(element, valueAccessor) {
			var value =  valueAccessor();
			if (ko.isObservable(value) && !value()) {
				value(element.value);
			}
			ko.bindingHandlers.value.init.apply(
				ko.bindingHandlers.value, arguments);
		},
		update: function(element, valueAccessor) {
			ko.bindingHandlers.value.update.apply(
				ko.bindingHandlers.value, arguments);
		}
	};

	return exports;

});