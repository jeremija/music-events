define(['core/obj', 'ko', 'bindingHandlers/dates', 'bindingHandlers/numbers',
    'bindingHandlers/sort', 'bindingHandlers/takeValue'],
	function(obj, ko)
{
	'use strict';

    var args = Array.prototype.slice.call(arguments);
    args.splice(args.indexOf(obj), 1);
    args.splice(args.indexOf(ko), 1);

    args.forEach(function(arg) {
        obj.copy(ko.bindingHandlers, arg);
    });
});
