define(['ko', 'moment'], function(ko, moment) {
    'use strict';

    var exports = {};

    exports.date = {
        update: function(element, valueAccessor, allBindings, viewModel, ctx) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var format = allBindings.has('dateFormat') ?
                allBindings.get('dateFormat') : 'DD MMM YYYY';
            var formattedValue = value ? moment(value).format(format) : '';

            function newAccessor() {
                return formattedValue;
            }

            ko.bindingHandlers.text.update.call(
                this, element, newAccessor, allBindings, viewModel, ctx);
        }
    };

    return exports;

});