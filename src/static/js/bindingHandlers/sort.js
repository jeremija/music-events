define(['ko', 'jquery'], function(ko, $) {
    'use strict';

    var exports = {};

    exports.sort = {
        init: function(element, valueAccessor, allBindings, viewModel, ctx) {
            var asc = false;
            // element.style.cursor = 'pointer';
            element.className += ' link';

            var $element = $(element);
            $element.css('cursor', 'pointer');

            ko.utils.registerEventHandler(element, 'click', function(event) {
                var value = ko.utils.unwrapObservable(valueAccessor());
                var prop = ko.utils.unwrapObservable(value.property);
                var data = value.data;

                asc = !asc;

                $element.find('span.caret').remove();
                $element.siblings().find('span.caret').remove();
                $('<span>').addClass('caret').appendTo($element);

                $element.toggleClass('dropup', asc);

                if (asc) {
                    data.sort(function(left, right) {
                        return left[prop] == right[prop] ?
                            0 : left[prop] < right[prop] ? -1 : 1;
                    });
                } else {
                    data.sort(function(left, right) {
                        return left[prop] == right[prop] ?
                            0 : left[prop] > right[prop] ? -1 : 1;
                    });
                }
            });
        }
    };

    return exports;
});