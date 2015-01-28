define(['core/obj', 'ko', 'jquery', 'core/events', 'bootstrap'],
    function(obj, ko, $, events)
{
    'use strict';

    var exports = {};

    exports.collapse = {
        init: function(element, valueAccessor, allBindings, viewModel, ctx) {
            $(element).addClass('collapse').collapse({
                toggle: false
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, ctx) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (obj.isArray(value)) value = value.length;
            var command = value ? 'show' : 'hide';
            var lastCommand = ko.utils.domData.get(element, 'last-command');

            if (command !== lastCommand) {
                $(element).collapse(value ? 'show' : 'hide');
                setTimeout(function() {
                    // trigger-resize only for children of this element
                    events.dispatch('trigger-resize', element);
                });
            }

            ko.utils.domData.set(element, 'last-command', command);
        }
    };

    exports.tooltip = {
        _animation: true,
        init: function(element, valueAccessor, allBindings, vm, ctx) {
            var $element = $(element);
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $element.tooltip('destroy');
            });
            $element.tooltip({
                animation: exports.tooltip._animation
            });
        },
        update: function(element, valueAccessor, allBindings, vm, ctx) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).attr('data-original-title', value)
                .attr('title', value);
        }
    };

    exports.scrollTo = {
        update: function(element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (obj.isArray(value)) value = value.length;
            if (value) {
                var $element = $(element);
                var scrollParent = $element.closest("div");
                var newTop = $element.position().top + scrollParent.scrollTop();

                setTimeout(function() {
                    $element.parents('body').animate({
                        scrollTop: newTop
                    });
                });
            }
        }
    };

    exports.txt = {
        update: function(element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (value) $(element).text(value);
            else $(element).html('&nbsp;');
        }
    };

    return exports;

});