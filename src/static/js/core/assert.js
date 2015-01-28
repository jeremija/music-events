define(['ko'], function(ko) {
	'use strict';

	var TYPE_FUNCTION = 'function',
		TYPE_OBJECT = 'object',
		TYPE_NUMBER = 'number',
		TYPE_STRING = 'string',
		TYPE_ARRAY = '[object Array]';

	var MSG_OBSERVABLE = 'Expected value to be an observable',
		MSG_OBSERVABLE_ARRAY = 'Expected value to be an observableArray',
		MSG_TRUTHY = 'Expected value to be truthy',
		MSG_FALSY = 'Expected value to be falsy',
		MSG_OBJECT = 'Expected value to be an object',
		MSG_NUMBER = 'Expected value to be a number',
		MSG_STRING = 'Expected value to be a string',
		MSG_HAS_TEXT = 'Expected value to be a non-empty string',
		MSG_ARRAY = 'Expected value to be an array',
		MSG_NOT_EMPTY = 'Expected value to be a non-empty array',
		MSG_FUNCTION = 'Expected value to be a function',
		MSG_INSTANCE_OF = 'Expected value to be an instance of ';

	var exports = {
		_assert: function(params) {
			if (!params.check) throw new params.errorType(params.msg);
		},
		isObservable: function(value, msg) {
			this._assert({
				check: ko.isObservable(value),
				errorType: TypeError,
				msg: msg || MSG_OBSERVABLE
			});
		},
		isObservableArray: function(value, msg) {
			this._assert({
				check: ko.isObservable(value) &&
					typeof value.push === TYPE_FUNCTION &&
					typeof value.pop === TYPE_FUNCTION,
				errorType: TypeError,
				msg: msg || MSG_OBSERVABLE_ARRAY
			});
		},
		isInstanceOf: function(value, Constructor, msg) {
			this._assert({
				check: value instanceof Constructor,
				errorType: TypeError,
				msg: msg || MSG_INSTANCE_OF + Constructor.name
			});
		},
		isTruthy: function(value, msg) {
			this._assert({
				check: !!value,
				errorType: TypeError,
				msg: msg || MSG_TRUTHY
			});
		},
		isFalsy: function(value, msg) {
			this._assert({
				check: !value,
				errorType: TypeError,
				msg: msg || MSG_FALSY
			});
		},
		isObject: function(value, msg) {
			this._assert({
				check: typeof value === TYPE_OBJECT,
				errorType: TypeError,
				msg: msg || MSG_OBJECT
			});
		},
		isNumber: function(value, msg) {
			this._assert({
				check: typeof value === TYPE_NUMBER,
				errorType: TypeError,
				msg: msg || MSG_NUMBER
			});
		},
		isString: function(value, msg) {
			this._assert({
				check: typeof value === TYPE_STRING,
				errorType: TypeError,
				msg: msg || MSG_STRING
			});
		},
		hasText: function(value, msg) {
			this._assert({
				check: typeof value === TYPE_STRING && value.length,
				errorType: TypeError,
				msg: msg || MSG_HAS_TEXT
			});
		},
		isArray: function(value, msg) {
			this._assert({
				check: Object.prototype.toString.call(value) === TYPE_ARRAY,
				errorType: TypeError,
				msg: msg || MSG_ARRAY
			});
		},
		notEmpty: function(value, msg) {
			this._assert({
				check: Object.prototype.toString.call(value) === TYPE_ARRAY &&
					value.length > 0,
				errorType: Error,
				msg: msg || MSG_NOT_EMPTY
			});
		},
		isFunction: function(value, msg) {
			this._assert({
				check: typeof value === TYPE_FUNCTION,
				errorType: TypeError,
				msg: msg || MSG_FUNCTION
			});
		}

	};

	return exports;

});